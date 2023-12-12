var username;
var coins;
var signedIn;

function retrieveUsername(){
    return username;
}
function retrieveCoins(){
    return coins;
}
function isSignedIn(){
    return signedIn;
}
function changeUsername(editUsername){
    // console.log("got into change username ");
    username = editUsername;
    // console.log("after chagne username: ", username)
}
function changeCoins(editCoins){
    coins = editCoins;
    console.log("coins to: ", coins)
}
function setSignedIn(signedInStatus){
    signedIn = signedInStatus;
}
export {retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn};