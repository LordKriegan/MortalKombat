window.onload = function() {
	var mkMusic = $("<audio>");
	mkMusic.attr("src", "assets/sounds/mkcharselect.mp3")
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
	for (var i = 0; i < charList.length; i++) {
		//setup character box elements
		var newCharacter = $("<div>");
		var charImage = $("<img>");
		var charName = $("<h1>");
		//setup element classes
		newCharacter.addClass("characterBox");
		charImage.addClass("characterImage img-responsive");
		charImage.attr("title", 
					   "Name: " + charList[i].name + 
					   "\nAttack Power: " + charList[i].atkPower +
					   "\nHealth: " + charList[i].health);
		charName.addClass("characterName");
		//store index of character for reference purposes
		newCharacter.attr("data-index", i);
		//insert image into image element
		charImage.attr("src", charList[i].img);
		//add character name to h1 element
		charName.html(charList[i].name);
		//append inner elements to characterBox
		newCharacter.append(charImage);
		newCharacter.append(charName);
		//append to #charSelection
		$("#charSelection").append(newCharacter);
	}

	$(".characterBox").on("click", function() {
		localStorage.setItem("userChar", $(this).attr("data-index"));
		location.href = "game.html";
	});
}