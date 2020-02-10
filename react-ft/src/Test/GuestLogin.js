let Config =require('./config');

const guestLogin = async (types) => {
    let typeObj = [
        {name: 'name', key: 'test', type:types[0]},
        {name: 'email', key: 'test@gmail.com', type:types[0]},
        {name: 'zip', key: '33333333', type: types[0]},
        {name: 'phone', key: '9999999999', type: types[0]},
        {name: 'leadTypeRadio', type: types[1], selector: 'className'},
        {name: 'ambassador', key: '1234', type:types[0]},
        {name: 'proceedToQuote', type: types[3], url: Config.Base_URL + '?tab=home&'},
    ];
    return  typeObj;
}

const guestHome=async (driver,types)=>{
    let title=await driver.executeScript("return document.getElementsByClassName('productLabel')[0].innerText");
    let heightWidth=await  driver.executeScript("return document.getElementsByClassName('productNote2')[0].innerText");
    if(title==="Aluminium Panoramic Door" && heightWidth==="Width 15 Meters, Height 3.0 Meters")
    {
        let guestHomeOBJ=[
           {name: 'productButton', type: types[2], selector: 'className', url: Config.Base_URL + '?tab=size&'}
        ];
        return  guestHomeOBJ;
    }
    else
    {
        await driver.quit();
        throw "Height Width is different for Aluminium Panoramic Door";
    }
}

const guestTabSize=async (types)=>{
    let GuestTabSize = [
        {name: 'width', key: '10000', type:types[0]},
        {name: 'height', key: '3000', type:types[0]},
        {name:'panels-12',type:types[2]},
        {name:'swingDirection-left',type:types[2]},
        {name:'swingInOrOut-Outswing',type:types[2]},
        {name:'nextTitle',type:types[3],url: Config.Base_URL + '?tab=color&'}
    ];
    return GuestTabSize
}

module.exports={guestLogin,guestHome,guestTabSize}