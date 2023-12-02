import Menubar from "../components/menubar";

function SignIn(){
    return (
        <>
            <Menubar />
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1>Sign In</h1>
                    <form class="row g-3" id="checkout-form">
                        <label for="inputUsername" class="form-label">Username</label>
                        <br></br>
                        <input type="text" class="form-control" id="inputUsername"></input>
                        <br></br>
                        
                        <label for="inputPassword" class="form-label">Password</label>
                        <br></br>
                        <input type="text" class="form-control" id="inputPassword"></input>
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignIn;