
const cfg=JSON.parse(localStorage.getItem("portal"))||{
local:"Sucursal",
subtitle:"WiFi + TV",
tv:"https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID&autoplay=1&mute=1",
time:5
};
document.addEventListener("DOMContentLoaded",()=>{
title.innerText=cfg.local;
subtitle.innerText=cfg.subtitle;
tvframe.src=cfg.tv;
connectBtn.href="http://login.mikrotik.com/login?username=demo&password=demo";
});
