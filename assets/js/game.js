window.onload = function() {
	var mkMusic = $("<audio>");
	mkMusic.attr("src", "assets/sounds/mktheme.mp3")
//https://stackoverflow.com/questions/3273552/html5-audio-looping
	if (typeof mkMusic.loop === "boolean") {
		mkMusic = true;
	}
	else {
		mkMusic[0].addEventListener("ended", function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
//end loop code
	mkMusic[0].play();
}