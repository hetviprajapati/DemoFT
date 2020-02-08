let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let path = require('chromedriver').path;
let Base_URL = 'https://qa-uk.rioft.com/';

<<<<<<< HEAD
const ConfigFunc= async  () => {
    chrome.setDefaultService(new chrome.ServiceBuilder(path).build());
    let driver = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    await driver.get(Base_URL);
    await driver.manage().window().maximize();

    return driver
}

module.exports={webdriver,chrome,path,Base_URL,ConfigFunc}
=======
chrome.setDefaultService(new chrome.ServiceBuilder(path).build());

let types = {
    0: 'text',
    1: 'radio',
    2: 'checkbox',
    3: 'button'
};

let typeObj = [
    {name: 'name', key: 'test', type: types[0]},
    {name: 'email', key: 'test@gmail.com', type: types[0]},
    {name: 'zip', key: '33333333', type: types[0]},
    {name: 'phone', key: '9999999999', type: types[0]},
    {name: 'leadTypeRadio', type: types[1], selector: 'className'},
    {name: 'ambassador', key: '1234', type: types[0]},
    {name: 'proceedToQuote', type: types[3], url: Base_URL + '?tab=home&'},
    {name: 'productButton', type: types[2], selector: 'className', url: Base_URL + '?tab=size&'}
];

(async function myFunction() {
    let driver = await new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    await driver.get(Base_URL);
    await driver.manage().window().maximize();
    await guestFill(driver, typeObj, true);

})();
const sleeping = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}
const guestFill = async (driver, typeObj, toClean = false) => {
    await typeObj.map(async (arg) => await callMe({driver, ...arg}))
    // if (toClean) {
    //     //     await sleeping(1000);
    //     //     await typeObj.map(async (name) => await callMeToClear({driver, name: name.name}))
    //     // }
}

const callMe = async (arg) => {
    let p;
    try {
        switch (arg.type) {
            case types[0] :
                p = await arg.driver.findElement(webdriver.By[arg.selector || 'id'](arg.name));
                p.sendKeys(arg.key);
                break;
            case types[1] :
                p = await arg.driver.findElement(webdriver.By[arg.selector || 'id'](arg.name));
                p.click();
                break;
            case types[2] :
                await sleeping(10000);
                p = await arg.driver.findElement(webdriver.By[arg.selector || 'id'](arg.name));
                p.click();
                // await  arg.driver.executeScript("document.getElementsByClassName('productButton')[0].click()");
                break;
            case types[3]:
                p = await arg.driver.findElement(webdriver.By[arg.selector || 'id'](arg.name));
                p.click();
                const check = await checkURL(arg.url, arg.driver)
                if (!check) {
                    await arg.driver.quit();
                    throw "URL not matched for " + arg.name;
                }
                break;
            default:
                break;
        }
        return p;
    } catch (e) {
        console.log("---ERROR---", e);
    }
}

const checkURL = async (url, driver) => {
    await sleeping(1000);
    let CurrentURL = await driver.getCurrentUrl()
    if (CurrentURL.includes(url))
        return true
    else
        return false
}

const callMeToClear = async (arg) => {
    let p = await arg.driver.findElement(webdriver.By[arg.selector || 'id'](arg.name));
    p.clear();
    return p;
}
>>>>>>> origin/master

