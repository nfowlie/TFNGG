document.querySelector(".lootbox").addEventListener("mouseover", function () {
    document.querySelector(".lootbox").style.backgroundImage = 'url("./loot-box-edited-pressed.png")';
});

document.querySelector(".lootbox").addEventListener("mouseout", function () {
    document.querySelector(".lootbox").style.backgroundImage = 'url("./loot-box-edited.png")';
});

document.querySelector(".lootbox").addEventListener("mouseup", function () {
    document.querySelector(".lootbox").style.backgroundImage = 'url("./loot-box-edited-pressed.png")';
    getRandomIntInclusive(0, tracks.length);
    document.querySelector("audio").src = "./tracks/" + tracks[getRandomIntInclusive(0, tracks.length - 1)].source;
    document.querySelector("audio").play();
});

document.querySelector(".lootbox").addEventListener("mousedown", function () {
    document.querySelector(".lootbox").style.backgroundImage = 'url("./loot-box-edited-clicked.png")';
});


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }