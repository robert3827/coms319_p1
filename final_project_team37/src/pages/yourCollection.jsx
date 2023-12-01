import Menubar from "../components/menubar";
import Container from "react-bootstrap/Container";
import GrassBg from "../images/grassBg.png";

function YourCollection() {

    const myStyle = {
        backgroundImage: `url(${GrassBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <>
            <Menubar />


            <Container style={myStyle}>

                <section class="py-5 text-center container banner">
                    <div class="row py-lg-5">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <h1 class="fw-light">Your Collection</h1>
                            <p class="lead text-body-secondary white">All of the pokemon that you have purchased</p>
                            <p>
                                <a href="./pokemart.html" class="btn btn-primary my-2">Visit the Pokemart</a>
                                <a href="./index.html" class="btn btn-secondary my-2">Visit the homepage</a>
                            </p>
                        </div>
                    </div>
                </section>

                <div id="yourCollectionListParent">

                </div>
            </Container>

        </>
    );
} export default YourCollection;