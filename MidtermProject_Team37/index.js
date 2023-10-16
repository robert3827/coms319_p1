const numPokemon = 9;
const shinyProb = 100;


var pokemonList =[];


var htmlCard = [];


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateCarousel(){
    carousel1 = document.getElementById("bulbasaurPicture");
    carousel2 = document.getElementById("squirtlePicture");
    carousel3 = document.getElementById("charmanderPicture");

    let car1 = document.createElement("div");
    let car2 = document.createElement("div");
    let car3 = document.createElement("div");

    let bulbasaurImg = pokemonList[0].img;
    let charmanderImg = pokemonList[3].img;
    let squirtleImg = pokemonList[6].img;

    car1.innerHTML = `<img src="${bulbasaurImg}" class="bd-placeholder-img" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" /></svg>`
    car2.innerHTML = `<img src="${charmanderImg}" class="bd-placeholder-img" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" /></svg>`
    car3.innerHTML = `<img src="${squirtleImg}" class="bd-placeholder-img" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" /></svg>`

    carousel1.appendChild(car1);
    carousel2.appendChild(car2);
    carousel3.appendChild(car3);


}

//Populates an Img and Text for each pokemon
function generatePokemart(){
    allPokemonCard = document.getElementById("pokemartListParent");

    for(let i = 0; i<pokemonList.length;i++){

        if(pokemonList[i].type2 != null){
            let pokemonName = pokemonList[i].name;
            let pokemonId = pokemonList[i].id;
            let pokemonType1 = pokemonList[i].type1;
            let pokemonType2 = pokemonList[i].type2;
            let pokemonImg = pokemonList[i].img;
            //Decides if the pokemon is shiny or not
            let randNum = getRandomInt(shinyProb);
            let shiny = false;
            //Shiny
            if(randNum === 1){
                pokemonImg = pokemonList[i].imgShiny;
                shiny = true;
            }


            let pokeCard = document.createElement("div");

            pokeCard.innerHTML = `<div class="col">
            <div class="card shadow-sm">
                <div><img src=${pokemonImg} class="card-img-top" alt="..."></img></div>              
                <div class="card-body">
                    <p class="card-text"><p class="card-text"> <strong>Id:</strong> ${pokemonId} <strong>Name:</strong> ${pokemonName} <strong>Types:</strong> ${pokemonType1}, ${pokemonType2}</p></p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-primary">Buy</button>
                  </div>
                  <small class="text-body-secondary">9 mins</small>
                </div>
              </div>
            </div>
          </div>`


            allPokemonCard.appendChild(pokeCard);



        }
        else{
            let pokemonName = pokemonList[i].name;
            let pokemonId = pokemonList[i].id;
            let pokemonType1 = pokemonList[i].type1;
            let pokemonImg = pokemonList[i].img;
            //Decides if the pokemon is shiny or not
            let randNum = getRandomInt(shinyProb);
            let shiny = false;
            //Shiny
            if(randNum === 1){
                pokemonImg = pokemonList[i].imgShiny;
                shiny = true;
            }


            let pokeCard = document.createElement("div");

            pokeCard.innerHTML = `<div class="col">
            <div class="card shadow-sm">
                <div><img src=${pokemonImg} class="card-img-top" alt="..."></img></div>              
                <div class="card-body">
                    <p class="card-text"><p class="card-text"> <strong>Id:</strong> ${pokemonId} <strong>Name:</strong> ${pokemonName} <strong>Types:</strong> ${pokemonType1}</p></p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-primary">Buy</button>
                  </div>
                  <small class="text-body-secondary">9 mins</small>
                </div>
              </div>
            </div>
          </div>`
            allPokemonCard.appendChild(pokeCard);



        }


    }
    
}


//Loads pokemon information into pokemonList[]
function loadPokemon(poke){
    var pokemonName = poke.name;
    var pokemonImg = poke.sprites.front_default;
    var pokemonImgShiny = poke.sprites.front_shiny;
    var pokemonId = poke.id;

    var pokemonTypeJson = poke.types;
    var pokemonType1 = pokemonTypeJson[0].type.name;

    if(pokemonTypeJson.length > 1){
        var pokemonType2 = pokemonTypeJson[1].type.name;

        const pokemon = {
            id : pokemonId,
            name : pokemonName,
            img : pokemonImg,
            imgShiny : pokemonImgShiny,
            type1 : pokemonType1,
            type2 : pokemonType2
        };
        pokemonList[`${pokemonId}` - 1] = pokemon;

    }
    else{
        const pokemon = {
            id : pokemonId,
            name : pokemonName,
            img : pokemonImg,
            imgShiny : pokemonImgShiny,
            type1 : pokemonType1,
            type2 : null
        };
        pokemonList[`${pokemonId}` - 1] = pokemon;

    }

}


//Fetches pokemon id, name and img
async function main(){

    for(let i=1;i<=numPokemon;i++){
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
        const data = await response.json();
        loadPokemon(data);
        
    } 

    generatePokemart();
    generateCarousel();

}

//Runs the program
main(); 
