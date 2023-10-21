const numPokemon = 151;
const shinyProb = 100;
const xBound = 1500;
const yBound = 750;

var collectionSize;

var pokemonList = [];
var htmlCard = [];
var ownedPokemon = [];

let timerIds = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function startAnimation() {  
    console.log("startAnimationCalled");
    for(let i =0;i<=collectionSize;i++){
        let randX = getRandomInt(xBound);
        let randY = getRandomInt(yBound);
        if(timerIds[i] !== null){
            clearInterval(timerIds[i]);
        }
        timerIds[i] = setInterval(()=>{moveImg(randX, randY, i)},10);
    }
 }

function moveImg(x, y, id){
    console.log("moveImg called");

    let pokemonCollection = document.getElementById("collectionPokemon"+id);

    //determine x,and y of the image
    let imgX = parseInt(pokemonCollection.style.left);
    let imgY = parseInt(pokemonCollection.style.top);


    const centerX = Math.round(x - (pokemonCollection.width / 2));
    const centerY = Math.round(y - (pokemonCollection.height / 2));

    if (imgX === centerX && imgY === centerY){
         clearInterval(timerIds[id-1]);
         timerIds[id-1] = null;
    }
    // Move 1 pixel in both directions toward the click
    if (imgX < centerX) {
        imgX++;
    }
    else if (imgX > centerX) {
        imgX--;
    }
    if (imgY < centerY) {
        imgY++;
    }
    else if (imgY > centerY) {
        imgY--;
    }

    pokemonCollection.style.left = imgX + "px";
    pokemonCollection.style.top = imgY + "px";
        
}


function generateCollection(collection){
    console.log("generate collection called");
    ownedPokemon = JSON.parse(localStorage.getItem('pokemonList'));

    let yourCollection = document.getElementById("yourCollectionListParent");

    for(let i =0;i<collectionSize;i++){                         
        const moveId = "collectionPokemon"+ i;
        let collectionCard = document.createElement("div");
        collectionCard.innerHTML = `<div class="container">

        <img id=${moveId} src=${pokemonList[collection[i]-1].img} alt="heart" style="position:absolute;
            left:200px; top:200px; width:200px">
        </div>`  
        yourCollection.appendChild(collectionCard);
    }

}

async function animateForever(){
    while(1){
        startAnimation();
        await sleep(5000);
    }
}

//Populates an Img and Text for each pokemon
function generatePokemart(){
    ownedPokemon = JSON.parse(localStorage.getItem('pokemonList'));
    console.log(ownedPokemon);


    allPokemonCard = document.getElementById("pokemartListParent");

    for (let i = 0; i < pokemonList.length; i++) {
            
            let pokemonName = pokemonList[i].name;
            let pokemonId = pokemonList[i].id;
            let pokemonImg = pokemonList[i].img;
            let pokemonType1 = pokemonList[i].type1;
            let pokemonType2 = null;
            var typeString = `<strong>Type:</strong>  ${pokemonType1}`
            var buttonToBuy =  `<button id=buy_${pokemonId} onClick="reply_click(this.id, ${pokemonId})" type="button" class="btn btn-sm btn-primary">Buy</button>`

            if(!ownedPokemon.includes(pokemonId)) {
                //    buttonToBuy = ``;           
                //Blue Buy Button
            } else if(ownedPokemon.includes(pokemonId)) {
                console.log("Pokemon with id " + pokemonId + " already owned");
                buttonToBuy = `<button id=buy_${pokemonId} onClick="reply_click(this.id, ${pokemonId})" type="button" class="btn btn-sm btn-danger">Owned</button>`;           
                //Red Owned Button
            }
          

            if(pokemonList[i].type2 != null) {
               pokemonType2 = pokemonList[i].type2;
               typeString = `<strong>Type(s):</strong>  ${pokemonType1}, ${pokemonType2}`

            }



            
            //Decides if the pokemon is shiny or not
            let randNum = getRandomInt(shinyProb);
            let shiny = false;
            //Shiny
            if(randNum === 31){
                pokemonImg = pokemonList[i].imgShiny;
                shiny = true;
            }


            let pokeCard = document.createElement("div");

            pokeCard.innerHTML = `<div class="col">
            <div class="card shadow-sm">
                <div><img src=${pokemonImg} class="card-img-top" alt="..."></img></div>              
                <div class="card-body">
                    <p class="card-text"><p class="card-text"> 
                    <br><strong>Id:</strong> ${pokemonId} <strong>Name:</strong> ${pokemonName} 
                    <br>${typeString} </p></p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                   ${buttonToBuy}
                  </div>
                </div>
              </div>
            </div>
          </div>`


            allPokemonCard.appendChild(pokeCard);
        


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
async function main(){
    console.log("main called");

    for(let i=1;i<=numPokemon;i++){
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
        const data = await response.json();
        loadPokemon(data);
        
    } 

    if(window.location.href.endsWith("pokemart.html")){
        generatePokemart();
    }
    else if(window.location.href.endsWith("yourCollection.html")){
        console.log("on page yourCollection.html");

        ownedPokemon = JSON.parse(localStorage.getItem('pokemonList'));

        console.log(ownedPokemon);

        collectionSize = ownedPokemon.length;
        generateCollection(ownedPokemon);
     
        animateForever();
    }

}


/**
 * Buy Feature
*/

//Runs the program
main();

// if (document.addEventListener) {
//     document.addEventListener("click", handleClick, false);
// }
// else if (document.attachEvent) {
//     document.attachEvent("onclick", handleClick);
// }



function reply_click(button_id, pokemonNumber) {

    //Make sure there is a list
    if(localStorage.getItem('pokemonList') != undefined) {
        //Update Owned Pokemon to whatever is stored in the browser
        ownedPokemon = JSON.parse(localStorage.getItem('pokemonList'));
    }

    //Log the click for debugging purposes
    console.log("ReplyClick: " + pokemonNumber);

    //handle the click
    if(!ownedPokemon.includes(pokemonNumber)) {

        ownedPokemon.push(pokemonNumber);

        //Read the list then append your thing to it
        localStorage.setItem('pokemonList', JSON.stringify(ownedPokemon));



        console.log("JS list: " + ownedPokemon);
        console.log("Local Storage Pokemon List: "+localStorage.getItem('pokemonList'));
        

        document.getElementById(button_id).setAttribute("class", "btn btn-sm btn-danger");
        document.getElementById(button_id).innerHTML = "Owned";
        // button_id.innerHTML = "Owned";


        console.log(document.getElementById(button_id).getAttribute("value"));
        console.log(document.getElementById(button_id).getAttribute("style"));
        console.log(document.getElementById(button_id).getAttribute("value"));
        

        
    } else if(ownedPokemon.includes(pokemonNumber)) {
        console.log("Removing Pokemon with ID: " + pokemonNumber);
        document.getElementById(button_id).setAttribute("class", "btn btn-sm btn-primary");
        document.getElementById(button_id).innerHTML = "Buy";

        ownedPokemon.splice(ownedPokemon.indexOf(pokemonNumber));
        localStorage.setItem('pokemonList', JSON.stringify(ownedPokemon));
        console.log("Owned Pokemon: " + ownedPokemon);
        console.log("Local Storage: "+ localStorage.getItem('pokemonList'))
    }


}

function getButton() {
    console.log("HELLO THERE!!!!");
}
