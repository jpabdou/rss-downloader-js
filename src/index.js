import 'dotenv/config'
import "process"
import { RSSParser } from './rssParser.js'
import { RSSTorrentDownloader } from './rssTorrentDl.js'

async function main() {
    let rssTorrentDownloader;
    try {
        process.chdir(process.env.DOWNLOAD_DIRECTORY)
        console.log("Current directory:", process.cwd());
        const rssParser = new RSSParser()
        await rssParser.findDownloadLinks()
        rssTorrentDownloader = new RSSTorrentDownloader(rssParser.magnetLinks);
        await rssTorrentDownloader.torrentDownload();

    } catch (e) {
        console.error(e)
    }
}
await main();