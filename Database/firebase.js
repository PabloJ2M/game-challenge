const firebaseConfig = {
    apiKey: "AIzaSyBYtFeYzG-c41XPhhYFY6qbcLZDEViGjd8",
    authDomain: "touluose-236d6.firebaseapp.com",
    databaseURL: "https://touluose-236d6-default-rtdb.firebaseio.com",
    projectId: "touluose-236d6",
    storageBucket: "touluose-236d6.appspot.com",
    messagingSenderId: "32434462459",
    appId: "1:32434462459:web:2d9f5a8224ab06ac27da5e"
};

firebase.initializeApp(firebaseConfig);

var userAuth;
var db = firebase.firestore();
const ref = db.collection("Leaderboard");

var sessionScore = sessionStorage.getItem("score");
var currentScore = sessionScore ? sessionScore : 0;
var dataScore = 0;

async function getDataScore()
{
    dataScore = currentScore;
    if(!userAuth) return;

    var doc = await ref.doc(userAuth.uid).get();
    if(doc.exists) dataScore = dataScore < doc.data().score ? doc.data().score : dataScore;
}
async function setDataScore(NewScore)
{
    dataScore = sessionStorage.getItem("score");
    if(NewScore > dataScore) { sessionStorage.setItem("score", NewScore); dataScore = NewScore; }
    document.getElementById("score").innerHTML = "Tu Score: " + dataScore;

    if(!userAuth) return;
    await updateDataScore();
}
async function updateDataScore()
{
    if(!userAuth) return;

    var doc = ref.doc(userAuth.uid);
    var get = await doc.get();

    if(get.exists)
    { if(get.data().score < dataScore) doc.update({score: dataScore}); }
    else
    { doc.set({username: userAuth.displayName, score: dataScore}); }
}
async function readAllData()
{
    console.log("db");
    removeAllItemsFromTable();
    var list = await ref.orderBy('Score', "desc").limit(5).get();
    
    var numeration = 1;
    list.forEach(row => {
        var name = row.data().Name;
        var score = row.data().Score;
        AddItemToTable(numeration, name, score);
        numeration++;
    });
}
function removeAllItemsFromTable()
{
    var e = document.querySelector("tbody");
    var child = e.lastElementChild;
    while(child) { e.removeChild(child); child = e.lastElementChild; }
}
function AddItemToTable(numeration, name, score)
{
    //create column
    var tbody = document.getElementById("body");
    var trow = document.createElement('tr');

    //create row
    var td0 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    //set values 'number','name','score'
    td0.innerHTML = numeration;
    td1.innerHTML = name;
    td2.innerHTML = score;
    
    trow.appendChild(td0); trow.appendChild(td1); trow.appendChild(td2);
    tbody.appendChild(trow);
}

const auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

const loginButton = document.getElementById("loginBoardButton");
const logoutButton = document.getElementById("logoutBoardButton");
loginButton.addEventListener("click", () => auth.signInWithPopup(provider));
logoutButton.addEventListener("click", () => auth.signOut());

auth.onAuthStateChanged(user => 
{
    if (user) { userAuth = user; loginButton.style.display = "none"; logoutButton.style.display = "unset"; }
    else { loginButton.style.display = "unset"; logoutButton.style.display = "none"; }
});