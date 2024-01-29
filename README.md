# Keep your open-source software up-to-date with rss-downloader!

This software keeps your open-source software up-to-date by parsing RSS feeds and downloading new files!

## Installation
You can install by:

- On your command prompt or terminal, enter:
```sh
$ git clone https://github.com/jpabdou/rss-downloader-js.git
```

- On the same command prompt or terminal, change working directory to your cloned rss-downloader-js folder and enter:
```sh
$ npm install
```

- Update the .env file found in the root of the project folder with the following key-values:
    - RSS_URLS: Required. DO NOTE if this is not entered the program will throw an error and will not continue. Format is string that can be parsed as a list of RSS URL strings or RSS URL string that you want parsed and downloaded from. Ex. &lsquo;RSS URL&rsquo; or &lsquo;[&ldquo;RSS URL 1&rdquo;, &ldquo;RSS URL 2&rdquo;, ...]&rsquo;. The .env file I included uses a link to a third-party Linux RSS Feed Tracker (DistroWatch).
    - RSS_FILTERS: Optional. Default is every file found in the RSS feed is added to the downloads if no filters are created. Format is string that can be parsed as an object containing RSS URL keys to filter objects with a &ldquo;filterKey&rdquo; value equal to the RSS feed value that you want to filter (title, link, ...) and a &ldquo;filterValue&rdquo; value equal to the string or list of strings you want to filter for in the filterKey. The .env file I included uses a filter for Linux Mint releases in the title and can be used as an example for your RSS Torrenting.
    - DOWNLOAD_DIRECTORY: Optional. File path that you want torrented files to be saved to. Default is root of the src directory in the rss-downloader-js directory (&ldquo;/rss-downloader-js/src&rdquo;). Format is string of the absolute file path within your operating system. 
    - SEEDING: Optional. Dictates whether the torrent program will remain open and continue seeding after all downloads are completed. Default is &ldquo;0&rdquo; for no seeding. Format is a string that is either &ldquo;0&rdquo; for the program to close and stop seeding after download completion or any other string that is not &ldquo;0&rdquo; for the program to seed and remain open on completion of downloads. DO NOTE that seeding does not exit the program and you will have to enter the break command in terminal or close the terminal window when you want to stop the torrent seeding. Set to &ldquo;0&rdquo; in the .env file I included.
    - THROTTLE_SPEED: Optional. Download speed that you want to throttle and limit torrent downloads to in MB/s. Default is throttling disabled. DO NOTE torrents will use all available bandwidth. Format is a string.

- On the same command prompt or terminal, enter:
```sh
$ npm start
```
