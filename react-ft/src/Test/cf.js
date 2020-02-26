let Config = require('./config');

let PDFJS = require('pdfjs-dist');
let worker=require('pdfjs-dist/build/pdf.worker.entry');

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
    2: 'button',
    3:'executeScript'
};

const sleeping = (time,v) => {
    return new Promise((resolve) => {
        setTimeout(resolve.bind(null,v), time*1000);
    })
}

const inputValue=(driver,arg)=>{
   return  driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name)).sendKeys(arg.key);
}

const clearInputValue=(driver,arg)=>{
    return  driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name)).clear();
}

const ExecuteScript=(driver,arg)=>{
    return driver.executeScript(arg.ExecuteScript);
}

const clickFn=async  (driver,arg)=>{
    if(arg.index)
        return  driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name))[arg.index].click().then(()=>sleeping(delaySecond[arg.delay]));
    else
        return  driver.findElement(Config.webdriver.By[arg.selector || 'id'](arg.name)).click().then(()=>sleeping(delaySecond[arg.delay]));
}

const Scroll=(driver,scrollValue)=>{
    return  driver.executeScript(`window.scrollBy(0,${scrollValue})`);
}

const getText=(driver,name,index,selector)=>{
     return driver.findElement(Config.webdriver.By[selector || 'id'](name)).getText();
}

const loginLinkClick = (driver) => {
    return driver.executeScript("document.getElementsByClassName('guestNoteLogin')[0].getElementsByTagName('a')[0].click()").then(() => sleeping(delaySecond.ten));
}

const checkURL = async (url, driver,name) => {
    let CurrentURL = await driver.getCurrentUrl()
    if (CurrentURL.includes(url))
        return true
    else
        throw " Retrived URL "+ CurrentURL  +" not matched with  " + url +" for " +name;
}

const callMe = async (driver,arg) => {
        switch (arg.type) {
            case types[0] :
                if(arg.isClear)
                    await clearInputValue(driver,arg);
                await  inputValue(driver,arg);
                if (arg.scroll) {
                    await Scroll(driver,arg.scroll)
                }
                break;
            case types[1] :
                if (arg.scroll) {
                   await Scroll(driver,arg.scroll)
                }
                await  clickFn(driver,arg);
                if(arg.testContent){
                  await testContentByArray(driver,arg.testContent);
                }
                break;
            case types[2]:
                if(arg.isAlert)
                {
                    await clickFn(driver,arg).then(()=>handleAlertOK(driver,arg));
                    if(arg.scroll)
                        await Scroll(driver,arg.scroll)
                }
                else
                    clickFn(driver,arg).then(()=>checkURL(arg.url, driver,arg.name));
                break;
            case types[3]:
                   ExecuteScript(driver,arg).then(()=> {if(arg.ur) checkURL(arg.url, driver,arg.name)});
                 break;
            default:
                break;
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
            return Promise.reject(contentNotMatchArray.join());

        return Promise.resolve();
    })
}

const handleAlertOK = (driver,arg) => {
    return driver.switchTo().alert().accept().then(() => sleeping(delaySecond[arg.delay]));
}

const handleOutput=(d, pc, flow) =>{
    return pc.then(() => {
            process.on('unhandledRejection', (reason, promise) => {});
           console.log('\x1b[32m%s\x1b[0m', 'All ' + flow + ' Integration Test passed successfully Done');
            return d.quit()
        }
    ).catch((reason) => {
        console.log('\x1b[31m%s\x1b[0m', reason + '\n' + flow + ' Integration Test Failed ');
        return d.quit();
    })
}

const handlePDF =async (d) => {
    let windows=await d.getAllWindowHandles();
    await  sleeping(delaySecond.ten);
    await d.switchTo().window(windows[2]);
    let url=await d.getCurrentUrl();
    console.log(url);
    return  url;
};

const ConvertPdfToText=async (d,pdfUrl)=> {

    PDFJS.GlobalWorkerOptions.workerSrc = worker;
    try{
        let loadingTask =await PDFJS.getDocument(pdfUrl);
        let maxPage=loadingTask._pdfInfo.numPages;
        console.log(maxPage);
        for (let i=1;i<=maxPage;i++)
        {
            let pdfPage=await loadingTask.getPage(i)
            let textContent=await pdfPage.getTextContent();

            let textItems = textContent.items;
            let finalString = "";
            for (let i = 0; i < textItems.length; i++) {
                let item = textItems[i];
                finalString += item.str + " ";
            }
            alert(finalString);
        }
    }catch (e) {
        console.log("Error",e);
    }
}

module.exports={
    types,
    delaySecond,
    sleeping,
    clickFn,
    getText,
    Scroll,
    loginLinkClick,
    checkURL,
    callMe,
    funProcess,
    handleOutput,
    testContentByArray,
    handleAlertOK,
    ConvertPdfToText,
    handlePDF
}