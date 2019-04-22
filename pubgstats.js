
var loaded = false;
var lastGame = "";

document.onload =  function() {loaded = true};
mode = function(name) {
	this.NAME = name;
	this.kills = 0;
	this.games = 0;
	this.damage = 0;
	this.wins = 0;
	this.distance = 0;
	this.total_rank = 0;
	this.total_top_ten = 0;
}

var squad_fpp = new mode("squad_fpp");
var duo_fpp = new mode("squad_fpp");
var solo_fpp = new mode("solo_fpp");



var timer = setInterval(function() {
    var btn = document.getElementsByClassName("total-played-game__btn total-played-game__btn--more")[0];
    
    if(btn == null) { 
        clearInterval(timer);
        cont();
    }
    btn.click();
},500);

function cont() {
	var divs = document.getElementsByClassName("matches-item__summary");
	for(var i = 0; i < divs.length;i++) {
		var mode_id = divs[i].children[0].children[0].children[0].innerText;
		console.log(mode_id);
		// wrong, this is only for mode var elem = divs[i].children[0].children[0];	//	Gets div for each map
		var elem = divs[i];
		if(mode_id == "Squad FPP") {
			parseInfo(elem,squad_fpp);
			
		} else if(mode_id == "Duo FPP") {
			parseInfo(elem,duo_fpp);
		} else if(mode_id == "Solo FPP") {
			parseInfo(elem,solo_fpp);
		}
	}
	var str = "";
	str += createString(squad_fpp);
	str += createString(duo_fpp);
	str += createString(solo_fpp);
	document.body.innerHTML = str.replace(/\n/g,"</br>");
	console.log(str);
	
	
	
}

function createString(mode) {
	var str = "";
	str += "Mode: " + mode.NAME + "\n";
	str += "\tTotals:\n";
	str+= "\tGames:" + mode.games +"\n";
	str += "\t\tWins: " + mode.wins + "\n";
	str += "\t\tKills: " + mode.kills + "\n";
	str += "\t\tDamage: " + mode.damage + "\n";
	str += "\t\tDistance: " + mode.distance + "km\n";
	
	str += "\n\tAverage:\n";
	str += "\tKills: " + (mode.kills / mode.games+ "\n");
	str += "\t\tDamage: " + (mode.damage / mode.games+ "\n");
	str += "\t\tDistance: "+ (mode.distance / mode.games+ "km\n");
	str += "\t\tWin Rate: "+ (mode.wins / mode.games) * 100 + "%\n";
	str += "\t\tPercent top 10: " + (mode.total_top_ten / mode.games) * 100 +"%\n";
	str += "\t\tPlacement: " + (mode.total_rank / mode.games) + "\n\n";
	return str;
}

function parseInfo(elem,mode) {
	var ranked = true;
	if(elem.getElementsByClassName("matches-item__value").length == 4) {
		
		ranked = false;
	}
	
	var cont = {
		rank: getRank(elem,ranked),
		kills: getKills(elem,ranked),
		damage: getDamage(elem,ranked),
		distance: getDistance(elem,ranked)
	}
	if(cont.kills != 0) console.log(cont.kills);
	if(cont.rank == 1) mode.wins++;
	if(cont.rank <11) mode.total_top_ten++;
	mode.games++;
	mode.total_rank += cont.rank;
	mode.distance += cont.distance;
	mode.damage += cont.damage;
	mode.kills += cont.kills;
	
}
function getRank(elem,ranked) {
	
	var str = elem.getElementsByClassName("matches-item__my-ranking")[0].innerText.replace("#","");
	return parseInt(str);
}

function getKills(elem,ranked) {
	var index = 0;
	if(!ranked) index++;
	var div = elem.getElementsByClassName("matches-item__value")[index].innerText;
	return parseInt(div);
}

function getDamage(elem,ranked) {
	var index = 1;
	if(!ranked) index++;
	var div = elem.getElementsByClassName("matches-item__value")[index].innerText;
	return parseInt(div);
}

function getDistance(elem,ranked) {
	var index = 2;
	if(!ranked) index++;
	var div = elem.getElementsByClassName("matches-item__value")[index].innerText;
	return parseFloat(div);
}