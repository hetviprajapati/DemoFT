let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let path = require('chromedriver').path;
let Base_URL = 'https://test-uk.rioft.com/';

const ConfigFunc= async  () => {
    chrome.setDefaultService(new chrome.ServiceBuilder(path).build());
    let driver = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    await driver.get(Base_URL);
    await driver.manage().window().maximize();
    // const title=driver.getTitle();
    // console.log(title);
    return driver
}

module.exports={webdriver,chrome,path,Base_URL,ConfigFunc}