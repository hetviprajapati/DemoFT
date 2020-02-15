let Config = require('./config');

let delaySecond=Object.freeze({
    "one":1,
    "two":2,
    "five":5,
    "ten":10,
    "twenty":20,
    "thirty":30,
})

let  types = {
    0: 'input',
    1: 'click',
    2: 'button'
};

const sleeping = (time,v) => {
    return new Promise((resolve) => {
        setTimeout(resolve.bind(null,v), time*1000);
    })
}

const inputValue=(driver,arg)=>{
   return  driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name)).sendKeys(arg.key);
}

const clickFn=(driver,arg)=>{
    return  driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name)).click().then(()=>sleeping(delaySecond[arg.delay]));
}

const ScrollDown=(driver,scrollValue)=>{
    return  driver.executeScript(`window.scrollBy(0,${scrollValue})`);
}

const getText=(driver,name,index,selector)=>{
     return driver.findElement(Config.webdriver.By[selector || 'id'](name)).getText();
}

const checkURL = async (url, driver,name) => {
    let CurrentURL = await driver.getCurrentUrl()
    if (CurrentURL.includes(url))
        return true
    else
        throw " Retrived URL "+ CurrentURL  +" not matched with  " + url +" for " +name;
}

const callMe = async (driver,arg) => {
    try {
        switch (arg.type) {
            case types[0] :
                inputValue(driver,arg);
                break;
            case types[1] :
                if (arg.scrollDown) {
                    ScrollDown(driver,arg.scrollDown)
                }
                if(arg.testContent){
                   await testContentByArray(driver,arg.testContent);
                }
                clickFn(driver,arg);
                break;
            case types[2]:
                clickFn(driver,arg).then(()=>checkURL(arg.url, driver,arg.name));
                break;
            default:
                break;
        }
    } catch (e) {
        console.log("---ERROR---", e);
    }
}

const funProcess=async (driver,obj)=>{
    for(let i=0;i<obj.length;i++)
    {
      await  callMe(driver, obj[i]);
      await  sleeping(delaySecond[obj[i].delay]);
    }
    obj=[];
    return obj;
}

const testContentByArray=async (driver, contentArray)=> {
    await sleeping(delaySecond.five);
    let contentNotMatchArray = [];
    return driver.getPageSource().then(function (p) {
        contentArray.forEach((content) => {
            if (p.indexOf(content) < 0) {
                contentNotMatchArray.push('"' + content + '" is not found in page source')
            }
        })
        if (contentNotMatchArray.length > 0)
           throw contentNotMatchArray.join();
        return Promise.resolve();
    })
}

const handleOutput=(d, pc, flow) =>{
    return pc.then(() => {
            process.on('unhandledRejection', (reason, promise) => {});
            console.log('all ' + flow + ' Integration Test passed successfully Done');
            return d.quit()
        }
    ).catch((reason) => {
        console.log('fail');
        console.log( flow + ' Integration Test Failed  \n' + reason);
        return d.quit();
    })
}

module.exports={
    types,
    delaySecond,
    sleeping,
    inputValue,
    clickFn,
    getText,
    ScrollDown,
    checkURL,
    callMe,
    funProcess,
    handleOutput,
    testContentByArray
}