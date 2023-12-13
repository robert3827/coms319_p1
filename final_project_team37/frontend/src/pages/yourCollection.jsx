import Menubar from "../components/menubar";
import Container from "react-bootstrap/Container";
import GrassBg from "../images/grassBg.png";
import {retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn} from "../components/userInfo"


function YourCollection() {

    const url = `http://localhost:8081/`

    const myStyle = {
        backgroundImage: `url(${GrassBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // width: 1400,
        // height: 600
    };
    const xBound = 1500;
    const yBound = 750;
    var collectionSize;
    var collectionPokemon;

    function getCollection(){
        if(retrieveUsername() == null || retrieveUsername() == ""){
            console.log("not signed in");
            return;
        }

        fetch(url+"users/"+retrieveUsername())
            .then((response) => response.json())
            .then((data) => {
                collectionPokemon = data.collection;
                collectionSize = collectionPokemon.length;
            });
    }

    // function getRandomInt(max) {
    //     return Math.floor(Math.random() * max);
    // }
    
    // function startAnimation() {  
    //     console.log("startAnimationCalled");
    //     for(let i =0;i<=collectionSize;i++){
    //         let randX = getRandomInt(xBound);
    //         let randY = getRandomInt(yBound);
    //         if(timerIds[i] !== null){
    //             clearInterval(timerIds[i]);
    //         }
    //         timerIds[i] = setInterval(()=>{moveImg(randX, randY, i)},10);
    //     }
    //  }
    
    // function moveImg(x, y, id){
    //     console.log("moveImg called");
    
    //     let pokemonCollection = document.getElementById("collectionPokemon"+id);
    
    //     //determine x,and y of the image
    //     let imgX = parseInt(pokemonCollection.style.left);
    //     let imgY = parseInt(pokemonCollection.style.top);
    
    
    //     const centerX = Math.round(x - (pokemonCollection.width / 2));
    //     const centerY = Math.round(y - (pokemonCollection.height / 2));
    
    //     if (imgX === centerX && imgY === centerY){
    //          clearInterval(timerIds[id-1]);
    //          timerIds[id-1] = null;
    //     }
    //     // Move 1 pixel in both directions toward the click
    //     if (imgX < centerX) {
    //         imgX++;
    //     }
    //     else if (imgX > centerX) {
    //         imgX--;
    //     }
    //     if (imgY < centerY) {
    //         imgY++;
    //     }
    //     else if (imgY > centerY) {
    //         imgY--;
    //     }
    
    //     pokemonCollection.style.left = imgX + "px";
    //     pokemonCollection.style.top = imgY + "px";
            
    // }
    // async function animateForever(){
    //     while(1){
    //         startAnimation();
    //         await sleep(5000);
    //     }
    // }

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    

    return (
        <>
            

            <Container fluid style={myStyle}>

                <section class="py-5 text-center container banner">
                    <div class="row py-lg-5">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <h1 class="fw-light">Your Collection</h1>
                            
                        </div>
                    </div>
                </section>

                <div id="yourCollectionListParent">

                </div>
                {
                    getCollection()
                }
            </Container>

        </>
    );
} export default YourCollection;