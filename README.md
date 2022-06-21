# License Scraper with Multi Plattform Support
A utility that scrapes license name and url based on the exact package name. Supported plattforms:
- npmjs.com
- ruby gems
- (helper) github
- (todo) cocoapods

# Examples
```js
// NPM (uses github helper)
const { name, url } = await LicenseScraper.npm(npmPackageName);

// RubyGems (uses github helper)
const { name, url } = await LicenseScraper.npm(rubyGemName);

// CocoaPods (uses github helper)
const { name, url } = await LicenseScraper.cocoaPods(podName);

// Github (helper)
const { name, url } = await LicenseScraper.github(githubPath);
```

