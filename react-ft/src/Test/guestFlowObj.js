let Config =require('./config');
let cf=require('./cf');

const guestLogin =  () => {
    let typeObj = [
        {name: 'name', key: 'test', type:cf.types[0],delay:'one'},
        {name: 'email', key: 'test@gmail.com', type:cf.types[0],delay:'one'},
        {name: 'zip', key: '33333333', type: cf.types[0],delay:'one'},
        {name: 'phone', key: '9999999999', type: cf.types[0],delay:'one'},
        {name: 'leadTypeRadio', type: cf.types[1], selector: 'className',delay:'one'},
        {name: 'ambassador', key: '1234', type:cf.types[0],delay:'one'},
        {name: 'proceedToQuote', type: cf.types[2], url: Config.Base_URL + '?tab=home&',delay:'ten'},
    ];
    return typeObj;
}

const guestHome=async (driver,index,title,size)=>{
    let guestHomeOBJ;
    await cf.sleeping(cf.delaySecond.ten);
    let t=await cf.getText(driver,'productLabel',index,'className');
    let s=await cf.getText(driver,'productNote2',index,'className');

    if(t===title && s===size)
    {
        guestHomeOBJ=[
           {name: 'productButton', type: cf.types[2], selector: 'className', url: Config.Base_URL + '?tab=size&',delay:'ten'}
        ];
        return Promise.resolve(guestHomeOBJ);
    }
    else
    {
        await driver.quit();
        throw  size+"  is different for " +title;
    }
}

const guestTabSize = ()=>{
    let GuestTabSize = [
        {name: 'width', key: '10000', type:cf.types[0],delay:'one'},
        {name: 'height', key: '3000', type:cf.types[0],delay:'five'},
        {name:'panels-12',type:cf.types[1],scrollDown:100,delay:'five',testContent:['******']},
        {name:'swingDirection-left',type:cf.types[1],scrollDown:400,delay:'five'},
        {name:'swingInOrOut-Outswing',type:cf.types[1],scrollDown:900,delay:'five'},
        {name:'nextTitle',type:cf.types[2],url: Config.Base_URL + '?tab=color&',delay:'ten',selector: 'className'}
    ];
    return  GuestTabSize
}

module.exports={guestLogin,guestHome,guestTabSize}