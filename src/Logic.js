class Logic{

    //      Atributos:
    // Arreglo de las moleculas
    moleculas = [];
    // Contador de puntos
    puntos = 0;
    // Contador de index de pregunta
    cont = 0;
    // Encabezado de pregunta
    pregunta = "";
    // Respuesta a la pregunta
    respuesta = "";
    // Se define un arreglo segun la cantidad de atomos que requiere la molecula
    cantAtomosActual = [];
    // Se define un arreglo segun la cantidad de atomos que requiere la molecula y cuantos son
    cantAtomosTotales = [];
    // Se define un arreglo segun la nomenclatura del atomos que requiere la molecula
    nombreMoleculaTotales = [];

    cantAtomos = 0;

    constructor(){
        // Llenado de arreglo
        this.moleculas.push("H>2|O>1-Agua");
        this.moleculas.push("C>1|H>4-Metano");
        this.moleculas.push("C>4|H>10-Butano");
        this.moleculas.push("Na>1|Cl>1-Cloruro de sodio");
        this.moleculas.push("Si>1|O>2-Silice");
        // Se mezcla el arreglo
        this._shuffle();

        // Se llama al iniciador
        this._init();
    }

    // Metodo de obtener la pregunta
    get pregunta(){
        return this.pregunta;
    }

    // Metodo de mezclado del arreglo ( el '_' significa: metodo privado)
    _shuffle(){
        // Se crea un auxiliar y un temporal
        var aux, temp;
        
        // Se crea un for i va a disminuir y aux obtendra un numero aleatorio
        for(var i = this.moleculas.length - 1; i >= 0; i--, aux = Math.floor(Math.random() * (i + 1))){
            // Se guarda el auxiliar
            temp = this.moleculas[i];
            // Se reemplaza la posicion
            this.moleculas[i] = this.moleculas[aux];
            // Se reemplaza el auxiliar guardado
            this.moleculas[aux] = temp;
        }
    }

    // Metodo inicial de configuracion de juego
    _init(){
        // Se obtiene un arreglo donde la posicion 1 es la molecula y la 2 es el nombre del compuesto
        var linea = this.moleculas[this.cont].split("-");

        // Se dan los valores
        this.respuesta = linea[0];
        this.pregunta = linea[1];

        // Se obtiene la cantidad de atomos de la molecula
        var atomos = this.respuesta.split("|");

        // Se crea una variable donde se almacenaran los datos de la molecula como String
        var nomenclatura;

        this.cantAtomos = atomos.length;

        this.cantAtomosActual = [];
        this.cantAtomosTotales = [];
        this.nombreMoleculaTotales = [];

        // Se recorren los atomos 
        for(var i = 0; i < this.cantAtomos; i++){
            // Se inicializa el arreglo de cant de atomos por cada atomo
            this.cantAtomosActual.push(0);
            // Se alamacenan los datos de la molecula
            nomenclatura = atomos[i].split(">");

            // Se inserta la cantidad de atomos correcta en otro arreglo
            this.cantAtomosTotales.push(nomenclatura[1]);
            // Se inserta el nombre del atomos correcta en otro arreglo
            this.nombreMoleculaTotales.push(nomenclatura[0]);
        }
        console.log(this.pregunta);
        // Aumenta el index del arreglo de preguntas
        this.cont++;
    }

    // Metodo para confirmar que la molecua esta corrcta
    _valoracion(){
        // Se crea un contador que se incrementara segun la cantidad de atomos y sus valores correctos
        var cont = 0;

        // Se recorre toda la molecula
        for(var i = 0; i < this.cantAtomos; i++)
            // Si el atomo correcponde y tiene el mismo valor
            if(this.cantAtomosActual[i] == this.cantAtomosTotales[i])
                // Contador aumenta en 1
                cont++;

        // Si el contador es igual a la cantidad de atomos
        if(cont == this.cantAtomos)
            return true;
        else
            return false;
    }

    _cambioColor(color){
        if(color == 0xAA88B2)
            return 'H';
        else if(color == 0x88A2B2)
            return 'O';
        else if(color == 0x7EDC88)
            return 'S';
        else if(color == 0xDC827E)
            return 'C';
        else if(color == 0xF4FA58)
            return 'Cl';
        else if(color == 0xDA33FF)
            return 'Si';
    }

    game(color){
        var atomo = this._cambioColor(color);

        console.log(atomo);
        // Variable de Index
        var i = 0;

        // Se recorren los atomos
        for(i = 0; i < this.cantAtomos; i++)
            // Si el atomo enviado esta en la molecula
            if(atomo == this.nombreMoleculaTotales[i])
                // Si el valor de este atomo es menor al necesario
                if(this.cantAtomosActual[i] < this.cantAtomosTotales[i]){
                    // el valor del atomo aumenta en 1
                    this.cantAtomosActual[i]++;
                    // Se llama a la valoracion para verificar si se completo la molecula
                    if(this._valoracion()){
                        // Vuelvo a llamar a la configuracion
                        this._init();
                        console.log("true: PARTICULA COMPLETA");
                        return "true: PARTICULA COMPLETA";
                    }
                    // Si la cantidad de atomos es igual a la necesaria
                    if(this.cantAtomosActual[i] == this.cantAtomosTotales[i]){
                        console.log("true: Se lleno el atomo ");
                        return "true: Se lleno el atomo " + atomo;
                    } else{ 
                        console.log("true: Se sumo 1 al atomo ");
                        return "true: Se sumo 1 al atomo " + atomo;
                    }
                // Si la cantidad de atomos es igual a la necesaria antes de realizar el aumento en 1
                } else if(this.cantAtomosActual[i] == this.cantAtomosTotales[i]){
                    console.log("false: Esta molecula ya esta llena");
                    return "false: Esta molecula ya esta llena";
                }
                
        // Si i es 0 quiere decir que no se encontro el atomo en la molecula
        if(i != 0){
            console.log("false: No se encontro el atomo");
            return "false: No se encontro el atomo";
        }
    }

}