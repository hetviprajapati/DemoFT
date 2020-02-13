let Config=require('./config');
let Guest =require('./GuestLogin');

let  types = {
    0: 'text',
    1: 'radio',
    2: 'checkbox',
    3: 'button'
};

(async function ExecuteALL() {
    let p;
    try{
        let driver = await Config.ConfigFunc();

        let  GuestLoginOBJ =await Guest.guestLogin(types);
        await  Promise.all(GuestLoginOBJ.map(async (arg) => await callMe({driver, ...arg})));

        let GuestHomeOBJ=await  Guest.guestHome(driver,types,0,"Aluminium Panoramic Door","Width 15 Meters, Height 3.0 Meters");
        await Promise.all(GuestHomeOBJ.map(async (arg) => await callMe({driver, ...arg})));

        let GuestTabSizeOBJ=  Guest.guestTabSize(types);
        await Promise.all(GuestTabSizeOBJ.map(async (arg) =>{
            // p=await sleeping(5000, "Before " + arg.name);
            console.log("***********GuestTabSizeOBJ "+arg.name)
            p= await callMe({driver, ...arg})
            return p;
        }));

    }catch (e) {
        console.log("---ERROR---",e)
    }
})();

const callMe = async (arg) => {
    let p,pc;
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
               await  sleeping(10000, "Before " + arg.name)
                if (arg.scrollDown) {
                    await arg.driver.executeScript(`window.scrollBy(0,${arg.scrollDown})`);
                    console.log("----Scrolling Down-----");
                }
                p = await arg.driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name));
                await p.click();
                break;
            case types[3]:
                console.log("-----Process for "+arg.name+"");
                p = await arg.driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name));
                await p.click();
                await sleeping(10000, "After " + arg.name);
                if (arg.url) {
                const check = await checkURL(arg.url, arg.driver)
                if (!check) {
                    await arg.driver.quit();
                    throw "URL not matched for " + arg.name;
                }
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

const sleeping = (time,t) => {
    console.log("========= Sleep Call " +t+"=============")
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

const checkURL = async (url, driver) => {
    console.log("-------Check URL for" + url+"---------");
    let CurrentURL = await driver.getCurrentUrl()
    if (CurrentURL.includes(url))
        return true
    else
        return false
}

module.exports = {callMe};





