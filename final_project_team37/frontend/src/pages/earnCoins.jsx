import pokeCoin from '../images/pokeCoin.png'
import Container from 'react-bootstrap/Container'
import Menubar from '../components/menubar';
import { useState, useEffect } from 'react';
import {retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn} from "../components/userInfo"




function EarnCoins() {
    var [numCoins, setNumCoins] = useState(0);
    
    function handleCoinClick() {
        // setNumCoins(numCoins +=1);
        addCoins();
        changeCoins(retrieveCoins()+1);
    }

    function addCoins(){
        fetch('http://localhost:8081/incrementCoins/'+ retrieveUsername(), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' }
        });
    }

    return (
        <> 
            <Menubar />
            <Container>
                <center>
                <img src={pokeCoin}  height={"40%"} width={"40%"} onClick={handleCoinClick}
                style={{alignItems:"center", alignSelf:"center", marginTop:"15%", minHeight:"400px", minWidth:"400px"}}
                alt="Click the coin to gain coins."/>

                </center>
            </Container>
        
        </>
    )
} export default EarnCoins;