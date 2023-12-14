import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Menubar from "../components/menubar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn } from "../components/userInfo"
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer, toast } from 'react-toastify';



import { BrowserRouter, Routes, Route } from "react-router-dom";



function SignIn(props) {

    const PageState = {
        signIn: 'signIn',
        signUp: 'signUp',
        account: 'account'
    }
    const InputState = {
        userNameInvalid: 'User Name is Invalid',
        passwordInvalid: 'Password is invalid',
        passwordConfirmInvalid: 'Passwords do not match'

    }
    var [pageState, setPageState] = useState(PageState.signIn)
    const [inputsValid, setInputsValid] = useState({
        userNameValid: true,
        passwordValid: true,
        passowordConfirmValid: true
    });
    

    // function setTexts() {
    //     var userNameText = document.getElementById("userNameFeedback");
    //     var userNameText = document.getElementById("passwordFeedback");
    //     var userNameText = document.getElementById("confirmPasswordFeedback");
        
    //     if(!inputsValid.userNameValid) {
    //         userNameText.innerText = "d-block"
    //     } else {
    //         userNameText = "d-none"
    //     }
    // }

    


    function handleSignUp() {
        var signInUsername = document.getElementById("inputUsername").value;
        var password1 = document.getElementById("inputPassword").value;
        var password2 = document.getElementById("confirmPassword").value;


        if (password1 === password2) {
            props.setUserName(signInUsername);
            postUser(signInUsername, password1);
            props.setNumCoins(100);
            setPageState(PageState.account);
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
                    console.log(signInUsername);
                    props.setUserName(signInUsername);
                    props.setNumCoins(data.coins);
                    console.log("login success");
                    setPageState(PageState.account);
                }
                else {
                    //Invalid Sign in. Display Bootstrap Sign In validation
                    console.log("Invalid User/Pass")
                    // setInputsValid(prevState => ({
                    //     ...prevState,
                    //     userNameValid: false
                    // }));

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

    function ShowAccountPage() {
        return (
            <Container>

                <h1>
                    You're signed in!
                </h1>
                <h2>
                    Welcome to Team 37's Coms 319 Final Project
                </h2>
                <Button type='submit' onClick={() => {
                    setPageState(PageState.signIn);
                    props.setUserName("");
                    props.setNumCoins(0);
                }}>Sign Out</Button>
            </Container>
        );
    }

    function CommonForm(props) {
        return (
            <>
                <Form.Group className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="username"
                        className="inputUsername"
                        id="inputUsername"
                    />
                    <Form.Control.Feedback type="invalid" id='userNameFeedback' className='d-block'>
                        {!inputsValid.userNameValid && InputState.userNameInvalid}
                    </Form.Control.Feedback>
                    

                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        size="lg"
                        type="password"
                        placeholder="password"
                        className="inputPassword"
                        id="inputPassword"
                    />
                    <Form.Control.Feedback type="invalid" id='passwordFeedback' className='d-block'>
                        {!inputsValid.passwordValid && InputState.passwordInvalid}
                    </Form.Control.Feedback>
                </Form.Group>

            </>
        )

    }


    function ShowSignInForm() {

        return (
            <Container>
                <Form>
                    <CommonForm />
                    <br></br>

                </Form>

                <Button type="submit" variant="success" onClick={() => {
                    handleSignIn();
                }}>Sign In</Button>

                <p>
                    Haven't signed up yet?
                    <Button type="button" variant="link" onClick={() => {
                        console.log("SignUp Button Pushed");
                        setPageState(PageState.signUp);
                    }}>Sign Up</Button>
                </p>
                <br />

            </Container>
        );
    }


    function ShowSignUpForm() {

        return (
            <Container>

                <Form>
                    <CommonForm />


                    <Form.Group controlId='signUp' className="mb-3" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            size="lg"
                            type="password"
                            placeholder="confirm password"
                            className="confirmPassword"
                            id="confirmPassword"
                        />
                        <Form.Control.Feedback id="confirmPasswordFeedback" type="invalid" className='d-block'>
                            {!inputsValid.passowordConfirmValid && InputState.confirmPasswordFeedback}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>


                <Button type="submit" variant="success" onClick={() => {
                    handleSignUp();
                }}>Sign Up</Button>

                <p>
                    Already have an account?
                    <Button type="button" variant="link" onClick={() => {
                        console.log("SignIn Button Pushed");
                        setPageState(PageState.signIn);
                    }}>Sign In</Button>
                </p>
                <br />

            </Container>

        )

    }




    return (
        <>
            <Container>
                {pageState === PageState.signIn && <ShowSignInForm />}
                {pageState === PageState.signUp && <ShowSignUpForm />}
                {pageState === PageState.account && <ShowAccountPage />}
            </Container>



        </>
    )
}
export default SignIn;