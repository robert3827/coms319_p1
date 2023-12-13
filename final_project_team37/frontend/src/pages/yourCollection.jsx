import Menubar from "../components/menubar";
import Container from "react-bootstrap/Container";
import GrassBg from "../images/grassBg.png";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn} from "../components/userInfo"


function YourCollection() {

    const url = `http://localhost:8081/`

    var [collectionPokemon, setCollectionPokemon] = useState([]);

    const myStyle = {
        backgroundImage: `url(${GrassBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // width: 1400,
        // height: 600
    };

    const xBound = 1500;
    const yBound = 750;
    let timerIds = [];


    useEffect(() => { //Called on first render
        if(retrieveUsername() == null || retrieveUsername() == ""){
            console.log("not signed in");
            return;
        }
        console.log("signed in")
        getCollection();

    }, []);

    function startCollectionMovement(){
        generateImages();
        // animateForever();
    }

    async function getCollection(){

        await fetch(url+"users/"+retrieveUsername())
            .then((response) => response.json())
            .then((data) => {
                setCollectionPokemon(data.collection);
            });
    }

    function generateImages(){
    
        let yourCollection = document.getElementById("yourCollectionListParent");
    
        console.log(collectionPokemon.length);
        for(let i =0;i<collectionPokemon.length;i++){                         
            const moveId = "collectionPokemon"+ i;
            let collectionCard = document.createElement("div");
            collectionCard.innerHTML = `<div class="container">
    
            <img id=${moveId} src=${collectionPokemon[i].img} alt="heart" style="position:absolute;
                left:200px; top:200px; width:200px">
            </div>`  
            yourCollection.appendChild(collectionCard);
            console.log(yourCollection);
        }
    
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    function startAnimation() {  
        console.log("startAnimationCalled");
        for(let i =0;i<=collectionPokemon.length;i++){
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
    
        let pokemonImage = document.getElementById("collectionPokemon"+id);
    
        //determine x,and y of the image
        let imgX = parseInt(pokemonImage.style.left);
        let imgY = parseInt(pokemonImage.style.top);
    
    
        const centerX = Math.round(x - (pokemonImage.width / 2));
        const centerY = Math.round(y - (pokemonImage.height / 2));
    
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
    
        pokemonImage.style.left = imgX + "px";
        pokemonImage.style.top = imgY + "px";
            
    }
    async function animateForever(){
        // while(1){
        //     startAnimation();
        //     await sleep(5000);
        // }
        for(let i =0; i<10;i++){
            startAnimation();
            await sleep(5000);
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function generateImages2(){

        return (
            collectionPokemon.map((pokemon) =>(
                <Col key={pokemon.id}>
                    <Card.Img variant="top" src={pokemon.img} style={{ height: '200px', objectFit: 'contain' }}/>
                </Col>
                // <Image src={pokemon.img} fluid></Image>
            ))
        )
    }
    

    return (
        <>
            

            <Container id ="yourCollectionListParent" fluid style={myStyle}>
                {generateImages2()}

                {/* <section class="py-5 text-center container banner">
                    <div class="row py-lg-5">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <h1 class="fw-light">Your Collection</h1>
                            
                        </div>
                    </div>
                </section>

                <div id="yourCollectionListParent">

                </div>
                {
                    startCollectionMovement()
                } */}
            </Container>

        </>
    );
} export default YourCollection;