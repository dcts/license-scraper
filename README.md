# License Scraper with Multi Plattform Support
A utility that scrapes a packages license name and the url to the package license (usually from github). Supported plattforms:
- npmjs.com ✅
- github (helper) ✅
- TODO 👷: ruby gems 
- TODO 👷: cocoapods 

# Examples
```js
// NPM (uses github helper)
await LicenseScraper.npmPackage("opensea-scraper");

// Github (helper)
// @TODO
await LicenseScraper.githubRepo("dcts/opensea-scraper");

// RubyGems (uses github helper)
// @TODO

// CocoaPods (uses github helper)
// @TODO
```

