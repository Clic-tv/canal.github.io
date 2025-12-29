
function save(){
const data={
local:local.value,
subtitle:subtitle.value,
tv:tv.value,
time:time.value
};
localStorage.setItem("portal",JSON.stringify(data));
alert("Configuración guardada");
}
