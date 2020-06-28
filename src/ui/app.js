const personasForm = document.getElementById('forma');

const nombre = document.getElementById('name');
const edad = document.getElementById('age');
const carrera = document.getElementById('carreer');
const personasList = document.getElementById('personas');
const { remote, Notification } =  require('electron')
const main = remote.require('./main')
let personas = [];
let editado = false;
let id_persona = "";


personasForm.addEventListener('submit', async (e) => {
    
    if(nombre.value == "" || edad.value == "" || carrera.value == "")
    {
        alert("Debes llenar todos los datos");
    }
    else
    {
        e.preventDefault();
        const persona_ = {
            name:nombre.value,
            age:edad.value,
            car:carrera.value,
        };
        if(!editado)
        {
            const result = await main.crearPersona(persona_);
        }
        else{
            const productActualizado = await main.updatePersona(id_persona, persona_);
            console.log(productActualizado);
            //BORRAMOS VALORES
            id_persona = "";
            editado = false;
        }
        personasForm.reset();
        getPersona();
        nombre.focus();
    }
})


async function delete_persona(id){
    const response = confirm("Deseas eliminar este registro?");
    if(response)
    {
        const result = await main.delete_persona(id);
        console.log(result);
        await getPersona();
    }
    return;
}

async function update_persona(id)
{
    const person = await main.getElement(id);
    nombre.value = person.Nombre;
    edad.value = person.Edad;
    carrera.value = person.Carrera;
    editado = true;
    id_persona = person.Nombre;
}

function renderPersona(personas){
    personasList.innerHTML = "";
    personas.forEach(persona => {
        personasList.innerHTML += `
            <div class = "card card-body my-2 bg-light animated fadeInLeft">
                <h4 style="color:black">${persona.Nombre}</h4>
                <h3 style="color:black">${persona.Carrera}</h3>
                <p style="color:black">${persona.Edad}</p>
                <p>
                    <button class="btn btn-danger" onclick="delete_persona('${persona.Nombre}')">Eliminar</button>
                    <button class="btn btn-secondary" onclick="update_persona('${persona.Nombre}')">Editar</button>
                </p>
            </div>        
        `;
    })
}

const getPersona = async () => {
    personas = await main.getPersona();
    renderPersona(personas);
}
async function init(){
    await getPersona();
}

init();




