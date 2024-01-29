import 'dotenv/config';
import WebTorrent from 'webtorrent'
import "process"
import cliProgress from "cli-progress"

export class RSSTorrentDownloader {
    constructor(links){
        // Set DOWNLOAD_LIMIT environmental variable to desired speed in MB/s
        const client = new WebTorrent({downloadLimit: Number(process.env.DOWNLOAD_LIMIT) / 10**6 || -1});
        const multibar = new cliProgress.MultiBar({
            clearOnComplete: false,
            hideCursor: true,
            format: ` {filename} Progress | {bar} | {percentage}% || {value}/{total} Chunks  || DL Speed: {dlSpeed} MB/s  || UL Speed: {ulSpeed} MB/s`,
        }, cliProgress.Presets.shades_grey);
        this.magnetLinks = links;
        this.client = client; 
        this.multibar = multibar;
           
    };

    displayProgress (torrent, bar) {
        bar.update(torrent.progress * 100, {filename: torrent.name, dlSpeed: torrent.downloadSpeed/10**6, ulSpeed: torrent.uploadSpeed/10**6  });
    };

   
    async torrentDownload() {
        try {
            for (let link of this.magnetLinks) {
                this.client.add(link, { path: './' }, torrent => {
                    // Got torrent metadata!

                    console.log('Client is downloading:', torrent.name)
                    const bar = this.multibar.create(100,0, {filename: torrent.name, dlSpeed: torrent.downloadSpeed/10**6, ulSpeed: torrent.uploadSpeed/10**6 })
 

        
             
                  
                    torrent.on('done', () => {
                        this.displayProgress(torrent, bar)
                        const seeding = process.env.SEEDING || "0"
                        if (this.client.progress == 0 && seeding === "0" ){
                            console.log('Torrent downloads are finished. Environment variable SEEDING set to "0" or not set at all. Closing client...')
                            this.client.destroy();
                            console.log("Operations complete");
                            process.exit();
                        } else {
                            console.log('Torrent downloads are finished. Environment variable SEEDING not set to "0". Seeding torrents. Enter break command to exit program')
                        }
                      })
                      setInterval(this.displayProgress, 1000, torrent, bar);
                  })
            }
    
        } catch (e) {
            console.error(e);
            throw new Error(e);
        } 
    };

}
