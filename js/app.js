const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    // validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorio');

        return;
    }
    
    // Consultaremos la api
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        // crear una alerta
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    // eliminar la alerta mediante un timeOut
    setTimeout(() => {
        alerta.remove();
    }, 2000);
    }

}

function consultarAPI(ciudad, pais) {
    const appId = '94dc5b73fd7b8fa29b41d61c4edccb5f';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner(); // muestra un spinner de carga

    fetch(url)
        .then(resultado => resultado.json())
        .then(datos => {
            // limpiar el html previo
            limpiar();
            if(datos.cod === "404") {
                

                mostrarError('Ciudad no encontrada');

                return;
            }

            // Imprime la respuesta en el HTML
            mostrarClima(datos);

        })



}

function ktoc(grados) {
    return parseInt(grados - 273.15);

}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;
    const centigrados = ktoc(temp);
    const Max = ktoc(temp_max);
    const Min = ktoc(temp_min);

    const max = document.createElement('p');
    max.innerHTML = `Max: ${Max} &#8451;`;
    max.classList.add('text-xl');

    const min = document.createElement('p');
    min.innerHTML = `Min: ${Min} &#8451;`;
    min.classList.add('text-xl');

    const ciudadName = document.createElement('h1');
    ciudadName.classList.add('text-6xl', 'font-bold')
    ciudadName.innerHTML = `${name}`;
    
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    
    resultadoDiv.appendChild(ciudadName);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(min);
    
    resultado.appendChild(resultadoDiv);    
}

function limpiar() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
    limpiar();

    const div = document.createElement('div');
    div.classList.add('sk-fading-circle');

    div.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>`;

    resultado.appendChild(div);

}