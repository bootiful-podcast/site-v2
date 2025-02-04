// import requestUtils from "@/RequestUtils";

export default class PodcastService {
    constructor(podcastApiUriRoot) {
        this.podcastApiUrl = podcastApiUriRoot;
        this.podcasts = []; // caches the data from the network request
        this.top3 = [];
        this.latest = null;
    }

    async readLatest() {
        const podcasts = await this.readPodcasts();
        this.latest = podcasts[0];
        return this.latest;
    }

    async readTop3() {
        const podcasts = await this.readPodcasts();
        if (podcasts.length < 3) return [];
        this.top3 = [podcasts[0], podcasts[1], podcasts[2]];
        return this.top3;
    }

    async readPodcastById(id) {
        const p = await this.readPodcasts();
        return p.filter((p) => p.id === id)[0];
    }

    async readPodcastByUid(uid) {
        const p = await this.readPodcasts();
        return p.filter((p) => p.uid === uid)[0];
    }

    async readPodcasts() {
        if (this.podcasts.length === 0) {
            await this.load();
        }
        return this.podcasts;
    }

    async load() {
        this.podcasts = [];

        function parseAtomFeed(textData) {
            try {
                const parser = new DOMParser()
                const xmlDoc = parser.parseFromString(textData, 'text/xml')

                const entries = xmlDoc.querySelectorAll('entry')

                // Convert to array of objects
                return Array.from(entries).map(entry => {
                    const links = Array.from(
                        entry.querySelectorAll('link'))

                    const image = links.filter(link => link.getAttribute('type') === 'image/jpeg')[0]
                    const podbean = links.filter(link => {
                        const attribute = link.getAttribute('type');
                        return attribute === null || attribute === undefined;
                    }) [0]
                    return {
                        image: image?.getAttribute('href'),
                        title: entry.querySelector('title')?.textContent,
                        episode: podbean?.getAttribute('href'), // ATOM uses href attribute
                        id: entry.querySelector('id')?.textContent,
                        updated: entry.querySelector('updated')?.textContent,
                        summary: entry.querySelector('summary')?.textContent,
                        content: entry.querySelector('content')?.textContent,
                        author: entry.querySelector('author > name')?.textContent,
                        // Additional ATOM-specific fields
                        published: entry.querySelector('published')?.textContent,
                        category: Array.from(entry.querySelectorAll('category')).map(cat => ({
                            term: cat.getAttribute('term'),
                            label: cat.getAttribute('label')
                        }))
                    };

                })
            } catch (error) {
                console.error('Error fetching ATOM feed:', error)
                throw error
            }
        }

        const fetchRSS = async function (url) {
            try {
                // If you run into CORS issues, you might need to use a proxy service
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
                const response = await fetch(proxyUrl)
                const textData = await response.text()
                return parseAtomFeed(textData)
            } catch (error) {
                console.error('Error fetching RSS:', error)
                throw error
            }
        }

        const rss = await fetchRSS("https://api.media-mogul.io/public/feeds/moguls/16386/podcasts/1/episodes.atom")
        this.podcasts = rss.map(podcast => {
            return {
                id: podcast.id,
                uid: podcast.episode,
                title: podcast.title,
                image: podcast.image,
                date: new Date(podcast.updated),
                summary: podcast.summary,
                content: podcast.content, 
                dateAndTime: podcast.updated,
                author: podcast.author,
            }
        });


        this.podcasts.sort((a, b) => {
            return b.date - a.date;
        });

        return this.podcasts;
    }
}
