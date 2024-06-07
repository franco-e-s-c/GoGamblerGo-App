const { app, BrowserWindow, ipcMain, Menu, ipcMainEvent } = require('electron')

const {PythonShell} = require('python-shell')
const path = require('path')
const shuffleSeed = require('shuffle-seed');
const fs = require('fs');
const fsp = require('fs').promises
const { dialog } = require('electron')

let credenciales
let bandPy = 0
let mazoAG = []
let mazoAP = []
let mazoBG = []
let mazoBP = []
let mazoCG = []
let mazoCP = []
let mazoDG = []
let mazoDP = []
let mezcladoA = []
let mezcladoB = []
let mezcladoC = []
let mezcladoD = []
let bancoini
let configFlag
let tiempo = 0
let selecciones = 0
var mainWindow
let nombres
let configuracion
let user
let password = "pass"
let id
let id_sujeto
let nombre_sujeto
let nombre_config
let idd
let id_aplicador
let id_exp
let flagPru = false
let flagExp = false
let datoI = 0
let modalCont = 0
let inicioPru
let flagPrim = false
let modi
let pool
let user1
let host1
let database1
let password1
let port

//Funcion que crea la ventana de navegador
function createWindow () {
      mainWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      minWidth: 1280,
      minHeight: 720,
      webPreferences: {
        preload: path.join(__dirname, 'viewscripts/preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
        devTools: false,
      }
    })
    //mainWindow.loadFile('views/sujetos copy.html')
    mainWindow.loadFile('views/login.html')
    mainWindow.menuBarVisible = false
    mainWindow.maximize()
    mainWindow.setAspectRatio(16/9)
    //shuffle(mazoG,mazoP)
    mainWindow.fullScreen = false
    mainWindow.resizable = true
    
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

function shuffle(mazoG, mazoP, nombre, configFlag, dato){
     var resp = []
     console.log("MAZOG: ", mazoG)
     console.log("MAZOP: ", mazoP)
     const merge = (first, second, third) => {
          for(let i=0; i<second.length; i++) {
               let pares = [];
               pares.push(first[i]);
               pares.push(second[i]);
               third.push(pares);
          }
          return third;
          }
     let obj = [];
     resultadoPares = merge(mazoG, mazoP, obj)
     console.log("OBJ: ", obj)
     console.log("PARES: ", resultadoPares)
     if (configFlag == '1'){
          n = dato/10
     }
     else if(configFlag == '2'){
          n = Math.ceil(dato/3)
     }
     for(var i = 0; i< n; i++){
          ad = i.toString()
          nombre2 = nombre+ad
          var shuf = shuffleSeed.shuffle(resultadoPares,nombre2)
          console.log("PARES INDV: ", shuf)
          resp = resp.concat(shuf)
     }
     console.log("PARES JUTNOS: ", resp)

     return resp
}

//Funciones para la base de datos
const { Pool } = require('pg');

async function conectar(){
  const archivo = 'database.txt';

  let lineas = [];

  fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }

    lineas = data.split('\n').map(linea => linea.trim());
    console.log(lineas)
    user1 = lineas[0]
    host1 = lineas[1]
    database1 = lineas[2]
    password1 = lineas[3]
    port = parseInt(lineas[4])
    credenciales = {
      user: user1,
      host: host1,
      database: database1,
      password: password1,
    }
    pool = new Pool(credenciales);
    pool.connect()
        .then(()=>{
          console.log("extio")
          messages = "1"
          mainWindow.webContents.send("restore", messages)
        })
        .catch(err=>{
          console.log("ERROR")
        messages = "2"
        mainWindow.webContents.send("restore", messages)
        console.log(err)
        })
  //   try {
  //     pool.connect()
  //   }
  //   catch(err){
  // }
  });
}

ipcMain.on("sendCred", async(event, cred)=>{
  let userC = cred[0]
  let hostC = cred[1]
  let dataC = cred[2]
  let passC = cred[3]
  let portC = cred[4]
  let archivo= "database.txt"
  let contenido = `${userC}\n${hostC}\n${dataC}\n${passC}\n${portC}`
  fs.writeFile(archivo, contenido, 'utf8', (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
      mainWindow.webContents.send('listo', ["1", "Error"])
      return;
    }
    mainWindow.webContents.send('listo', ["0", "Success"])
    console.log('El archivo fue sobrescrito exitosamente.');
  });
})


ipcMain.on("probarBase", async(event)=>{
  console.log("PPPPP")
  conectar()
})

//Funcion para sacar la configuracion de la base de datos
async function getSettings(nombre){
  nombre_config = nombre
  const query = await pool.query(`SELECT * FROM configuracion WHERE nombreconf = '${nombre}'`)
  res = query.rows[0]
  mazoAG = res.mazoagan
  mazoAP = res.mazoaper
  mazoBG = res.mazobgan
  mazoBP = res.mazobper
  mazoCG = res.mazocgan
  mazoCP = res.mazocper
  mazoDG = res.mazodgan
  mazoDP = res.mazodper
  tiempo = res.tiempo
  selecciones = res.numsel
  bancoini = res.bancoini
  ani = res.ani
  if (tiempo == null){
    configFlag = "1"
    mezcladoA = shuffle(mazoAG,mazoAP, nombre, configFlag, selecciones)
    mezcladoB = shuffle(mazoBG,mazoBP, nombre, configFlag, selecciones)
    mezcladoC = shuffle(mazoCG,mazoCP, nombre, configFlag, selecciones)
    mezcladoD = shuffle(mazoDG,mazoDP, nombre, configFlag, selecciones)
  }
  else{
    configFlag = "2"
    mezcladoA = shuffle(mazoAG,mazoAP, nombre, configFlag, tiempo)
    mezcladoB = shuffle(mazoBG,mazoBP, nombre, configFlag, tiempo)
    mezcladoC = shuffle(mazoCG,mazoCP, nombre, configFlag, tiempo)
    mezcladoD = shuffle(mazoDG,mazoDP, nombre, configFlag, tiempo)
  }
  configuracion = [nombre, mazoAG, mazoAP,mazoBG, mazoBP,mazoCG, mazoCP,mazoDG, mazoDP,mezcladoA,mezcladoB,mezcladoC,mezcladoD,tiempo,selecciones,bancoini,configFlag, ani] 
  return configuracion
}

//Funcion para sacar el nombre de todas las configuraciones
async function getNameSet(){
  const query = await pool.query('SELECT nombreconf FROM configuracion')
  nombres = query.rows
  return nombres
}

async function getTime(id_exp){
    const query = await pool.query('SELECT tclic FROM resultado  WHERE id_exp = $1 ORDER BY iteracion DESC LIMIT 1', [id_exp]);

    if (query.rows.length == 0){
        anter = 0
    }
    else{
        anterior = query.rows[0].tclic
        anter = anterior
    }
    return anter
}

async function delSuje(id_suj){
  try{
    var query= await pool.query(`DELETE FROM resultado WHERE id_participante IN (${id_suj})`)
    query= await pool.query(`DELETE FROM experimento WHERE id_participante IN (${id_suj})`)
    query= await pool.query(`DELETE FROM participante WHERE id_participante IN (${id_suj})`)
    console.log(query)
    return true
  } catch(error){
    console.log(error)
    return false
  }
}

async function delExp(id_suj){
  try{
    var query= await pool.query(`DELETE FROM resultado WHERE id_participante IN (${id_suj})`)
    query= await pool.query(`DELETE FROM experimento WHERE id_participante IN (${id_suj})`)
    query= await pool.query(`UPDATE participante SET expterminado = false WHERE id_participante IN (${id_suj})`)
    console.log(query)
    return true
  } catch(error){
    console.log(error)
    return false
  }
}

ipcMain.on('delSuj', async(event, id_suj)=>{
  console.log("ID", id_suj)
  estado = await delSuje(id_suj)
  console.log(estado)
  mainWindow.webContents.send('listo', estado)
})

ipcMain.on('delExp', async(event, id_suj)=>{
  console.log("ID", id_suj)
  estado = await delExp(id_suj)
  console.log(estado)
  mainWindow.webContents.send('listo', estado)
})

ipcMain.on('modSuj', async(event, id_suj)=>{
  console.log("ID", id_suj)
  modi = await modSuje(id_suj)
})

