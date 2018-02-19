// window.localStorage.clear();
var unlockedSongs = window.localStorage;
var tracksUnlocked = unlockedSongs.length - 1;
var lootBox = document.querySelector(".lootbox-lock");


// Navigation
document.querySelector("#loot").addEventListener("click", function(){
    document.querySelector(".lootbox").style.display = "flex";
    document.querySelector("#tracks").style.display = "none";
});

document.querySelector("#track").addEventListener("click", function(){
    document.querySelector(".lootbox").style.display = "none";
    document.querySelector("#tracks").style.display = "flex";
});

// Handles Lootbox 'Animation'
// Mouse Enter
lootBox.addEventListener("mouseover", function () {
    lootBox.style.backgroundImage = 'url("./loot-box-edited-pressed.png")';
});
// Mouse Leave
lootBox.addEventListener("mouseout", function () {
    lootBox.style.backgroundImage = 'url("./loot-box-edited.png")';
});
// Mouse Click Release
lootBox.addEventListener("mouseup", function () {
    var masterPlayer = document.querySelector(".player audio");
    var track = tracks[getRandomIntInclusive(0, tracks.length - 1)];
    var trackTitle = track.title;
    var trackSrc = "./tracks/" + track.source;
    
    lootBox.style.backgroundImage = 'url("./loot-box-edited-pressed.png")';
    getRandomIntInclusive(0, tracks.length);
    masterPlayer.src = trackSrc;
    masterPlayer.play();
    tracksUnlocked++;
    unlockedSongs.setItem(tracksUnlocked, JSON.stringify({title: trackTitle, src: trackSrc}));
    loadTracks(unlockedSongs);
});
// Mouse Click Down
lootBox.addEventListener("mousedown", function () {
    lootBox.style.backgroundImage = 'url("./loot-box-edited-clicked.png")';
});

// Random Number Generator
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// Load Tracks
var loadTracks = function (unlockedSongs) {
    var tracksContainer = document.querySelector("#tracks");
    tracksContainer.innerHTML = "";

    for (var t = 0; t < unlockedSongs.length; t++) {
        var parsed = unlockedSongs.getItem(t);
        var track = document.createElement("div");
        track.classList.add('track');
        var trackTitle = document.createElement("div");
        trackTitle.textContent = JSON.parse(parsed).title;
        track.appendChild(trackTitle);
        var trackPlayer = document.createElement("audio");
        trackPlayer.setAttribute("controls", "");
        trackPlayer.src = JSON.parse(parsed).src;
        track.appendChild(trackPlayer);
        
        tracksContainer.appendChild(track);
    }
};

loadTracks(unlockedSongs);