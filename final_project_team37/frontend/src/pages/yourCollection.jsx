import Menubar from "../components/menubar";
import Container from "react-bootstrap/Container";
import GrassBg from "../images/grassBg.png";
import BlankPokedex from "../images/blankPokedex.png"
import { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import {retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn} from "../components/userInfo"
import { Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";



function YourCollection(props) {

    const url = `http://localhost:8081/`;
    const navigate = useNavigate();


    var [collectionPokemon, setCollectionPokemon] = useState([]);
    var [signedIn, setSignedIn] = useState();
    var [haveCollection, setHaveCollection] = useState();

    const myStyle = {
        backgroundImage: `url(${BlankPokedex})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // width: 1400,
        // height: 600
    };



    useEffect(() => { //Called on first render
        if(props.userName == null || props.userName == ""){
            console.log("not signed in");
            setSignedIn(false);
            return;
        }
        setSignedIn(true);
        console.log("signed in")
        getCollection();
        // console.log(collectionPokemon.length);
        // if(collectionPokemon.length > 0){
        //     setHaveCollection(true);
        // }
        // else{
        //     setHaveCollection(false);
        // }

    }, []);

    async function getCollection(){

        await fetch(url+"users/"+props.userName)
            .then((response) => response.json())
            .then((data) => {
                setCollectionPokemon(data.collection);
                if(data.collection.length >0){
                    setHaveCollection(true);
                }
                else{
                    setHaveCollection(false);
                }
            });
    }


    function handleSignInClick() {
        // console.log("got into signinclick");
        navigate("/signIn");
    }
    
    function handlePokemartClick(){
        navigate("/pokemart");
    }

    function generateImages(){

        return (
            collectionPokemon.map((pokemon) =>(
                // <Col key={pokemon.id}>
                //     <Card.Img variant="top" src={pokemon.img} style={{ height: '200px', objectFit: 'contain' }}/>
                // </Col>
                <Image src={pokemon.img} fluid style={{ height: '115px', width: '93px', objectFit: 'contain' }}></Image>
            ))
        )
    }
    

    return (
        <>
            
            {(signedIn && haveCollection) &&
                
                <Container id ="yourCollectionListParent" style={myStyle}>
                    {generateImages()}
                </Container>
            }
            {(signedIn && !haveCollection) &&
                <Container>
                    <center>
                        <h1>Sorry! No Pokémon in your collection</h1>
                        <br></br>
                        <Button onClick={()=>handlePokemartClick()}>Buy some Pokémon</Button>
                    </center>
                </Container>
            }
            {!signedIn &&
                <Container>
                    <center>
                        <h1>Try signing in</h1>
                        <br></br>
                        <Button onClick={()=> handleSignInClick()}>Go to sign in</Button>
                    </center>
                </Container>
            }

        </>
    );
} export default YourCollection;