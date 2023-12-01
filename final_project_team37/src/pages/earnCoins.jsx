import pokeCoin from '../images/pokeCoin.png'
import Container from 'react-bootstrap/Container'
import Menubar from '../components/menubar';

function EarnCoins() {


    return (
        <> 
            <Menubar />
            <Container>
            <img src={pokeCoin} alt="Click the coin to gain coins." />
            </Container>
        
        </>
    )
} export default EarnCoins;