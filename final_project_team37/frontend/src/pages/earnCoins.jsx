import pokeCoin from '../images/pokeCoin.png'
import Container from 'react-bootstrap/Container'
import Menubar from '../components/menubar';
import { useState, useEffect } from 'react';



function EarnCoins() {
    var [numCoins, setNumCoins] = useState(0);
    
    function handleCoinClick() {
        setNumCoins(numCoins +=1);
        console.log("Num Coins: " + numCoins);
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