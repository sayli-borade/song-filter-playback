let musicData = {
  "feel good": [
    {name:"Radha", img:"images/Radha.png", src:"songs/song1.mp3"},
    {name:"Kya Khoob Lagti Ho", img:"images/Kya Khoob Lagti Ho.png", src:"songs/song2.mp3"},
    {name:"Hareeya", img:"images/Hareeya.png", src:"songs/song3.mp3"},
    {name:"Ishq Wala Love", img:"images/Ishq Wala Love.png", src:"songs/song1.mp3"},
    {name:"The Disco Song", img:"images/The Disco Song.png", src:"songs/song2.mp3"}
  ],

  "workout": [
    {name:"Ok Jaanu", img:"images/Ok Jaanu.png", src:"songs/song3.mp3"},
    {name:"Make Some Noise for the Desi Boyz", img:"images/Make Some Noise for the Desi Boyz.png", src:"songs/song1.mp3"},
    {name:"Dhating Naach", img:"images/Dhating Naach.png", src:"songs/song2.mp3"},
    {name:"Cheap Thrills", img:"images/Cheap Thrills.png", src:"songs/song3.mp3"},
    {name:"Meri Madhubala", img:"images/Meri Madhubala.png", src:"songs/song1.mp3"}
  ],

  "energize": [
    {name:"Pinky", img:"images/Pinky.png", src:"songs/song2.mp3"},
    {name:"Mera Naam Mary", img:"images/Mera Naam Mary.png", src:"songs/song3.mp3"},
    {name:"Beedi", img:"images/Beedi.png", src:"songs/song1.mp3"},
    {name:"Chalti Hai Kya 9 se 12", img:"images/Chalti Hai Kya 9 se 12.png", src:"songs/song2.mp3"},
    {name:"Sheila ki Jawani", img:"images/Sheila ki Jawani.png", src:"songs/song3.mp3"}
  ],

  "relax": [
    {name:"Zaalima", img:"images/Zaalima.png", src:"songs/song1.mp3"},
    {name:"Yad Lagla", img:"images/Yad Lagla.png", src:"songs/song2.mp3"},
    {name:"Afreen Afreen", img:"images/Afreen Afreen.png", src:"songs/song3.mp3"},
    {name:"Chaleya", img:"images/Chaleya.png", src:"songs/song1.mp3"},
    {name:"Tik Tik Vajte", img:"images/Tik Tik Vajte.png", src:"songs/song2.mp3"}
  ],

  "romance": [
    {name:"Ishq Bulaava", img:"images/Ishq Bulaava.png", src:"songs/song3.mp3"},
    {name:"Sajdaa", img:"images/Sajdaa.png", src:"songs/song1.mp3"},
    {name:"Guzarish", img:"images/Guzarish.png", src:"songs/song2.mp3"},
    {name:"Meherbaan", img:"images/Meherbaan.png", src:"songs/song3.mp3"},
    {name:"Ishq Sufiyana", img:"images/Ishq Sufiyana.png", src:"songs/song1.mp3"}
  ],

  "party": [
    {name:"Dil Dooba", img:"images/Dil Dooba.png", src:"songs/song2.mp3"},
    {name:"Gori Gori Gori", img:"images/Gori Gori Gori.png", src:"songs/song3.mp3"},
    {name:"Desi Girl", img:"images/Desi Girl.png", src:"songs/song1.mp3"},
    {name:"Chikni Chameli", img:"images/Chikni Chameli.png", src:"songs/song2.mp3"},
    {name:"Abhi Toh Party Shuru Hui Hai", img:"images/Abhi Toh Party Shuru Hui Hai.png", src:"songs/song3.mp3"}
  ],

};

let songList = document.getElementById("songList");

// SHOW SONGS
function showSongs(category){
  songList.innerHTML = "";

  musicData[category].forEach(function(song){

    let div = document.createElement("div");
    div.classList.add("song");

    div.innerHTML = `
  <div class="img-box">
    <img src="${song.img}">
    <div class="hover-play"></div>
  </div>
  <div>
    <h4>${song.name}</h4>
    <p>${category}</p>
  </div>
`;

  div.addEventListener("click", function(){
    // Remove highlight from all songs
    document.querySelectorAll(".song").forEach(s => s.classList.remove("active-song"));
    div.classList.add("active-song");

    // Play audio safely, even if file is reused
    let player = document.getElementById("audioPlayer");
    if(player.src.endsWith(song.src)){ 
        // if same file, reset to start
        player.currentTime = 0;
        player.play();
    } else {
        player.src = song.src;
        player.load();          // force browser to reload the file
        player.play();
    }

    // Update now playing text
    document.getElementById("nowPlaying").innerText = "Now Playing: " + song.name;
});

    songList.appendChild(div);
  });
}

// DEFAULT LOAD
showSongs("feel good");

// CHIP CLICK
document.querySelectorAll(".chips span").forEach(function(chip){
  chip.addEventListener("click", function(){
    let category = this.innerText.toLowerCase().trim();
    showSongs(category);
  });
});

// SEARCH
document.getElementById("searchBar").addEventListener("keyup", function(){
  let input = this.value.toLowerCase();
  let songs = document.querySelectorAll(".song");

  songs.forEach(function(song){
    let text = song.innerText.toLowerCase();
    song.style.display = text.includes(input) ? "flex" : "none";
  });
});