ipcMain.on('modSuj2', async(event, datos)=>{
  console.log("ID", datos)
  modi = await modSuje2(datos)
})

ipcMain.on('cargarModi', async(event)=>{
  mainWindow.webContents.send('listo', modi)
})

// ipcMain.on('uExcel', async(event, datos)=>{
//      let options = {
//           scriptPath: path.join(__dirname, '/python/'),
//           mode: 'text',
//           args: ["HOLA"]
//      }
//      console.log(datos)
//      archivo = "usuarioExcel.py"
//      let pyshell = new PythonShell(archivo, options);
//      pyshell.send(datos)
//      pyshell.on('message', function (message){
//           console.log("ADDSANDOAIEN", message)
//      })
//      pyshell.end(function (err,code,signal) {
//           if (err){
//           console.log(err)
//           };
//           // for (let i = 0; i<etiqueRes.length; i++){
//           // etiqueta = etiqueRes[i]
//           // resultClasi[i]["etiqueta"] = etiqueta
//           // }
//           // mainWindow.webContents.send("resultClasi", resultClasi)
//           console.log('The exit code was: ' + code);
//           console.log('The exit signal was: ' + signal);
//           console.log('finished');
//           dialog.showSaveDialog({ 
//                title: 'Select the File Path to save', 
//                defaultPath: path.join(__dirname, '/Exp_'+datos+'_IGT.csv'), 
//                // defaultPath: path.join(__dirname, '../assets/'), 
//                buttonLabel: 'Save', 
//                // Restricting the user to only Text Files. 
//                filters: [ 
//                    {   name: 'CSV files',
//                        extensions: ['csv'] 
//                    }, ], 
//                properties: [] 
//            }).then(file => { 
//                // Stating whether dialog operation was cancelled or not. 
//                console.log(file.canceled); 
//                if (!file.canceled) { 
//                    console.log(file.filePath.toString()); 
                     
//                    // Creating and Writing to the sample.txt file 
//                    fs.copyFile(__dirname+'/experimentos/Exp_'+datos+'_IGT.csv',file.filePath.toString(),
//                          function (err) { 
//                          if (err) throw err; 
//                          console.log('Saved!'); 
//                    }); 
//                } 
//            }).catch(err => { 
//                console.log(err) 
//            }); 
//      });
// })

ipcMain.on('uExcel2', async(event, datos)=>{
  let options = {
       mode: 'text',
       args: ["HOLA"],
      //  scriptPath: path.join(__dirname, '/python/')
  }
  console.log("DATOS",datos)
  archivo = "usuarioExcel2.py"
  let pyshell = new PythonShell(path.join(process.resourcesPath, '/python/usuarioExcel2.py'), options);
  // let pyshell = new PythonShell(archivo, options);
  datosC = {
    host: host1,
    user: user1,
    password: password1,
    database: database1,
    porto: port,
    datos: datos
  }
  datosC = JSON.stringify(datosC)
  pyshell.send(datosC)
  pyshell.on('message', function (message){
       console.log("ADDSANDOAIEN", message)
  })
  pyshell.end(function (err,code,signal) {
       if (err){
       console.log(err)
       messages = [code.toString(),__dirname+'/experimentos/', err] 
      mainWindow.webContents.send('listo', messages)
      return
       };
       console.log('The exit code was: ' + code);
       console.log('The exit signal was: ' + signal);
       console.log('finished');
       dialog.showSaveDialog({ 
            title: 'Select the File Path to save', 
            defaultPath: path.join(process.resourcesPath, '/data.zip'), 
            // defaultPath: path.join(__dirname, '/data.zip'), 
            // defaultPath: path.join(__dirname, '../assets/'), 
            buttonLabel: 'Save', 
            // Restricting the user to only Text Files. 
            filters: [ 
                {   name: 'ZIP file',
                    extensions: ['zip'] 
                }, ], 
            properties: [] 
        }).then(file => { 
            // Stating whether dialog operation was cancelled or not. 
            console.log(file.canceled); 
            if (!file.canceled) { 
                console.log(file.filePath.toString()); 
                  
                // Creating and Writing to the sample.txt file 
                fs.copyFile(process.resourcesPath+'/experimentos/archive.zip',file.filePath.toString(),
                // fs.copyFile(__dirname+'/experimentos/archive.zip',file.filePath.toString(),
                      function (err) { 
                      if (err) throw err; 
                      console.log('Saved!'); 
                }); 
            } 
        }).catch(err => { 
            console.log(err)
            mainWindow.webContents.send('listo', [err, 'error']) 
        });
        messages = [code.toString(), process.resourcesPath+'/experimentos/', signal, 'LISTO'] 
        mainWindow.webContents.send('listo', messages)
  });
})


