# License Scraper with Multi Plattform Support
A utility that scrapes a packages license name and the url to the package license (usually from github). Supported plattforms:
- npmjs.com ✅
- rubygems.org ✅ 
- cocoapods.org ✅
- github.com (helper) ✅

# Examples
```js
// NPM (uses github helper)
await LicenseScraper.npmPackage("opensea-scraper");

// Github (helper)
await LicenseScraper.githubRepo("dcts/opensea-scraper");

// RubyGems (uses github helper)
await LicenseScraper.rubyGem("rails");

// CocoaPods (uses github helper)
await LicenseScraper.cocoaPod("FirebaseUI");
```

# Scripts (WIP)
This repository contains bash scripts that allow you to print all dependencies to the terminal. You can then save all those outputs to a file. Instructions:
1. navigate to your nodejs projects node_modules folder
2. run the following code
```bash
# directory and filename of the output file
outputFilePath = "/your/path/yourFilename.txt" 

# run and save output to file
pmodules > outputFilePath
```
