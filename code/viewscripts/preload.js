const { contextBridge, ipcMain, ipcRenderer } = require('electron')

function enviarTiempo(miliSeconds, voltearCarEnd, inter, tiempoIni, seleccion, ganancia, perdida, total, finR, rean){
  ipcRenderer.send("guardarTiempo", miliSeconds, voltearCarEnd, inter, tiempoIni, seleccion, ganancia, perdida, total, finR, rean);
}

function enviarConfig(config){
  ipcRenderer.send("enviarConfig", config)
}

function enviarSeñal(){
  ipcRenderer.send("modal")
}

function cargarIGT(){
  ipcRenderer.send("cargarIGT")
}

function cargarNameSettings(){
  ipcRenderer.send("cargarNameSettings")
}
function cargarMod(){
  ipcRenderer.send("cargarMod")
}

function loadSetting(opcion){
  ipcRenderer.send("loadSetting", opcion)
}

function abrirEx(){
  ipcRenderer.send("abrirEx")
}

function uExcel(datos){
  ipcRenderer.send("uExcel", datos)
}

function uExcel2(datos){
  ipcRenderer.send("uExcel2", datos)
}

function delSuj(datos){
  ipcRenderer.send("delSuj", datos)
}

function delExp(datos){
  ipcRenderer.send("delExp", datos)
}

function modSuj(datos){
  ipcRenderer.send("modSuj", datos)
}

function modSuj2(datos){
  ipcRenderer.send("modSuj2", datos)
}

function usExcel(datos){
  ipcRenderer.send("usExcel", datos)
}


function saveSet(configuracion){
  resp = ipcRenderer.send("saveSet", configuracion)
}

function saveSuj(datos){
  resp = ipcRenderer.send("saveSuj", datos)
}

function getAnalisis(){
  ipcRenderer.send("getAnalisis")
}

function getResultados(id){
  ipcRenderer.send("getResultados", id)
}

function getSujetos(){
  ipcRenderer.send("getSujetos")
}

function getSujetosPre(){
  ipcRenderer.send("getSujetosPre")
}

function sendSujeto(id){
  ipcRenderer.send("sendSujeto", id)
}

function enviarDatosnuevos(datosnuevos){
  ipcRenderer.send("enviarDatosnuevos", datosnuevos)
}

function enviarCredenciales(id){
  //console.log("enviarusuario")
  ipcRenderer.send("enviarCredenciales", id)
}

function sendCred(cred){
  //console.log("enviarusuario")
  ipcRenderer.send("sendCred", cred)
}


function confirmPass(pass){
  ipcRenderer.send("confirmPass", pass)
}

function cargarPro(){
  ipcRenderer.send("cargarPro")
}

function reset(){
  ipcRenderer.send("reset")
}

function cargarRes(){
  ipcRenderer.send("cargarRes")
}

function cargarModi(){
  ipcRenderer.send("cargarModi")
}

function guardarExp(){
  ipcRenderer.send("guardarExp")
}
function probarBase(){
  ipcRenderer.send("probarBase")
}

function python(){
  ipcRenderer.invoke("python")
}


let indexBridge = {
  enviarTiempo: enviarTiempo,
  enviarConfig: enviarConfig,
  cargarIGT: cargarIGT,
  cargarC: (callback) => ipcRenderer.on("cargarC", (callback)),
  cargarNameSettings: cargarNameSettings,
  cargarMod: cargarMod,
  cargarNS: (callback) => ipcRenderer.on("cargarNS", (callback)),
  cargarM: (callback) => ipcRenderer.on("cargarM", (callback)),
  cargarP: (callback) => ipcRenderer.on("cargarP", (callback)),
  conAho: (callback) => ipcRenderer.on("conAho", (callback)),
  puertoDesc: (callback) => ipcRenderer.on("puertoDesc", (callback)),
  loadSetting: loadSetting,
  abrirEx: abrirEx,
  uExcel: uExcel,
  uExcel2: uExcel2,
  delSuj: delSuj,
  delExp: delExp,
  modSuj: modSuj,
  modSuj2: modSuj2,
  usExcel: usExcel,
  cargarSetting: (callback) => ipcRenderer.on("cargarSetting", (callback)),
  resultClasi: (callback) => ipcRenderer.on("resultClasi", (callback)),
  saveSet: saveSet,
  saveSuj: saveSuj,
  getAnalisis: getAnalisis,
  sendModelo: (callback) => ipcRenderer.on("sendModelo", (callback)),
  sendAlerta: (callback) => ipcRenderer.on("sendAlerta", (callback)),
  sendGr: (callback) => ipcRenderer.on("sendGr", (callback)),
  cargarAnalisis: (callback) => ipcRenderer.on("cargarAnalisis", (callback)),
  cargarEtiqueta: (callback) => ipcRenderer.on("cargarEtiqueta", (callback)),
  getResultados: getResultados,
  sendDatosMod: (callback) => ipcRenderer.on("sendDatosMod", (callback)),
  cargarResultados: (callback) => ipcRenderer.on("cargarResultados", (callback)),
  getSujetos: getSujetos,
  getSujetosPre: getSujetosPre,
  cargarSujetos: (callback) => ipcRenderer.on("cargarSujetos", (callback)),
  sendSujeto: sendSujeto,
  reset:reset,
  cargarCuestionario: (callback) => ipcRenderer.on("cargarCuestionario", (callback)),
  enviarCredenciales: enviarCredenciales,
  sendCred: sendCred,
  loginCorrecto: (callback) => ipcRenderer.on("loginCorrecto", (callback)),
  confirmPass: confirmPass,
  resultPass: (callback) => ipcRenderer.on("resultPass", (callback)),
  cargarPro: cargarPro,
  getPro: (callback) => ipcRenderer.on("getPro", (callback)),
  enviarDatosnuevos: enviarDatosnuevos,
  cargarRes: cargarRes,
  cargarModi: cargarModi,
  cargarR: (callback) => ipcRenderer.on("cargarR", (callback)),
  sendResponse: (callback) => ipcRenderer.on("sendResponse", (callback)),
  backup: (callback) => ipcRenderer.on("backup", (callback)),
  listo: (callback) => ipcRenderer.on("listo", (callback)),
  error: (callback) => ipcRenderer.on("error", (callback)),
  scores: (callback) => ipcRenderer.on("scores", (callback)),
  restore: (callback) => ipcRenderer.on("restore", (callback)),
  nodal: (callback) => ipcRenderer.on("nodal", (callback)),
  enviarSeñal: enviarSeñal,
  guardarExp: guardarExp,
  probarBase: probarBase,
  sensores() {
    ipcRenderer.send('sensores');
  },
  encender(){
    ipcRenderer.send('encender');
  },
  apagar(){
    ipcRenderer.send('apagar');
  },
  finIgt(){
    ipcRenderer.send('finIgt');
  },
  python(){
    ipcRenderer.invoke('python')
  }
}

contextBridge.exposeInMainWorld("Bridge", indexBridge);

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

