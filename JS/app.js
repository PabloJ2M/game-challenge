const fitter = document.getElementById("gameplay");

const menu = document.getElementById("menu");
const playButton = document.getElementById("play");
const leaderboardButton = document.getElementById("liderboard");

const leaderboard = document.getElementById("leaderboard");
const menuButon = document.getElementById("restart");
let interface = true;

playButton.addEventListener("click", () =>
{
    interface = false;
    menu.style.setProperty('--opacity', 0);
    menu.classList.add("locked");
});
leaderboardButton.addEventListener("click", () =>
{
    menu.classList.add("locked");
    menu.style.setProperty('--opacity', 0);
    showLiderboard(true);
});
menuButon.addEventListener("click", () => 
{
    window.location.reload();
});

function showLiderboard(state)
{
    if (state == true)
    {
        readAllData();
        leaderboard.classList.remove("locked");
        leaderboard.style.setProperty('--opacity', 1);
    }
    else
    {
        leaderboard.classList.add("locked");
        leaderboard.style.setProperty('--opacity', 0);
    }
}