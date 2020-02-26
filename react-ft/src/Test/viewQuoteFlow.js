let Config=require('./config');
let viewQuote =require('./viewQuoteObj');
let cf=require('./cf');


// FT Scenarios
const testViewQuoteFlow = async () =>{
    let pc,viewQuoteObj;
    let driver = await Config.ConfigFunc();
    await driver.manage().window().maximize();
    pc = driver.get(Config.Base_URL).then(()=>cf.sleeping(cf.delaySecond.ten));

    pc=pc.then(()=>cf.loginLinkClick(driver).then(()=>cf.checkURL( Config.Base_URL +'?tab=signIn',driver,'Sign IN Page')))

    pc=pc.then( ()=>
    {
        viewQuoteObj= viewQuote.viewQuote();
        return viewQuoteObj;
    });

    pc=pc.then(()=>cf.funProcess(driver,viewQuoteObj,pc));

    pc=pc.then(()=>cf.handlePDF(driver).then((URL)=>cf.ConvertPdfToText(driver,URL)));

    pc = cf.handleOutput(driver, pc, 'View Quote Flow');
    return pc;
};
module.exports={
    testViewQuoteFlow
}