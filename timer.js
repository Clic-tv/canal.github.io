
let c=cfg.time;
const t=setInterval(()=>{
countdown.innerText=c;
c--;
if(c<0){
clearInterval(t);
window.location=connectBtn.href;
}
},1000);
