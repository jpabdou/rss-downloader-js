// import 'dotenv/config';
// import Parser from 'rss-parser';
// const cliProgress = require('cli-progress');
// const WebTorrent = require('webtorrent')
let Parser = require('rss-parser');
require('dotenv').config();

class RSSParser {
    constructor() {
        this.parser = new Parser();
        this.magnetLinks=[];
        this.rssUrls = JSON.parse(process.env.RSS_URLS);
        this.rssFilterObj = JSON.parse(process.env.RSS_FILTERS);
    };
    async findDownloadLinks() {
        try {
            for (let url of this.rssUrls) {
                let feed = await this.parser.parseURL(url);
                console.log(feed.title);
                feed.items.forEach(item => {
                    if (typeof this.rssFilterObj[url]["filterValues"] === "object") {
                        for (let filterTerm of this.rssFilterObj[url]["filterValues"]){
                        if (item[this.rssFilterObj[url]["filterKey"]].includes(filterTerm)) {
                            console.log("found", item.title);
                            this.magnetLinks.push(item.link);
                        };
                    };
                    } else {
                        if (item[this.rssFilterObj[url]["filterKey"]].includes(this.rssFilterObj[url]["filterValues"])) {
                            console.log("found", item.title);
                            this.magnetLinks.push(item.link);
                        };
                    };
                }
                );
            };
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }

    };
}

module.exports = {RSSParser}
