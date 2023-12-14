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
        console.log("username: " + props.userName);
        updateDb();
    }

    
    
    
    //TODO make this a function that updates the database? is it
    function updateDb(){
        fetch('http://localhost:8081/incrementCoins/'+ props.userName, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' }
        });
    }

    return (
        <> 
            <Container>
                <center>
                <h1>Click to earn coins!</h1>
                <img src={pokeCoin}  height={"25%"} width={"25%"} onClick={() => {addCoins()}}
                style={{alignItems:"center", alignSelf:"center", marginTop:"10%", minHeight:"400px", minWidth:"400px"}}
                alt="Click the coin to gain coins."/>

                </center>
            </Container>
        
        </>
    )
} export default EarnCoins;