// ipcMain.on('usExcel', async(event)=>{
//      let options = {
//           scriptPath: path.join(__dirname, '/python/'),
//           mode: 'text',
//           args: ["HOLA"]
//      }
//      archivo = "usuariosExcel.py"
//      let pyshell = new PythonShell(archivo, options);
//      pyshell.on('message', function (message){
//           console.log("ADDSANDOAIEN", message)
//      })
//      pyshell.end(function (err,code,signal) {
//           if (err){
//           console.log(err)
//           };
//           // for (let i = 0; i<etiqueRes.length; i++){
//           // etiqueta = etiqueRes[i]
//           // resultClasi[i]["etiqueta"] = etiqueta
//           // }
//           // mainWindow.webContents.send("resultClasi", resultClasi)
//           console.log('The exit code was: ' + code);
//           console.log('The exit signal was: ' + signal);
//           console.log('finished');
//           messages = [code.toString(),__dirname+'/experimentos/']
//           mainWindow.webContents.send('listo', messages)
//      });
// })

async function getIte(id_exp){
  const query = await pool.query('SELECT iteracion FROM resultado  WHERE id_exp = $1 ORDER BY iteracion DESC LIMIT 1', [id_exp])
  if (query.rows.length == 0){
    ite = 0
  }
  else{
    ite = query.rows[0].iteracion +1
  }
  return ite
}

async function saveSujDB(datos){
     try{
          const query = await pool.query("INSERT INTO participante (nombre, apellidos, fechanac, telefono, escolaridad, sexo)VALUES($1, $2, $3, $4, $5, $6)",
          [datos[0], datos[1], datos[2], datos[5], datos[3], datos[4]])
          return query.rows
     }
     catch(e){
          return [0, e]
     }
}

async function saveSetDB(configuracion){
  if (configuracion[13]=="1"){
    configuracion[13]=true
  }
  else {
    configuracion[13]=false
  }
  if (configuracion[12]=="1"){
    try{
      const query = await pool.query("insert into configuracion (nombreconf, mazoagan, mazoaper, mazobgan, mazobper, mazocgan, mazocper, mazodgan, mazodper, numsel, tiempo, bancoini, ani) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NULL, $11, $12)", 
      [configuracion[0], configuracion[1], configuracion[2], configuracion[3], configuracion[4], configuracion[5], configuracion[6], configuracion[7], configuracion[8], configuracion[9], configuracion[11], configuracion[13]])
      return query.rows
    }
    catch(e) {
      console.log(e)
      return [0,e.detail]
    }
  }
  else if (configuracion[12]=="2"){
    try{
    const query = await pool.query("insert into configuracion (nombreconf, mazoagan, mazoaper, mazobgan, mazobper, mazocgan, mazocper, mazodgan, mazodper, numsel, tiempo, bancoini, ani) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, NULL, $10, $11, $12)", 
    [configuracion[0], configuracion[1], configuracion[2], configuracion[3], configuracion[4], configuracion[5], configuracion[6], configuracion[7], configuracion[8], configuracion[10], configuracion[11], configuracion[17]])
    return query.rows
    }
    catch(e) {
      console.log(e)
      return [0,e.detail]
    }
  }


}

const setTime = async (id_exp, id_sujeto, ite, seleccion, ganancia, perdida, total, click, voltearCarEnd, intervalo, finR, rean) =>{
    const query = await pool.query('INSERT INTO resultado(id_exp, id_participante, iteracion, seleccion, ganancia, perdida, total, tclic, tretroalimentacion, tintervalo, tinicio, tfinretro) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
    [id_exp, id_sujeto, ite, seleccion, ganancia, perdida, total, click, voltearCarEnd, intervalo, rean, finR])
}

