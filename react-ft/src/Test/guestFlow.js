let Config=require('./config');
let Guest =require('./guestFlowObj');
let cf=require('./cf');

// FT Scenarios
const testGuestFlow = async () =>{
    let pc,guestObj;
    try{
        let driver = await Config.ConfigFunc();
        await driver.manage().window().maximize();
        pc = driver.get(Config.Base_URL).then(()=>cf.sleeping(cf.delaySecond.ten));

        pc=pc.then( ()=>
        {
            guestObj= Guest.guestLogin();
            return guestObj;
        });

        pc=pc.then(()=>cf.funProcess(driver,guestObj));

        pc=pc.then(async ()=>
        {
              guestObj=await Guest.guestHome(driver, 0, "Aluminium Panoramic Door", "Width 15 Meters, Height 3.0 Meters");
              return guestObj;
        });

        pc=pc.then(()=>cf.funProcess(driver,guestObj));

        pc=pc.then(()=>
        {
            guestObj= Guest.guestTabSize();
            return guestObj;
        });
        pc=pc.then(()=>cf.funProcess(driver,guestObj));

        pc = cf.handleOutput(driver, pc, 'Guest Flow');
        return pc;

    }catch (e) {
        console.log("---ERROR---",e)
    }
};

module.exports={
    testGuestFlow
}