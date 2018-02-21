// window.localStorage.clear();
var unlockedSongs = window.localStorage;
var tracksUnlocked = unlockedSongs.length - 1;
var lootBox = document.querySelector(".lootbox-lock");

// Clear Loot
var clearLoot = function () {
    window.localStorage.clear();
    loadTracks(unlockedSongs);
    tracksUnlocked = -1;
};

// Navigation
document.querySelector("#loot").addEventListener("click", function () {
    document.querySelector(".lootbox").style.display = "flex";
    document.querySelector("#tracks").style.display = "none";
});

document.querySelector("#track").addEventListener("click", function () {
    document.querySelector(".lootbox").style.display = "none";
    document.querySelector("#tracks").style.display = "flex";

    var unlockModal = document.querySelector(".unlock-modal");
    unlockModal.style.color = "#268afa";
    unlockModal.style.opacity = "";
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
    unlockedSongs.setItem(tracksUnlocked, JSON.stringify({ title: trackTitle, src: trackSrc }));
    loadTracks(unlockedSongs);
    displayUnlock(track);
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
    var lootClearer = document.createElement("div");
    lootClearer.textContent = "Empty Loot";
    lootClearer.classList.add("clear");
    lootClearer.addEventListener("click", function () { clearLoot(); });
    tracksContainer.appendChild(lootClearer);
    var appendContainer = document.createElement("div");
    for (var t = 0; t < unlockedSongs.length; t++) {
        var parsed = unlockedSongs.getItem(t);
        var track = document.createElement("div");
        var trackSell = document.createElement("div");
        trackSell.classList.add("sell");
        trackSell.textContent = "SHARD IT";
        trackSell.dataset.position = t;
        trackSell.addEventListener("click", function(){
            sellLoot(this.dataset.position);
        });
        track.classList.add('track');
        var trackTitle = document.createElement("div");
        trackTitle.textContent = JSON.parse(parsed).title;
        track.appendChild(trackTitle);
        track.appendChild(trackSell);
        var trackPlayer = document.createElement("audio");
        trackPlayer.setAttribute("controls", "");
        trackPlayer.src = JSON.parse(parsed).src;
        track.appendChild(trackPlayer);

        appendContainer.appendChild(track);
    }
    tracksContainer.appendChild(appendContainer);
};

var displayUnlock = function(unlock){
    var unlockModal = document.querySelector(".unlock-modal");
    unlockModal.textContent = unlock.title;
    unlockModal.style.opacity = "1";
    unlockModal.style.color = "#ffffff";
};

var sellLoot = function(e){
    console.log(e);
    unlockedSongs.removeItem(e);
    var songs = "";
    songs = JSON.stringify(unlockedSongs);
    unlockedSongs.clear();
    songs = JSON.parse(songs);
    console.log(songs);
    var u = 0;
    for(var key in songs){
        unlockedSongs.setItem(u, songs[key]);
        u++;
    }
    tracksUnlocked--;
    loadTracks(unlockedSongs);

    var sellModal = document.createElement("div");
    sellModal.classList.add("sell-modal");
    sellModal.textContent = "1 Keyshard Added";
    document.querySelector("#tracks").appendChild(sellModal);

};

loadTracks(unlockedSongs);