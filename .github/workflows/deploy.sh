#!/usr/bin/env bash

set -e
set -o pipefail

echo "deploying Bootiful Podcast to production..."

export NAMESPACE_NAME=$NS_NAME


create_ip(){
  ipn=$1
  if [ -z "$ipn" ]; then
    echo "you didn't specify the name of the IP address to create "
  else
    gcloud compute addresses list --format json | jq '.[].name' -r | grep $ipn || gcloud compute addresses create $ipn --global
  fi
}

write_secrets(){
  export SECRETS=${NAMESPACE_NAME}-secrets
  SECRETS_FN=$HOME/${SECRETS}
  mkdir -p "`dirname $SECRETS_FN`"
  cat <<EOF >${SECRETS_FN}
DEBUG=true
EOF

  kubectl delete secrets -n $NAMESPACE_NAME $SECRETS || echo "no secrets to delete."
  kubectl create secret generic $SECRETS -n $NAMESPACE_NAME --from-env-file $SECRETS_FN

  ##
  ## need to give a service account .json file to run
  ## the google cloud sql proxy auth container
  ##
  export SQL_SECRETS=${NAMESPACE_NAME}-sql-secrets
  export SQL_SECRETS_FN=${HOME}/${SQL_SECRETS}
  mkdir -p "`dirname $SQL_SECRETS_FN`"
  rm -f $SQL_SECRETS_FN
  echo $GCLOUD_SQL_SA_KEY  | base64 -d > $SQL_SECRETS_FN
  cat $SQL_SECRETS_FN
  # ok but how do i get the file to this place?
  kubectl get secrets/${SQL_SECRETS} ||  \
    kubectl create secret generic $SQL_SECRETS -n $NAMESPACE_NAME --from-file=service_account.json=$SQL_SECRETS_FN
}

kubectl get ns $NAMESPACE_NAME || kubectl create namespace $NAMESPACE_NAME

write_secrets

echo "the root dir is: $ROOT_DIR "
cd $ROOT_DIR/k8s/carvel/

get_image(){
  kubectl get "$1" -o json  | jq -r  ".spec.template.spec.containers[0].image" || echo "no old version to compare against"
}

# MAIN APPS
# and there are a bunch of apps we needs to deploy and they all share a similar setup
for f in bootiful-podcast-client ; do
  
  echo "------------------"

  IP=${NAMESPACE_NAME}-${f}-ip
  echo "creating IP called ${IP} "
  create_ip $IP
  echo "created IP called ${IP} "
  Y=app-${f}-data.yml
  D=deployments/${f}-deployment
  OLD_IMAGE=`get_image $D `
  OUT_YML=out.yml
  ytt -f $Y -f "$ROOT_DIR"/k8s/carvel/data-schema.yml -f "$ROOT_DIR"/k8s/carvel/deployment.yml |  kbld -f -  > ${OUT_YML}
  cat ${OUT_YML}
  cat ${OUT_YML} | kubectl apply  -n $NAMESPACE_NAME -f -
  NEW_IMAGE=`get_image $D`
  echo "comparing container images for the first container!"
  echo $OLD_IMAGE
  echo $NEW_IMAGE
  if [ "$OLD_IMAGE" = "$NEW_IMAGE" ]; then
    echo "no need to restart $D"
  else
   echo "restarting $D"
   kubectl rollout restart $D
  fi
done

cd "$ROOT_DIR"