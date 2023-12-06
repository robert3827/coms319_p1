import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Menubar from "../components/menubar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function SignIn(){



    const [showSignUp, setShowSignUp] = useState(false);


    function handleSignUp() {
        var username = document.getElementById("inputUsername").value;
        var password1 = document.getElementById("inputPassword").value;
        var password2 = document.getElementById("confirmPassword").value;
        if(password1 === password2){
            postUser(username, password1);
        }
        else{
            console.log("Passwords do not match");
        }
        

    };

    function handleSignIn() {
        var username = document.getElementById("inputUsername").value;
        var password = document.getElementById("inputPassword").value;

        getUser(username, password);
    };

    function getUser(username, password){
        fetch('http://localhost:8081/users/' + username)
            .then(response => response.json())
            .then(data => {
            console.log(data.password);
            if(data.password === password){
                console.log("login success");
            }
            else{
                console.log("login failure");
            }
            });
    };

    function postUser(username, password){
        
        const newRequest = {
            "username" : username,
            "password" : password
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



    return (
        <>
            <Menubar />
                <Container id='signInContainer' >
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
                        <Button type="submit" variant="success" onClick={()=>{
                            handleSignIn();
                        }}>Sign In</Button>
                    }
                    {showSignUp &&
                        <Button type="submit" variant="success" onClick={()=>{
                            handleSignUp();
                        }}>Sign Up</Button>
                    }

                </Container>

           
        </>
    )
}
export default SignIn;