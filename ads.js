
const ads=["assets/ad1.jpg","assets/ad2.jpg","assets/ad3.jpg"];
let i=0;
setInterval(()=>{
adImage.src=ads[i%ads.length];
i++;
},4000);