async function getAnalisis(){
  const query = await pool.query(`SELECT id_exp,participante.id_participante, nombre ||' '|| apellidos as nombre_completo, fecha, fechanac as edad, telefono, escolaridad, case when sexo = false then 'Woman' when sexo = true then 'Man' end as sexo, nombreconf 
  FROM participante, experimento
  WHERE participante.id_participante = experimento.id_participante`)
  for (i=0; i< query.rows.length; i++){
     console.log("FECHGA", query.rows[i].fecha.getMonth())
     var year = query.rows[i].fecha.getFullYear();
     var month = query.rows[i].fecha.getMonth() + 1; // Sumar 1 porque los meses son indexados desde 0
     var day = query.rows[i].fecha.getDate();

     query.rows[i].fecha = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

     var year = query.rows[i].edad.getFullYear();
     var month = query.rows[i].edad.getMonth() + 1; // Sumar 1 porque los meses son indexados desde 0
     var day = query.rows[i].edad.getDate();
     // Formatear la salida
     query.rows[i].edad = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    
  }
  return query.rows
}

async function getResultados(id){
  const query = await pool.query(`SELECT id_exp, to_char(tinicio,'HH24:MI:SS:MS') as tinicio, to_char(tfinretro,'HH24:MI:SS:MS') as tfinretro, iteracion, seleccion, ganancia,perdida,total,to_char(tclic,'HH24:MI:SS:MS') as tclic,to_char(tretroalimentacion,'HH24:MI:SS:MS') as tretroalimentacion,tintervalo FROM resultado WHERE id_exp = '${id}' AND iteracion != 0 ORDER BY iteracion ASC`)
  return query.rows
}

const getSujetosPre = async ()=>{
  const query = await pool.query(`SELECT DISTINCT participante.id_participante, nombre ||' '|| apellidos as nombre_completo,  fechanac as edad, telefono, escolaridad, case when sexo = false then 'Woman' when sexo = true then 'Man' end as sexo 
  from participante
  WHERE participante.id_participante NOT IN (SELECT id_participante FROM experimento)`)
  for (i=0; i< query.rows.length; i++){
    
    var year = query.rows[i].edad.getFullYear();
    var month = query.rows[i].edad.getMonth() + 1; // Sumar 1 porque los meses son indexados desde 0
    var day = query.rows[i].edad.getDate();
    // Formatear la salida
    query.rows[i].edad = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
   
 }
  return query.rows
}

const getSujetos = async ()=>{
  const query = await pool.query(`SELECT participante.id_participante, nombre ||' '|| apellidos as nombre_completo,  fechanac as edad, telefono, escolaridad, 
  case when sexo = false then 'Woman' when sexo = true then 'Man' end as sexo, 
  case WHEN participante.id_participante IN (SELECT id_participante FROM experimento) THEN 'Yes' WHEN participante.id_participante NOT IN (SELECT id_participante FROM experimento) THEN 'No' end as expterminado 
  from participante`)
  for (i=0; i< query.rows.length; i++){
   
    var year = query.rows[i].edad.getFullYear();
    var month = query.rows[i].edad.getMonth() + 1; // Sumar 1 porque los meses son indexados desde 0
    var day = query.rows[i].edad.getDate();
    // Formatear la salida
    query.rows[i].edad = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
   
 }
  return query.rows

}

async function sendSujeto(id){
  const query = await pool.query(`SELECT id_participante, nombre ||' '|| apellidos as nombre_completo,  fechanac as edad, telefono, escolaridad, case when sexo = false then 'Woman' when sexo = true then 'Man' end as sexo from participante WHERE id_participante = '${id}'`)
  for (i=0; i< query.rows.length; i++){
    var year = query.rows[i].edad.getFullYear();
    var month = query.rows[i].edad.getMonth() + 1; // Sumar 1 porque los meses son indexados desde 0
    var day = query.rows[i].edad.getDate();
    // Formatear la salida
    query.rows[i].edad = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
   
 }
  res = query.rows[0]
  id_sujeto = res.id_participante
  nombre_sujeto = res.nombre_completo
  return query.rows
}

