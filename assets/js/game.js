window.onload = function() {
    var isCharChosen = false;
    var mkMusic = $("<audio>");
    mkMusic.attr("src", "assets/sounds/mktheme.mp3")
    //https://stackoverflow.com/questions/3273552/html5-audio-looping
    if (typeof mkMusic.loop === "boolean") {
        mkMusic = true;
    } else {
        mkMusic[0].addEventListener("ended", function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    //end loop code
    mkMusic[0].play();

    //setup fight screen
    var userCharIndex = localStorage.getItem("userChar")
    $("#userCharImg").attr("src", charList[userCharIndex].img);
    $("#userCharImg").attr("data-index", userCharIndex);
    for (var i = 0; i < charList.length; i++) {
        if (i != userCharIndex) {
            var newChar = $("<img>");
            newChar.addClass("img-responsive img-responsive-center remainingChars");
            newChar.attr("src", charList[i].img);
            newChar.attr("data-index", i);
            $("#remainingCharList").append(newChar);
        }
    }

    $(".remainingChars").on("click", function() {
        if (!isCharChosen) {
            $("#noOpponent").css("display", "none");
            $("#compCharImg").attr("src", $(this).attr("src"));
            $("#compCharImg").attr("data-index", $(this).attr("data-index"));
            $(this).remove();
            isCharChosen = true;
        }
    });
}