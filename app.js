let numeroSecreto = 0;
let count_intentos = 0;
let palabra_intentos = 'intento';
let lista_numeros_sorteados = [];
let numero_maximo = 10;

function asignar_texto_elemento(elemento, texto){
    //innerHTML sirve para cambiar el contenido de un elemento HTML
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificar_intento(){ //
    let numero_ingresado = parseInt(document.getElementById('input_numero_ingresado').value); //se hace el parse a int para que el valor ingresado sea un numero
    console.log('Numero ingresado por el usuario: '+numero_ingresado);
    count_intentos++;
    if(numero_ingresado === numeroSecreto){ // === para comparar valor y tipo de dato, == solo compara valor
        asignar_texto_elemento('p', `Acertase el número secreto en ${count_intentos} ${count_intentos === 1 ? 'intento' : 'intentos'} !!!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else if(numero_ingresado > numeroSecreto){
        asignar_texto_elemento('p', 'El numero secreto es menor al que ingresaste');
        limpiar_input();
    }
    else if(numero_ingresado < numeroSecreto){
        asignar_texto_elemento('p', 'El numero secreto es mayor al que ingresaste');
        limpiar_input();
    }

    console.log('Intentos: '+count_intentos);
    return;
}

function limpiar_input(){
    document.getElementById('input_numero_ingresado').value = '';
    return;
}

function generar_numero_Secreto(){ //numero aleatorio entre 1 y numero_maximo
    let numero_generado = Math.floor(Math.random() * numero_maximo) + 1; //+1 para que el numero sea entre 1 y 10
    //si el numero generado ya fue sorteado, se vuelve a generar, hasta que sea un numero no repetido
    console.log('Numero generado: '+numero_generado);
    console.log(lista_numeros_sorteados);
    
    //si ya se sortearon todos los numeros
    if(lista_numeros_sorteados.length === numero_maximo){
        asignar_texto_elemento('p','Se sortearon todos los numeros, reinicia el juego para volver a jugar');
    }
    else{
        if(lista_numeros_sorteados.includes(numero_generado)){ //includes devuelve true si el elemento esta en el array 
            return generar_numero_Secreto(); //se vuelve a llamar a la funcion 
        } else{
            lista_numeros_sorteados.push(numero_generado);
            return numero_generado;
        }
    }
}

function condiciones_iniciales(){
    asignar_texto_elemento('h1', 'Juego del numero secreto');
    asignar_texto_elemento('p', `Intenta adivinar el numero del 1 al ${numero_maximo}`);
    numeroSecreto = generar_numero_Secreto();
    count_intentos = 0;
    //console.log('Numero secreto: '+numeroSecreto);    
}

function reiniciar_juego(){ 
    //limpiar el input
    limpiar_input();
    //indicar al usuario que el juego se reinicio
    condiciones_iniciales();
    //desabilitar el boton de reiniciar
    document.querySelector('#reiniciar').setAttribute('disabled', true); //se usa querySelector para seleccionar el boton con id reiniciar y se le agrega el atributo disabled, con getElementbyId no se puede agregar atributos
}

condiciones_iniciales();