async function modSuje(id){
  const query = await pool.query(`SELECT id_participante, nombre, apellidos, to_char("fechanac", 'YYYY-MM-DD') as fechanac, telefono, escolaridad, sexo from participante WHERE id_participante = '${id}'`)
  res = query.rows[0]
  return query.rows
}

async function modSuje2(datos){
  const query = await pool.query(`UPDATE participante SET nombre = '${datos[1]}', apellidos = '${datos[2]}', fechanac = '${datos[3]}', telefono = '${datos[6]}', escolaridad = '${datos[4]}', sexo = ${datos[5]} WHERE id_participante = '${datos[0]}'`)
  res = query.rows[0]
  return query.rows
}

async function getLogin(user, password){
  const query = await pool.query(`SELECT id_aplicador from aplicador WHERE usuario = '${user}' AND contraseña = '${password}'`)
  id = query.rows
  id_aplicador = query.rows[0].id_aplicador
  return query.rows
}

async function getProfile(id){
  const query = await pool.query(`SELECT usuario, contraseña FROM aplicador WHERE id_aplicador = ${id}`)
  return query.rows
}

async function saveExp(id_sujeto, id_aplicador, nombre_config){
  try{
      await pool.query(`UPDATE participante SET expterminado = true WHERE id_participante = '${id_sujeto}'`)
  }
  catch(e){
      return [0,e.detail]
  }
  try{
    const ant = await pool.query('SELECT id_exp FROM experimento ORDER BY id_exp DESC LIMIT 1')
    if (ant.rows.length == 0){
      anterior = 0
      id_exp = 0
    }
    else{
      anterior = ant.rows[0].id_exp + 1
      id_exp = ant.rows[0].id_exp + 1
      
    }
  }
  catch(e){
    return[0,e.detail]
  }
  try{
    await pool.query('INSERT INTO experimento(id_exp, id_participante, id_aplicador, nombreconf, fecha) VALUES ($1, $2, $3, $4, NOW())', [anterior, id_sujeto, id_aplicador, nombre_config])
  }
  catch(e){
    return[0,e.detail]
  }
  return[1]
}

ipcMain.on("modal", async(event)=>{
     if (modalCont == 0){
       modalCont = 1
       mainWindow.webContents.send("nodal", modalCont)
       modalCont = 0
     }
})

ipcMain.on("reset", async (event)=>{
  mazoAG = []
  mazoAP = []
  mazoBG = []
  mazoBP = []
  mazoCG = []
  mazoCP = []
  mazoDG = []
  mazoDP = []
  mezcladoA = []
  mezcladoB = []
  mezcladoC = []
  mezcladoD = []
  bancoini = 0
  configFlag = 0
  tiempo = 0
  selecciones = 0
  id_sujeto = ""
  id_exp = 0
  nombre_sujeto = ""
  nombre_config = ""
  aprendi = []
})

ipcMain.on("cargarRes", async(event)=>{
  resumen = [mazoAG, mazoAP, mazoBG, mazoBP, mazoCG, mazoCP, mazoDG, mazoDP, bancoini, configFlag, tiempo, selecciones, id_sujeto, nombre_config, nombre_sujeto]
  mainWindow.webContents.send("cargarR", resumen)
})

ipcMain.on("guardarExp", async(event)=>{
    resp = await saveExp(id_sujeto, id_aplicador, nombre_config)
    mainWindow.webContents.send("sendResponse", resp)
})

