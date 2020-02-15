let guestFlow = require('./guestFlow');
let cf=require('./cf');

let pc = cf.sleeping(1000);
// Execute ALL the FT
const ExecuteALL = (pc) =>{
    pc = guestFlow.testGuestFlow(pc);
    return pc;
}

ExecuteALL(pc);