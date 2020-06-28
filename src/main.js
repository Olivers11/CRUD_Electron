const {BrowserWindow} =  require('electron')
const {getConnection} = require('./database')

async function getPersona(){
    const conn = await getConnection();
    const results = await conn.query('select * from persona')
    return results;
}



async function crearPersona(persona){
    try {
        const conn = await getConnection();
        //var values = [[persona.name, persona.age, persona.car]];
        const result = await  conn.query('INSERT INTO persona set?', {
            Nombre:persona.name,
            Edad: persona.age,
            Carrera: persona.car
        });
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

let window

async function delete_persona(id){
    const conn = await getConnection();
    const result = await conn.query('delete from persona where Nombre = ?', id);
    console.log(result);
    return result[0];
}

async function updatePersona(id, persona){
    const conn = await getConnection();
    const result = await conn.query("update persona set Nombre= '"+persona.name+"', Edad='"+persona.age+"', Carrera = '"+persona.car+"' where Nombre = '"+id+"'");
    console.log(result);
    console.log(persona.age);
}

async function getElement(id){
    const conn = await getConnection();
    const result = await conn.query('select * from persona where Nombre = ?', id);
    return result[0];
}

function createWindow(){
    window =  new BrowserWindow({
        width: 800,
        height:600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    window.loadFile('src/ui/index.html');
}

module.exports = {
    createWindow,
    crearPersona,
    getPersona,
    delete_persona,
    getElement,
    updatePersona
}