//Funcion para calcular el intervalo entre los clicks
ipcMain.on("guardarTiempo", async (event, miliSeconds, voltearCarEnd, inter,tiempoIni, seleccion, ganancia, perdida, total, finR, rean)=>{
    click = miliSeconds
    await getTime(id_exp).then(result => anter = result);
    // anter = new Date(anterior)
    await getIte(id_exp).then(result => ite = result)
    if (anter == 0){
      console.log("ANTER")
      intervalo = click - tiempoIni
      inicio = tiempoIni
    }
    else if (ite == 1){
      intervalo = click - inicio
      inicio = tiempoIni
    }
    else{
      console.log("NO ANTER")
      console.log("CLICK-ANTER", click-anter)
      intervalo = (click - anter) - inter
      inicio = rean
    }
    setTime(id_exp, id_sujeto, ite, seleccion, ganancia, perdida, total, click, voltearCarEnd, intervalo, finR, inicio)
});
//Funcion para enviar los parametros de la configuracion selecccionada
ipcMain.on("enviarConfig", async(event, config)=>{
  if (config == "1"){
    configFlag="1"
    selecciones = 5
    mazoG = [100,150,200,100,75,125,90,130,150,200]
    mazoP = [50,25,100,50,75,200,10,0,25,100]
  }
  else if (config =="2"){
    configFlag="2"
    tiempo= 5000
    mazoG = [100,100,100,100,100,100,100,100,100,100]
    mazoP = [50,50,50,50,50,50,50,50,50,50]
  }
  mezclado = shuffle(mazoG,mazoP)
})

ipcMain.on("cargarIGT", async(event)=>{
  mainWindow.webContents.send("cargarC", configuracion)
  console.dir(configuracion[9], {'maxArrayLength': null})
  console.dir(configuracion[10], {'maxArrayLength': null})
  console.dir(configuracion[11], {'maxArrayLength': null})
  console.dir(configuracion[12], {'maxArrayLength': null})
})

//Funcion para cargar los nombres de configuraciones en el select
ipcMain.on("cargarNameSettings", async(event)=>{
  await getNameSet();
  mainWindow.webContents.send("cargarNS", nombres)
  
})

//Funcion para cargar los detalles de la configuracion seleccionada
ipcMain.on("loadSetting", async(event, opcion)=>{
  confi = await getSettings(opcion)
  mainWindow.webContents.send("cargarSetting", confi)
})

//Funcion para guardar la configuracion en la base de datos
ipcMain.on("saveSet", async(event, configuracion) =>{
  console.log("AAAAAAAAA", configuracion[13])
  resp = await saveSetDB(configuracion)
  mainWindow.webContents.send("sendResponse", resp)
})

ipcMain.on("saveSuj", async(event, datos) =>{
     resp = await saveSujDB(datos)
     console.log(resp)
     mainWindow.webContents.send("sendResponse", resp)
   })

ipcMain.on("sendSujeto", async(event, id)=>{
  suje = await sendSujeto(id)
})

ipcMain.on("getAnalisis", async(event)=>{
  analisis = await getAnalisis()
  mainWindow.webContents.send("cargarAnalisis", analisis)
})

ipcMain.on("getResultados", async(event, id)=>{
  resultado = await getResultados(id)
  mainWindow.webContents.send("cargarResultados", resultado)
})

ipcMain.on("getSujetos", async(event)=>{
  sujetos = await getSujetos()
  mainWindow.webContents.send("cargarSujetos", sujetos)
})
ipcMain.on("getSujetosPre", async(event)=>{
  sujetos = await getSujetosPre()
  mainWindow.webContents.send("cargarSujetos", sujetos)
})

//Funcion para actualizar datos
ipcMain.on("enviarDatosnuevos", async(event, datosnuevos)=>{
  idd = id[0].id_aplicador
  const query = await pool.query(`UPDATE aplicador SET usuario = '${datosnuevos[0]}', contraseña = '${datosnuevos[1]}' WHERE id_aplicador = ${idd}`);
  user = datosnuevos[0]
  password = datosnuevos[2]
})

//Funcion para enviar las credenciales al hacer el Login
ipcMain.on("enviarCredenciales", async(event, credenciales)=>{
  usuario = credenciales[0]
  contraseña = credenciales[1]
  user = usuario
  password = contraseña
  respuesta = await getLogin(user, password)
  mainWindow.webContents.send("loginCorrecto", respuesta)
})

ipcMain.on("confirmPass", async(event, pass)=>{
  if(pass == password){
    flag = true
    mainWindow.webContents.send("resultPass", flag)    
  }
  else{
    flag = false
    mainWindow.webContents.send("resultPass", flag)
  }
})

ipcMain.on("cargarPro", async(event)=>{
  resp = await getProfile(id[0].id_aplicador)
  mainWindow.webContents.send("getPro", resp)
})