import pokeCoin from '../images/pokeCoin.png'
import Container from 'react-bootstrap/Container'
import Menubar from '../components/menubar';
import { useState, useEffect } from 'react';
import {retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn} from "../components/userInfo"




function EarnCoins(props) {

    const [numCoins, setNumCoins] = useState(props.numCoins);

    function addCoins() {
        setNumCoins(numCoins+1);
        props.setNumCoins(numCoins+1);
        console.log("earnCoins: " + numCoins);
        updateDb();
    }

    
    
    
    //TODO make this a function that updates the database? is it
    function updateDb(){
        fetch('http://localhost:8081/incrementCoins/'+ retrieveUsername(), {
            method: 'PUT',
            headers: { 'content-type': 'application/json' }
        });
    }

    return (
        <> 
            <Container>
                <center>
                <img src={pokeCoin}  height={"40%"} width={"40%"} onClick={() => {addCoins()}}
                style={{alignItems:"center", alignSelf:"center", marginTop:"15%", minHeight:"400px", minWidth:"400px"}}
                alt="Click the coin to gain coins."/>

                </center>
            </Container>
        
        </>
    )
} export default EarnCoins;