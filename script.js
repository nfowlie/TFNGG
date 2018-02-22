// window.localStorage.clear();

var unlockedSongs = window.localStorage;
if (window.localStorage.length <= 0) {
    unlockedSongs.setItem("keys", 1);
    unlockedSongs.setItem("tracks", null);
}

// console.log(unlockedSongs.getItem("keys"));
if (unlockedSongs.getItem("tracks")) {
    if (unlockedSongs.getItem("tracks") !== "null") {
        var holder = JSON.parse(unlockedSongs.getItem("tracks"));
        var tracksUnlocked = Object.keys(holder).length - 1;
    }
    else {
        tracksUnlocked = -1;
    }
}
var lootBox = document.querySelector(".lootbox-lock");

// Clear Loot
var clearLoot = function () {
    unlockedSongs.setItem("tracks", null);
    loadTracks(JSON.parse(unlockedSongs.getItem("tracks")));
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
    var prevTracks
    if (unlockedSongs.getItem("tracks") !== "null" && unlockedSongs.getItem("tracks") !== "{}") {
        prevTracks = unlockedSongs.getItem("tracks");
        unlockedSongs.setItem("tracks", JSON.stringify({ [tracksUnlocked]: { title: trackTitle, src: trackSrc } }));
        var newSong = unlockedSongs.getItem("tracks");
        unlockedSongs.setItem("tracks", (prevTracks.slice(0, -1) + "," + newSong.substr(1)));
        loadTracks(JSON.parse(unlockedSongs.getItem("tracks")));
    }
    else {
        unlockedSongs.setItem("tracks", JSON.stringify({ [tracksUnlocked]: { title: trackTitle, src: trackSrc } }));
        loadTracks(JSON.parse(unlockedSongs.getItem("tracks")));
    }
    console.log(unlockedSongs.getItem("tracks"));
    console.log(JSON.parse(unlockedSongs.getItem("tracks")));

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
// var list ={}; var count= Object.keys(list).length;
var loadTracks = function (unlockedSongss) {
    if (unlockedSongss == null) {
        var tracksContainer = document.querySelector("#tracks");
        tracksContainer.innerHTML = "";
    }
    else {
        var tracksContainer = document.querySelector("#tracks");
        tracksContainer.innerHTML = "";
        var lootClearer = document.createElement("div");
        lootClearer.textContent = "Empty Loot";
        lootClearer.classList.add("clear");
        lootClearer.addEventListener("click", function () { clearLoot(); });
        tracksContainer.appendChild(lootClearer);
        var appendContainer = document.createElement("div");
        for (var t = 0; t < Object.keys(unlockedSongss).length; t++) {
            var parsed = unlockedSongss[t];
            console.log(parsed);
            var track = document.createElement("div");
            var trackSell = document.createElement("div");
            trackSell.classList.add("sell");
            trackSell.textContent = "SHARD IT";
            trackSell.dataset.position = t;
            trackSell.addEventListener("click", function () {
                sellLoot(this.dataset.position);
            });
            track.classList.add('track');
            var trackTitle = document.createElement("div");
            trackTitle.textContent = parsed.title;
            track.appendChild(trackTitle);
            track.appendChild(trackSell);
            var trackPlayer = document.createElement("audio");
            trackPlayer.setAttribute("controls", "");
            trackPlayer.src = parsed.src;
            track.appendChild(trackPlayer);

            appendContainer.appendChild(track);
        }
        tracksContainer.appendChild(appendContainer);
    }
};

var displayUnlock = function (unlock) {
    var unlockModal = document.querySelector(".unlock-modal");
    unlockModal.textContent = unlock.title;
    unlockModal.style.opacity = "1";
    unlockModal.style.color = "#ffffff";
};

var sellLoot = function (e) {
    console.log(e);
    unlockedSongs.removeItem(e);
    var songs = "";
    songs = JSON.parse(unlockedSongs.getItem("tracks"));



    unlockedSongs.setItem("tracks", null);
    // songs = JSON.parse(songs);
    console.log(songs);
    var u = 0;
    var tempSongs = {};
    for (var key in songs) {
        if (key !== e) {
            tempSongs[u] = songs[key];
            // unlockedSongs.setItem(u, songs[key]);
            u++;
        }
    }
    unlockedSongs.setItem("tracks", JSON.stringify(tempSongs));
    tracksUnlocked--;
    console.log(tempSongs);
    loadTracks(JSON.parse(unlockedSongs.getItem("tracks")));

    var sellModal = document.createElement("div");
    sellModal.classList.add("sell-modal");
    sellModal.textContent = "1 Keyshard Added";
    document.querySelector("#tracks").appendChild(sellModal);

};

loadTracks(JSON.parse(unlockedSongs.getItem("tracks")));
console.log(JSON.stringify(unlockedSongs.getItem("keys")));






