let Config=require('./config');
let Guest =require('./GuestLogin');

let  types = {
    0: 'text',
    1: 'radio',
    2: 'checkbox',
    3: 'button'
};

(async function ExecuteALL() {
    try{
        let driver = await Config.ConfigFunc();

        let  GuestLoginOBJ =await Guest.guestLogin(types);
        await GuestLoginOBJ.map(async (arg) => await callMe({driver, ...arg}))

        await sleeping(5000);

        let GuestHomeOBJ=await  Guest.guestHome(driver,types);
        await GuestHomeOBJ.map(async (arg) => await callMe({driver, ...arg}))

        await sleeping(20000);

        let GuestTabSizeOBJ=await  Guest.guestTabSize(types);
        await GuestTabSizeOBJ.map(async (arg) => await callMe({driver, ...arg}))

    }catch (e) {
        console.log("---ERROR---",e)
    }
})();

const callMe = async (arg) => {
    let p;
    try {
        switch (arg.type) {
            case types[0] :
                p = await arg.driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name));
                p.sendKeys(arg.key);
                break;
            case types[1] :
                p = await arg.driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name));
                p.click();
                break;
            case types[2] :
                await sleeping(10000);
                p = await arg.driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name));
                p.click();
                break;
            case types[3]:
                p = await arg.driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name));
                p.click();
                await sleeping(10000);
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

const sleeping = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

const checkURL = async (url, driver) => {
    await sleeping(1000);
    let CurrentURL = await driver.getCurrentUrl()
    if (CurrentURL.includes(url))
        return true
    else
        return false
}

module.exports = {callMe};
