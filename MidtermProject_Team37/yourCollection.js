
const numPokemon = 151;
const xBound = 1500;
const yBound = 750;

var collectionSize;
var pokemonList = [];


//This is used for bouncing animation
let timerIds = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}
function startAnimation() {  
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
async function animateForever(){
    while(1){
        startAnimation();
        await sleep(5000);
    }
}

async function main(){

   for(let i=1;i<=numPokemon;i++){
       const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
       const data = await response.json();
       loadPokemon(data);
       
   } 

//    let test = [1,2,3,4,5,6,7,8,9];
   collectionSize = ownedPokemon.length;
   generateCollection(ownedPokemon);

   animateForever();

}

//Runs the program
main(); 

