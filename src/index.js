import dotenv from 'dotenv'
dotenv.config()
import "process"
import { RSSParser } from './rssParser.js'
import { RSSTorrentDownloader } from './rssTorrentDl.js'


async function main() {
    let rssTorrentDownloader;
    try {
        const destDir = process.env.DOWNLOAD_DIRECTORY || "./";
        process.chdir(destDir);
        console.log("Current directory:", process.cwd());
        const rssParser = new RSSParser();
        await rssParser.findDownloadLinks();
        console.log(rssParser.magnetLinks)
        rssTorrentDownloader = new RSSTorrentDownloader(rssParser.magnetLinks);
        await rssTorrentDownloader.torrentDownload();

    } catch (e) {
        console.error(e)
    }
};
main();
