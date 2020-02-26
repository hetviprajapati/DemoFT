let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let path = require('chromedriver').path;
let Base_URL = 'https://test-uk.rioft.com/';
//let Base_URL = 'https://app.gohighlevel.com/';

const ConfigFunc= async  () => {
    //let options = new chrome.Options();

    // function encode(file) {
    //     let stream = require('fs').readFileSync(file);
    //      return   Buffer.from(stream).toString('base64')
    // }
    // options.addExtensions(encode('D:/Hetvi/extension_0_1_3_0.crx'));

   // let driver = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(options).build();

    chrome.setDefaultService(new chrome.ServiceBuilder(path).build());
    let driver = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    return driver
}

module.exports={webdriver,chrome,path,Base_URL,ConfigFunc}