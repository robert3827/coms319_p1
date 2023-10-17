const numPokemon = 9;
const shinyProb = 100;


var pokemonList = [];
var htmlCard = [];
var ownedPokemon = [];




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//Populates an Img and Text for each pokemon
function generatePokemart() {
    console.log(pokemonList);
    allPokemonCard = document.getElementById("pokemartListParent");

    for (let i = 0; i < pokemonList.length; i++) {

        if (pokemonList[i].type2 != null) {
            let pokemonName = pokemonList[i].name;
            let pokemonId = pokemonList[i].id;
            let pokemonType1 = pokemonList[i].type1;
            let pokemonType2 = pokemonList[i].type2;
            let pokemonImg = pokemonList[i].img;
            //Decides if the pokemon is shiny or not
            let randNum = getRandomInt(shinyProb);
            let shiny = false;
            //Shiny
            if (randNum === 1) {
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
                    <button id=buy_${pokemonId} onClick="reply_click(this.id, ${pokemonId})" type="button" class="btn btn-sm btn-primary">Buy</button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>`


            allPokemonCard.appendChild(pokeCard);



        }
        else {
            let pokemonName = pokemonList[i].name;
            let pokemonId = pokemonList[i].id;
            let pokemonType1 = pokemonList[i].type1;
            let pokemonImg = pokemonList[i].img;
            //Decides if the pokemon is shiny or not
            let randNum = getRandomInt(shinyProb);
            let shiny = false;
            //Shiny
            if (randNum === 1) {
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
                    <button id=buy_${pokemonId} onClick="reply_click(this.id, ${pokemonId})" type="button" class="btn btn-sm btn-primary">Buy</button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>`
            allPokemonCard.appendChild(pokeCard);



        }


    }



}


//Loads pokemon information into pokemonList[]
function loadPokemon(poke) {
    var pokemonName = poke.name;
    var pokemonImg = poke.sprites.front_default;
    var pokemonImgShiny = poke.sprites.front_shiny;
    var pokemonId = poke.id;

    var pokemonTypeJson = poke.types;
    var pokemonType1 = pokemonTypeJson[0].type.name;

    if (pokemonTypeJson.length > 1) {
        var pokemonType2 = pokemonTypeJson[1].type.name;

        const pokemon = {
            id: pokemonId,
            name: pokemonName,
            img: pokemonImg,
            imgShiny: pokemonImgShiny,
            type1: pokemonType1,
            type2: pokemonType2
        };
        pokemonList[`${pokemonId}` - 1] = pokemon;

    }
    else {
        const pokemon = {
            id: pokemonId,
            name: pokemonName,
            img: pokemonImg,
            imgShiny: pokemonImgShiny,
            type1: pokemonType1,
            type2: null
        };
        pokemonList[`${pokemonId}` - 1] = pokemon;

    }

}


//Fetches pokemon id, name and img
async function main() {
    console.log("running main");
    for (let i = 1; i <= numPokemon; i++) {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
        const data = await response.json();
        loadPokemon(data);
        console.log("fetched a pokemon from POKEAPI");
    }
    console.log("fetched all pokemon from API")
    generatePokemart();
    console.log("generated pokemart")

}


/**
 * Buy Feature
*/

//Runs the program
main();

if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}



function reply_click(button_id, pokemonNumber) {
    console.log("ReplyClick " + pokemonNumber);

    if(!ownedPokemon.includes(pokemonNumber)) {
        ownedPokemon.push(pokemonNumber);
        ownedPokemon
        console.log(ownedPokemon);
        document.getElementById(button_id).setAttribute("value", "Owned");
        document.getElementById(button_id).setAttribute("content", "Owned");
        document.getElementById(button_id).setAttribute("style", "background-color:red");
        document.getElementById(button_id).innerHTML = "Owned";
        // button_id.innerHTML = "Owned";


        console.log(document.getElementById(button_id).getAttribute("value"));
        console.log(document.getElementById(button_id).getAttribute("style"));
        console.log(document.getElementById(button_id).getAttribute("value"));
        

        
    }


}

function myFunction() {
    console.log("SOlved all problems!");
}