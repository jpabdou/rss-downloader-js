import 'dotenv/config';
import Parser from 'rss-parser';


export class RSSParser {
    constructor() {
        // RSS_URLS is a string that can be parsed to give an array of url strings for the RSS feeds that need parsing
        const rss_urls = process.env.RSS_URLS || '';

        // RSS_FILTERS is a string that can be parsed into an object into the format of 
        // {<url key found in RSS_URLS>: {"filterKey":<string for entry in RSS feed, such as title or link>, "filterValues": "list of filter term strings or one filter term string that you want to search for the given filterKey"}}
        const rss_filters = process.env.RSS_FILTERS || '';

        if (rss_urls.length === 0) throw new Error("No URLs found. Enter a RSS_URLS environment variable with a value in the format of '<RSS URL string>' or '[<RSS URL 1 string>, <RSS URL 2 string>, ...]'")
        
        this.parser = new Parser();
        this.magnetLinks=[];
        this.rssUrls = rss_urls.includes('[') && rss_urls.includes(']') ? JSON.parse(rss_urls) : [rss_urls];
        this.rssFilterObj = rss_filters.length === 0 ? {} : JSON.parse(rss_filters);
    };
    async findDownloadLinks() {
        try {
            for (let url of this.rssUrls) {
                let feed = await this.parser.parseURL(url);
                console.log(feed.title);
                feed.items.forEach(item => {
                    if (url in this.rssFilterObj) {
                        if (this.checkFilter(url, item)) {
                            console.log("found", item.title);
                            this.magnetLinks.push(item.link);
                        }
                    } else {
                        console.log("found", item.title);
                        this.magnetLinks.push(item.link);
                    }
   
                }
                );
            };
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }

    };
    // Function to check if RSS item matches the filter terms within this.rssFilterObj
    checkFilter(url, item) {
        // Checking if the filterValues is a string or a list of strings and sets filter logic accordingly
        if (typeof this.rssFilterObj[url]["filterValues"] === "object") {
            for (let filterTerm of this.rssFilterObj[url]["filterValues"]){
            if (item[this.rssFilterObj[url]["filterKey"]].includes(filterTerm)) {
                return true;
            };
        };
        } else {
            if (item[this.rssFilterObj[url]["filterKey"]].includes(this.rssFilterObj[url]["filterValues"])) {
                return true;
            };
        };
        return false;
    }
}
