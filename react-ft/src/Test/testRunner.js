let guestFlow = require('./guestFlow');
let viewQuoteFlow = require('./viewQuoteFlow');
let cf=require('./cf');

let pc = cf.sleeping(1000);
// Execute ALL the FT
const ExecuteALL = (pc) =>{
   // pc = guestFlow.testGuestFlow(pc);
    pc = viewQuoteFlow.testViewQuoteFlow(pc);
    return pc;
}

ExecuteALL(pc);