//---------------------------------------- declarations ------------------------------------
const background = document.querySelector('#album_cover');
const song = document.querySelector('#song');
const thumbnail = document.querySelector('#thumbnail');
const progressBar = document.querySelector('#progress_bar');
const songArtist = document.querySelector('.song_artist');
const songTitle = document.querySelector('.song_title');

let pPause = document.querySelector('.play_pause');
let playing = true;

songs = ['music/Midnight at the Underground.mp3', 'music/Telepathic Boys.mp3', 'music/No Slow Dancing.mp3', 'music/Understanding.mp3', 'music/Girl On a Wire.mp3', 'music/Renegade.mp3', 'music/Good Feeling.mp3', 'music/Storytime.mp3', 'music/Its Okay.mp3', 'music/Difference.mp3']; // object storing paths for audio objects
thumbnails = ['covers/TheBaskervilles.jpg', 'covers/AlligatorIndian.jfif', 'covers/AustinLeonardJones.jfif', 'covers/BlackbirdBlackbird.jfif', 'covers/.357Lover.jpg', 'covers/AintNoLove.jfif', 'covers/Benjimanji.jfif', 'covers/AJSuper.jfif', 'covers/AylaNereo.jfif', 'covers/Ketsa.jfif']; // object storing paths for album covers and backgrounds
songArtists = ["The Baskervilles", "Alligator Indian", "Austin Leonard Jones", "Blackbird Blackbird", ".357 Lover", "Ain't No Love", "Benjimanji", "AJ Super", "Ayla Nereo", "Ketsa"];
songTitles = ["Midnight at the Underground", "Telepathic Boys", "No Slow Dancing", "Understanding", "Girl On a Wire", "Renegade", "Good Feeling", "Storytime", "It's Okay", "Difference"];
trackLength = ['2:19', '3:06', '2:08', '1:48', '3:11', '3:08', '3:24', '3:24', '3:19', '3:00'];

var totalSongsCount = songs.length;
var songCount = 0;
var shuffle = document.getElementById('random_song');

var lockSongArtist = document.getElementById("lockArtist");
var lockSongTitle = document.getElementById("lockSong");

var menu = document.getElementById("menuscreen");
var main = document.getElementById("mainscreen");
var lock = document.getElementById("lockscreen");
var playList = document.getElementById("PlaylistMenu");
var songList = document.getElementById("SongsMenu");
var menuSongs = document.getElementById("menuTitlesSongs");
var menuPlaylists = document.getElementById("menuTitlesPlaylists");
var text, i

//---------------------------------------- functions ---------------------------------------
    //to play
function playPause() {
    if (playing) {

        pPause.src = "svg/pause.svg"
        thumbnail.style.transform = "scale(1.15)";

        song.play();
        playing = false;
    } else {
        pPause.src = "svg/play.svg"
        thumbnail.style.transform = "scale(1)"

        song.pause();
        playing = true;
    }
}
//to automatically start playing next song
song.addEventListener('ended', function () {
    if (shuffle.checked) {
        shuffleSong();
    } else {
        nextSong();
    }
});
    //to play next song when triggering the function either with buttons or when previous song finishes
function nextSong() {
    if (shuffle.checked) {
        shuffleSong();
    } else {
        songCount++;
        if (songCount > (totalSongsCount - 1)) {
            songCount = 0;
        };
        song.src = songs[songCount];
        thumbnail.src = thumbnails[songCount];
        background.src = thumbnails[songCount];

        songArtist.innerHTML = songArtists[songCount];
        songTitle.innerHTML = songTitles[songCount];

        lockSongArtist.innerHTML = songArtists[songCount];
        lockSongTitle.innerHTML = songTitles[songCount];

        playing = true;
        playPause();
    }
}
//to play the previous song when triggered by a button
function previousSong() {
    songCount--;
    if (songCount < 0) {
        songCount = 0;
    };
    song.src = songs[songCount];
    thumbnail.src = thumbnails[songCount];
    background.src = thumbnails[songCount];

    songArtist.innerHTML = songArtists[songCount];
    songTitle.innerHTML = songTitles[songCount];

    playing = true;
    playPause();
}
//to loop the current song
function repeatSong() {
    var decider = document.getElementById('repeat_song');
    if (decider.checked) {
        song.loop = true;
    } else {
        song.loop = false;
    }
}
//to mute the volume of the player
function muteVol() {
    var decider = document.getElementById('volume_up');
    var bar = document.getElementById("volume_bar");
    if (decider.checked) {
        song.muted = true;
        bar.value = 0;
    } else {
        song.muted = false;
        bar.value = 1;
    }
}
//to change the volume using the bar
function changeVol() {
    song.volume = document.getElementById("volume_bar").value;
    var decider = document.getElementById('volume_up');
    if (song.volume === 0) {
        decider.checked = true;
    } else {
        decider.checked = false;
    }
}
//for the progress bar to work
function changeProgressBar() {
    song.currentTime = progressBar.value;
}
//updates the current songs current and duration time, and the progress bar value
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.current_time').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.duration_time').innerHTML === "NaN:NaN") {
        document.querySelector('.duration_time').innerHTML = "0:00";
    } else {
        document.querySelector('.duration_time').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};
