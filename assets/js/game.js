window.onload = function() {
    var isCharChosen = false;
    var userCharIndex = localStorage.getItem("userChar")
    var userAtk = charList[userCharIndex].atkPower;
    var userHealth = charList[userCharIndex].health;
    var compAtk = 0;
    var compHealth = 0;
    var remainingOpps = charList.length - 1;
    var mkMusic = $("<audio>");
    mkMusic.attr("src", "assets/sounds/mktheme.mp3")
    //https://stackoverflow.com/questions/3273552/html5-audio-looping
    if (typeof mkMusic[0].loop === "boolean") {
        mkMusic[0].loop = true;
    } else {
        mkMusic[0].addEventListener("ended", function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    //end loop code
    mkMusic[0].play();

    //setup fight screen
    $("#userCharName").html(charList[userCharIndex].name);
    $("#userCharImg").attr("src", charList[userCharIndex].img);
    $("#userCharHealth").html(userHealth);
    $("#userCharAtk").html(userAtk);
    for (var i = 0; i < charList.length; i++) {
        if (i != userCharIndex) {
            var newChar = $("<img>");
            newChar.addClass("img-responsive img-responsive-center remainingChars");
            newChar.attr("title",
                "Name: " + charList[i].name +
                "\nAttack Power: " + charList[i].ctrAtkPower +
                "\nHealth: " + charList[i].health);
            newChar.attr("src", charList[i].img);
            newChar.attr("data-index", i);
            $("#remainingCharList").append(newChar);
        }
    }
    //end setup of fightscreen

    //select opponent
    $(".remainingChars").on("click", function() {
        if (!isCharChosen) {
            var compCharIndex = $(this).attr("data-index");
            mkMusic[0].volume = 0.5;
            var fight = $("<audio>");
            fight.attr("src", "assets/sounds/fight.mp3");
            fight[0].play();
            var musicVol = setTimeout(function() {
                mkMusic[0].volume = 1;
            }, 1000);
            $("#compCharBox").css("display", "block");
            $("#noOpponent").css("display", "none");
            $("#compCharName").html(charList[compCharIndex].name);
            compHealth = charList[compCharIndex].health;
            $("#compCharHealth").html(compHealth);
            compAtk = charList[compCharIndex].ctrAtkPower;
            $("#compCharAtk").html(compAtk);
            $("#compCharImg").attr("src", charList[compCharIndex].img);
            $("#compCharImg").attr("data-index", $(this).attr("data-index"));
            $(this).remove();
            isCharChosen = true;
        }
    });
    //end select opponent
    //FIGHT!
    $("#fightBtn").on("click", function() {
        if (isCharChosen) {
            $("#fightBtn").html("Fight!")
            var currOpp = $("#compCharImg").attr("data-index");
            //need to use temp variables to hold health values to make sure both attacks go through
            var tempUserHealth = userHealth;
            var tempCompHealth = compHealth;
            //if this attack results in both characters dying, set both health to 0 for tie check later
            if (((compHealth - userAtk) <= 0) && ((userHealth - compAtk) <= 0)) {
                compHealth = 0;
                userHealth = 0;
            }
            //if computer health is greater than users attack, then attack user
            if (compHealth >= userAtk) {
                tempUserHealth -= compAtk;
            }
            //if user health is greater than comps attack, then attack comp
            if (userHealth >= compAtk) {
                tempCompHealth -= userAtk;
                userAtk += 6;
            }
            //reassign new health values to regular vars
            if ((compHealth != 0) && (userHealth != 0)) {
                userHealth = tempUserHealth;
                compHealth = tempCompHealth;
            }
            //check to see if user should die on next attack
            if ((userHealth <= compAtk) && (userHealth > 0)) {
                mkMusic[0].volume = 0.5;
                var finish = $("<audio>");
                if (charList[userCharIndex].sex === "male") {
                    finish.attr("src", "assets/sounds/finishhim.mp3");
                } else if (charList[userCharIndex].sex === "female") {
                    finish.attr("src", "assets/sounds/finishher.mp3");
                }
                finish[0].play();
                var musicVol = setTimeout(function() {
                    mkMusic[0].volume = 1;
                }, 1000);
                $("#fightBtn").html("Die with honor!");
            }
            //check to see if comp will die on next attack
            if ((compHealth <= userAtk) && (compHealth > 0)) {
                mkMusic[0].volume = 0.5;
                var finish = $("<audio>");
                if (charList[currOpp].sex === "male") {
                    finish.attr("src", "assets/sounds/finishhim.mp3");
                    $("#fightBtn").html("Finish Him!");
                } else if (charList[currOpp].sex === "female") {
                    finish.attr("src", "assets/sounds/finishher.mp3");
                    $("#fightBtn").html("Finish Her!");
                }
                finish[0].play();
                var musicVol = setTimeout(function() {
                    mkMusic[0].volume = 1;
                }, 1000);
            }

            $("#userCharHealth").html(userHealth);
            $("#userCharAtk").html(userAtk);
            $("#compCharHealth").html(compHealth);

            //handle if user is dead
            if (userHealth <= 0) {
                $("#userCharBox").css("display", "none");
                $("#userLost").css("display", "block");
                $("#userLost").html(charList[currOpp].name + " wins!");
                $("#remainingCharHead").html("Click here to go back to character selection");
                mkMusic[0].volume = 0.5;
                var fatality = $("<audio>");
                fatality.attr("src", "assets/sounds/fatality.mp3");
                fatality[0].play();
                var musicVol = setTimeout(function() {
                    mkMusic[0].volume = 1;
                }, 1000);
            }
            //handle if comp is dead
            if (compHealth <= 0) {
                if (userHealth > 0) {
                    isCharChosen = false;
                }
                remainingOpps--;
                if (remainingOpps === 0) {
                    $("#noOpponent").html(charList[userCharIndex].name + " wins!");
                    $("#remainingCharHead").html("Click here to go back to character selection");
                }
                $("#compCharBox").css("display", "none");
                $("#noOpponent").css("display", "block");
                mkMusic[0].volume = 0.5;
                var fatality = $("<audio>");
                fatality.attr("src", "assets/sounds/fatality.mp3");
                fatality[0].play();
                var musicVol = setTimeout(function() {
                    mkMusic[0].volume = 1;
                }, 1000);
            }
            //handle if tied!
            if ((userHealth <= 0) && (compHealth <= 0)) {
                $("#userLost").html("It's a tie!");
                $("#noOpponent").html("It's a tie!");
            }
        }
    });
    //end FIGHT!

    //go back to character selection
    $("#remainingCharHead").on("click", function() {
        if ((remainingOpps === 0) || (userHealth <= 0)) {
            location.href = "index.html";
        }
    });
    //end go back to character selection
};