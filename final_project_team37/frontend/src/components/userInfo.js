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
    username = editUsername;
}
function changeCoins(editCoins){
    coins = editCoins;
}
function setSignedIn(signedInStatus){
    signedIn = signedInStatus;
}
export {retrieveUsername, retrieveCoins, changeUsername, changeCoins, isSignedIn, setSignedIn};