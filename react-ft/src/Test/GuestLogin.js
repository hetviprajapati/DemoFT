let Config =require('./config');

const guestLogin =  (types) => {
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

const guestHome=async (driver,types,index,title,heightWidth)=>{
    let t=await driver.executeScript(`return document.getElementsByClassName('productLabel')[${index}].innerText`);
    let HW=await  driver.executeScript(`return document.getElementsByClassName('productNote2')[${index}].innerText`);
    if(t===title && HW===heightWidth)
    {
        let guestHomeOBJ=[
           {name: 'productButton', type: types[3], selector: 'className', url: Config.Base_URL + '?tab=size&'}
        ];
        return  guestHomeOBJ;
    }
    else
    {
        await driver.quit();
        throw  heightWidth+"  is different for " +title;
    }
}

const guestTabSize = (types)=>{
    let GuestTabSize = [
        {name: 'width', key: '10000', type:types[0]},
        {name: 'height', key: '3000', type:types[0]},
        {name:'panels-12',type:types[2],scrollDown:100},
        {name:'swingDirection-left',type:types[2],scrollDown:200},
    //    {name:'swingInOrOut-Outswing',type:types[2]},
       // {name:'nextTitle',type:types[3],url: Config.Base_URL + '?tab=color&'}
    ];
    return  GuestTabSize
}

module.exports={guestLogin,guestHome,guestTabSize}