var username;
var coins;

function retrieveUsername(){
    return username;
}
function retrieveCoins(){
    return coins;
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
export {retrieveUsername, retrieveCoins, changeUsername, changeCoins};