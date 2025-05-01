//DESARROLLA AQUI TUS SOLUCIONES
// ### --------------------------------------  Ejercicios Pokémon --------------------------------------###
// Utilizando la api de Pokemon https://pokeapi.co/ y usando sólo async/await:
// **Antes de empezar, lee la documentación de la API para comprender como funcionan los endpoints**
// Ejercicio 1.- Declara una función **getRandomPokemon** que retorne un pokemon aleatorio.
async function getRandomPokemon() {
    try
    {
        //Sacamos el total de pokemon que hay
        const response1  = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        const dataPokemon = await response1.json();
        const total = dataPokemon.count;

        // Con el num aleatorio buscamos un pokemon
        const randomIdPokemon = Math.floor(Math.random()* total) + 1;
        const response2  = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomIdPokemon}`);
        const dataPokemon2 = await response2.json();
       
        return dataPokemon2;
    }
    catch (error) {
        throw new Error("ha habido un error", error);
    }
   
}

getRandomPokemon().then(name => {
    console.log("Pokémon aleatorio:", name);
});

// Ejercicio 2.- Declara una funcion **getImageAndName** que retorne el nombre y la URL de la imagen de un 
// pokemon => (return {img, name})
async function getImageAndName (name = "pikachu"){
    try 
    {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        return {
            img: data.sprites.front_default,
            name: data.name,
        };
    } catch (error) {
        throw new Error("ha habido un error", error);
    }
}

getImageAndName("bulbasaur").then(console.log);

// Ejercicio 3.- Declara una funcion **printImageAndName** que retorne el string necesario para
//  pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:
// ```html
// <section>
//     <img src="url de imagen" alt="nombre del pokemon">
//     <h1>Nombre del pokemon</h1>
// </section>
// ```
const printImageAndName = async () => {
    try {
      
        const { img, name } = await getImageAndName();
      
      return `
            <section>
                <img src="${img}" alt="${name}">
                <h1>${name}</h1>
            </section>
            `.trim();

    } catch (error) {
      throw new Error("ha habido un error", error);
    }
  };


//### -------------------------------------- Ejercicios Batalla entre Pokemon y perritos ---------------------------------- ###
// **Recordatorio, la API de perritos era 'https://dog.ceo/dog-api/'**
// Ejercicio 4.- Declara una función **getRandomDogImage** que retorne la url de la imagen de un perro aleatorio
async function getRandomDogImage() {
    try
    {
        const res = await fetch("https://dog.ceo/api/breeds/image/random"); 
        const data = await res.json();
        return data.message;
    }
    catch (error) {
        throw new Error("ha habido un error", error);
    }
}

// Ejercicio 5.- Declara una función **getRandomPokemonImage** que retorne la url de la imagen de un pokemon 
// aleatorio.
async function getRandomPokemonImage() {
    try
    {
         //Sacamos el total de pokemon que hay
         const response1  = await fetch(`https://pokeapi.co/api/v2/pokemon`);
         const dataPokemon = await response1.json();
         const total = dataPokemon.count;
 
         // Con el num aleatorio buscamos un pokemon
         const randomIdPokemon = Math.floor(Math.random()* total) + 1;
         const response2  = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomIdPokemon}`);
         const dataPokemon2 = await response2.json();
        
         return dataPokemon2.sprites.front_default;
    }
    catch (error) {
        throw new Error("ha habido un error", error);
    }  
}

// Ejercicio 6.- Declara una función **printPugVsPikachu** que pinte la batalla entre "Pug" y 
// "Pikachu" (no se testea)


// ### -------------------------------------- Ejercicios con Rick and Morty ------------------------------------- ###
// Usando la api de Rick and Morty https://rickandmortyapi.com/ y sólo async/await:
// Ejercicio 7.- Declara una función **getRandomCharacter** que retorne un personaje aleatorio.
async function getRandomCharacter() {
    try {
        // Hacemos el fetch a la API de Rick and Morty para obtener la lista de personajes
        const response1 = await fetch(`https://rickandmortyapi.com/api/character`);
        const data1 = await response1.json();
        const total = data1.info.count;  // 'info' contiene el total de personajes

        // Generamos un ID aleatorio para obtener un personaje
        const randomId = Math.floor(Math.random() * total) + 1;

        // Hacemos el fetch para obtener los detalles de ese personaje
        const response2 = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
        const data2 = await response2.json();
        
        return data2;
    } catch (error) {
        throw new Error("Ha ocurrido un error al obtener un personaje: " + error.message);
    }
}

// Ejercicio 8.- Declara una función **getRandomCharacterInfo** que retorne de un personaje su imagen, nombre, 
// episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, 
// tendrás que hacer otro fetch para llegar a los ultimos datos. Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})
async function getRandomCharacterInfo() {
    try {
      
        const character = await getRandomCharacter();
  
      const episodeUrls = character.episode;
      const firstEpisodeUrl = episodeUrls[0];
  
      const firstEpRes = await fetch(firstEpisodeUrl);
      const firstEpData = await firstEpRes.json();
  
      return {
        img: character.image,
        name: character.name,
        episodes: episodeUrls,
        firstEpisode: firstEpData.name,
        dateEpisode: firstEpData.air_date,
      };

    } catch (error) {
      throw new Error("ha habido un error", error);
    }
}

// Ejercicio 9.- Pinta los anteriores datos en el DOM (no se testea) 