//Runs the function updateProgressValue at certain intervals to update the song progress value
setInterval(updateProgressValue, 500);
//convert the current/duration time to MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};
//to bring up the menu screen
function menuScreen() {
    menu.style.visibility = "visible";
    main.style.visibility = "hidden";
    showSongs();
    fillSongs();
}
//to go back to the main menu
function backMain() {
    main.style.visibility = "visible";
    menu.style.visibility = "hidden";
    songList.style.visibility = "hidden";
    playList.style.visibility = "hidden";
}
//to show the songs and playlists
function fillSongs() {
    text = '<ol id="menuTracks">';
    for (i = 0; i < totalSongsCount; i++) {
        text += '<li style="padding-left:5px"><a>' + songTitles[i] + '</a></li>';
    }
    text += "</ol>";
    document.getElementById("trackTitle").innerHTML = text;

    text = '<ul id="menuArtists">';
    for (i = 0; i < totalSongsCount; i++) {
        text += '<li style="padding-left:20px">' + songArtists[i] + '</li>';
    }
    text += "</ul>";
    document.getElementById("trackArtist").innerHTML = text;

    text = '<ul id="menuLength">';
    for (i = 0; i < totalSongsCount; i++) {
        text += "<li>" + trackLength[i] + "</li>";
    }
    text += "</ul>";
    document.getElementById("trackLength").innerHTML = text;
}
function showSongs() {
    menuSongs.style.color = "black";
    menuSongs.style.cursor = "not-allowed";
    menuPlaylists.style.color = "white";
    menuPlaylists.style.cursor = "pointer";
    songList.style.visibility = "visible";
    playList.style.visibility = "hidden";
}
function showPlaylists() {
    menuSongs.style.color = "white";
    menuSongs.style.cursor = "pointer";
    menuPlaylists.style.color = "black";
    menuPlaylists.style.cursor = "not-allowed";
    songList.style.visibility = "hidden";
    playList.style.visibility = "visible";
}
//to search in the songs list
function searchList() {
    var input = document.getElementById("songSearch");
    var filter = input.value.toUpperCase();
    var ol = document.getElementById("menuTracks");
    var ulA = document.getElementById("menuArtists");
    var ulL = document.getElementById("menuLength");
    var li1 = ol.getElementsByTagName("li");
    var li2 = ulA.getElementsByTagName("li");
    var li3 = ulL.getElementsByTagName("li");

    for (i = 0; i < li1.length; i++) {
        a = li1[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li1[i].style.display = "";
            li2[i].style.display = "";
            li3[i].style.display = "";
        } else {
            li1[i].style.display = "none";
            li2[i].style.display = "none";
            li3[i].style.display = "none";
        }
    }
}
//to shuffle the songs
function shuffleSong() {
    var currentSong = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleNumbers(currentSong);
    function shuffleNumbers(songOrder) {
        var i = songOrder.length;
        if (i == 0) return false;
        while (--i) {
            var j = Math.floor(Math.random() * (i + 1));
            var tempi = songOrder[i];
            var tempj = songOrder[j];
            songOrder[i] = tempj;
            songOrder[j] = tempi;
        }
    }
    var x = 0;
    x++;
    if (x > (totalSongsCount - 1)) {
        x = 0;
    };
    song.src = songs[currentSong[x]];
    thumbnail.src = thumbnails[currentSong[x]];
    background.src = thumbnails[currentSong[x]];

    songArtist.innerHTML = songArtists[currentSong[x]];
    songTitle.innerHTML = songTitles[currentSong[x]];

    lockSongArtist.innerHTML = songArtists[currentSong[x]];
    lockSongTitle.innerHTML = songTitles[currentSong[x]];

    playing = true;
    playPause();
}
//to like songs
function likeSong() {
    alert("I am liking this song")
}
//to lock the screen when idle for 30 seconds
document.addEventListener('mousemove', function () {
    lock.style.visibility = "hidden";
}, true);

var idle;
document.onmousemove = function () {
    clearTimeout(idle);
    idle = setTimeout(function () {
        lock.style.visibility = "visible";
    }, 30000);
}