// Api online
window.addEventListener('load', async ()=>{
    let consulta = await fetch('https://jsonplaceholder.typicode.com/users');
    let usuariosApi = await consulta.json();
    let usuarios = document.querySelector('body main .tab_usuarios .usuarios');
    usuariosApi.forEach(function(usuarioApi) {
        let usuarioNuevo = document.createElement("div");
        usuarioNuevo.classList.add("usuario");
        usuarioNuevo.innerHTML = `
                    <div class="perfil">
                        <img src="img/user.webp" alt="">
                        <p class="nombre_usuario">${usuarioApi.name}</p>
                        <p>${usuarioApi.username}</p>
                    </div>
                    <div class="datos">
                        <p>Email</p>
                        <p class="email_usuario">${usuarioApi.email}</p>
                    </div>
                    <div class="datos">
                        <p>Ciudad</p>
                        <p class="ciudad_usuario">${usuarioApi.address.city}</p>
                    </div>
                    <div class="datos">
                        <p>Telefono</p>
                        <p>${usuarioApi.phone}</p>
                    </div>
                    <div class="datos">
                        <p>Empresa</p>
                        <p>${usuarioApi.company.name}</p>
                    </div>
        `;
        usuarios.appendChild(usuarioNuevo);
    })
    //se cargaron los usuarios de la api

    //carga datos de api local
    fetch('/api/datos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Respuesta de coneccion no salio bien');
        }
        return response.json();
    })
    .then(usuariosApiLocal => {
        console.log('Datos recibidos:', usuariosApiLocal);
        usuariosApiLocal.forEach(function(usuarioApiLocal) {
            let usuarioNuevo = document.createElement("div");
            usuarioNuevo.classList.add("usuario");
            usuarioNuevo.innerHTML = `
                        <div class="perfil">
                            <img src="img/user.webp" alt="">
                            <p class="nombre_usuario">${usuarioApiLocal.name}</p>
                            <p>${usuarioApiLocal.username}</p>
                        </div>
                        <div class="datos">
                            <p>Email</p>
                            <p class="email_usuario">${usuarioApiLocal.email}</p>
                        </div>
                        <div class="datos">
                            <p>Ciudad</p>
                            <p class="ciudad_usuario">${usuarioApiLocal.address.city}</p>
                        </div>
                        <div class="datos">
                            <p>Telefono</p>
                            <p>${usuarioApiLocal.phone}</p>
                        </div>
                        <div class="datos">
                            <p>Empresa</p>
                            <p>${usuarioApiLocal.company.name}</p>
                        </div>
            `;
            usuarios.appendChild(usuarioNuevo);})
    })
    .catch(error => {
        console.error('Hubo un problema con la petición fetch:', error);
    });
})  




//guarda datos de nuevos usuarios
const formulario = document.querySelector('body main .tab_subir_usuario .formulario');
const nameInput = document.querySelector('#nameTxt');
const usernameInput = document.querySelector('#userNameTxt');
const emailInput = document.querySelector('#emailTxt');
const cityInput = document.querySelector('#cityTxt');
const telInput = document.querySelector('#telTxt');
const companyInput = document.querySelector('#companyTxt');
const usuariosAgregados = [];

formulario.addEventListener("submit", (event)=>{
    event.preventDefault();
    const usuario = {
        name: nameInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        address: {
            city: cityInput.value,
        },
        phone: telInput.value,
        company: {
            name: companyInput.value,
        }
    };

    fetch('/guardarDatos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos guardados:', data);
        let usuarios = document.querySelector('body main .tab_usuarios .usuarios');
        let usuarioNuevo = document.createElement("div");
            usuarioNuevo.classList.add("usuario");
            usuarioNuevo.innerHTML = `
                        <div class="perfil">
                            <img src="img/user.webp" alt="">
                            <p class="nombre_usuario">${nameInput.value}</p>
                            <p>${usernameInput.value}</p>
                        </div>
                        <div class="datos">
                            <p>Email</p>
                            <p class="email_usuario">${emailInput.value}</p>
                        </div>
                        <div class="datos">
                            <p>Ciudad</p>
                            <p class="ciudad_usuario">${cityInput.value}</p>
                        </div>
                        <div class="datos">
                            <p>Telefono</p>
                            <p>${telInput.value}</p>
                        </div>
                        <div class="datos">
                            <p>Empresa</p>
                            <p>${companyInput.value}</p>
                        </div>
            `;
            usuarios.appendChild(usuarioNuevo);
        alert('Datos guardados correctamente.');
    })
    .catch(error => {
        console.error('Error al guardar los datos:', error);
        alert('Hubo un error al intentar guardar los datos.');
    });
})


//filtro
const buscadorInput = document.querySelector('body main .tab_usuarios .buscador #buscador');
buscadorInput.addEventListener('keyup' , (event)=>{
    const filtro = document.querySelector('body main .tab_usuarios .buscador #filtro');
    const usuariosCaja = document.querySelectorAll('body main .tab_usuarios .usuarios .usuario');
    const usuariosCajaNombre = document.querySelectorAll('body main .tab_usuarios .usuarios .usuario .perfil .nombre_usuario');
    const usuariosCajaEmail = document.querySelectorAll('body main .tab_usuarios .usuarios .usuario .datos .email_usuario');
    const usuariosCajaCiudad = document.querySelectorAll('body main .tab_usuarios .usuarios .usuario .datos .ciudad_usuario');

    let textoIngresado = event.target.value;
    let expresionRegular = new RegExp(textoIngresado, "i");


    for(let i = 0; i<usuariosCaja.length; i++){
        let usuario = usuariosCaja[i];
        // let usuarioCaja = usuario;
        // console.log(usuario);
        console.log(filtro.value);
        switch (filtro.value) {
            case "nombre":
                console.log(usuario);
                if(expresionRegular.test(usuariosCajaNombre[i].innerText)){
                    usuario.classList.remove("ocultar");
                }else{
                    usuario.classList.add("ocultar");
                }
                break;
            case "email":
                if(expresionRegular.test(usuariosCajaEmail[i].innerText)){
                    usuario.classList.remove("ocultar");
                }else{
                    usuario.classList.add("ocultar");
                }
                break;
            case "ciudad":
                if(expresionRegular.test(usuariosCajaCiudad[i].innerText)){
                    usuario.classList.remove("ocultar");
                }else{
                    usuario.classList.add("ocultar");
                }
                break;
            
        }

    }
})

//cambio de pantalla
const verUsuarios = document.querySelector("body main .tab_usuarios");
const subirUsuario = document.querySelector("body main .tab_subir_usuario");

const buttonVerUsuarios = document.querySelector("body main .navegacion .ver_usuario");
const buttonSubirUsuario = document.querySelector("body main .navegacion .subir_usuario");

buttonVerUsuarios.addEventListener("click", ()=>{
    verUsuarios.classList.remove("ocultar");
    subirUsuario.classList.add("ocultar");
})


buttonSubirUsuario.addEventListener("click", ()=>{
    verUsuarios.classList.add("ocultar");
    subirUsuario.classList.remove("ocultar");
})