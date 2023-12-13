import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Menubar from "../components/menubar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn } from "../components/userInfo"
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer, toast } from 'react-toastify';


function SignIn() {



    const [showSignUp, setShowSignUp] = useState(false);
    const [signedInForm, setSignedInForm] = useState(isSignedIn());

    const showToastMessage = () => {
        toast.failure("Incorrect Password", {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    function handleSignUp() {
        var signInUsername = document.getElementById("inputUsername").value;
        var password1 = document.getElementById("inputPassword").value;
        var password2 = document.getElementById("confirmPassword").value;
        if (password1 === password2) {
            changeUsername(signInUsername);
            postUser(signInUsername, password1);
            changeCoins(100);
            setSignedIn(true);
            setSignedInForm(true);
        }
        else {
            console.log("Passwords do not match");
        }


    };

    function handleSignIn() {
        var signInUsername = document.getElementById("inputUsername").value;
        var password = document.getElementById("inputPassword").value;

        getUser(signInUsername, password);
    };

    function getUser(signInUsername, password) {
        fetch('http://localhost:8081/users/' + signInUsername)
            .then(response => response.json())
            .then(data => {
                if (data.password === password) {
                    changeUsername(signInUsername);
                    changeCoins(data.coins);
                    console.log("login success");
                    setSignedIn(true);
                    setSignedInForm(true);
                }
                else {
                    console.log("login failure");
                    showToastMessage();
                }
            });
    };

    function postUser(signInUsername, password) {

        const newRequest = {
            "signInUsername": signInUsername,
            "password": password
        }
        fetch('http://localhost:8081/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newRequest)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    };

    // function addPokemon(signInUsername){
    //     const testPokemon = { 
    //         "id": 1,
    //         "name": "bulbasaur",
    //         "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    //         "imgShiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    //         "type1": "grass",
    //         "type2": "poison"
    //     }

    //     fetch('http://localhost:8081/addPokemon/' + signInUsername, {
    //         method: 'PUT',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify(testPokemon)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    // };


    // function SignInForm() {
    //     const [showSignUp, setShowSignUp] = useState(false);
      
    //     return (
    //       <Container>
           
    //       </Container>
    //     );
    //   }

    //   function SignedInView() {
    //     return (
    //       <Container>
            
    //       </Container>
    //     );
    //   }




    return (
        <>
            <Container>
                {!signedInForm &&
                    <Container>
                        {!showSignUp &&
                            <p>
                                Haven't signed up yet?
                                <Button type="button" variant="link" onClick={() => {
                                    console.log("SignUp Button Pushed");
                                    setShowSignUp(true);
                                }}>Sign Up</Button>
                            </p>
                        }
                        {showSignUp &&
                            <p>
                                Already have an account?
                                <Button type="button" variant="link" onClick={() => {
                                    console.log("SignIn Button Pushed");
                                    setShowSignUp(false);
                                }}>Sign In</Button>
                            </p>
                        }
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="username"
                                    className="inputUsername"
                                    id="inputUsername"
                                />
                            </Form.Group>
                        </Form>
                        <br></br>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="password"
                                    placeholder="password"
                                    className="inputPassword"
                                    id="inputPassword"
                                />
                            </Form.Group>
                        </Form>

                        <br></br>
                        {showSignUp &&
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="password"
                                        placeholder="confirm password"
                                        className="confirmPassword"
                                        id="confirmPassword"
                                    />
                                </Form.Group>
                            </Form>
                        }
                        {!showSignUp &&
                            <div>
                                <Button type="submit" variant="success" onClick={() => {
                                    handleSignIn();
                                }}>Sign In</Button>
                                {/* <button onClick={showToastMessage}>Notify</button>
                            <ToastContainer /> */}
                            </div>
                        }
                        {showSignUp &&
                            <Button type="submit" variant="success" onClick={() => {
                                handleSignUp();
                            }}>Sign Up</Button>
                        }

                    </Container>
                }

                {signedInForm &&
                    <Container>
                        {/* <Button type='submit' onClick={() =>{
                    addPokemon(retrieveUsername());
                }}>Add Pokemon</Button> */}


                        <Button type='submit' onClick={() => {
                            setSignedIn(false);
                            setSignedInForm(false);
                            changeUsername("");
                            changeCoins();
                        }}>Sign Out</Button>
                    </Container>
                }
            </Container>



        </>
    )
}
export default SignIn;