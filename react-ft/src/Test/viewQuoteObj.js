let Config =require('./config');
let cf=require('./cf');

const viewQuote =  () => {
    let viewQuoteObj = [
       // {name: "btn-block", type: cf.types[2], url: Config.Base_URL + '?tab=home',selector: 'className',delay:'ten'},
        {name: 'email', key: 'admin', type:cf.types[0],delay:'one'},
        {name: 'password', key: 'test', type:cf.types[0],delay:'one'},
        {name: 'signInButton', type: cf.types[2], url: Config.Base_URL + '?tab=home',delay:'ten'},
        {name: 'headerRightMenu', type: cf.types[1],delay:'one'},
        {name: 'menuText',index:0, type: cf.types[2],  url: Config.Base_URL + '?tab=viewQuote&quote',selector: 'className',delay:'five'},//URL Change(wrong).
        {name:'quoteRow', type: cf.types[3],ExecuteScript:'document.getElementsByClassName("quoteRow")[0].firstElementChild.click()' , url: Config.Base_URL + '?tab=viewQuote&quote',delay:'ten'},
        {name:'printQuote',type:cf.types[3],ExecuteScript:'document.getElementsByClassName("customerBox")[0].getElementsByClassName("quoteActionButtons")[1].click()',scroll:600,delay:'five'},
        ];
    return viewQuoteObj;
}

module.exports={viewQuote}