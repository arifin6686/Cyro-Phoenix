/**
 * Example game
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * This file contains example code for a game (Trivia)
 *
 * @license MIT license
 */


'use strict';

function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
const name = "Miltank's Metronome Mayhem";
const data = {};

for (let i in Tools.data.moves) {
	let move = Tools.data.moves[i];
	if (!move.boosts || !move.name) continue;
	if (move.name === "Hone Claws" || move.name === "Double Team" || move.name === "Coil" || move.name === "Flash" || move.name === "Kinesis" || move.name === "Dragon Dance" || move.name === "Quiver Dance" || move.name === "Geomancy" || move.name === "Shell Smash" || move.name === "Curse" || move.name === "Aromatic Mist" || move.name === "Charge" || move.name === "Cosmic Power" || move.name === "Defend Order" || move.name === "Magnetic Flux" || move.name === "Silver Wind" || move.name === "Calm Mind" || move.name === "Stockpile" || move.name === "Flower Shield" || move.name === "Rototiller" || move.name === "Shift Gear" || move.name === "Tail Glow" || move.name === "Cotton Guard" || move.name === "Belly Drum") continue;
	data[i] = move;
}

class MMM extends Games.Game {
	constructor(room) {
		super(room);
		this.id = Tools.toId(name);
		this.answers = null;
		this.points = new Map();
		this.maxPoints = 5;
		this.information = Object.keys(data);
		this.questions = [];
		for (let i = 0, len = this.information.length; i < len; i++) {
			this.questions[this.information[i]] = Object.keys(data[this.information[i]]);
		}
	}

	onStart() {
		this.askQuestion();
	}

	askQuestion() {
		if (this.answers) {
			let answers = this.answers.length;
			this.say("Time's up! The answer" + (answers > 1 ? "s were" : " was") + " __" + this.answers.join(", ") + "__");
		}
		this.answers = [];
		let question = data[shuffle(Object.keys(data))[0]], array1 = [], array2 = [];
		//Because there is only one Object in the "data" constant defined earlier, there is no need for the let category line as the category I'll be extracting data from each time will be the same. I've therefore removed every instance of category from the brackets in the lines above and below this comment and replaced them with "Pokemon" as that is the only Object.
		for (let i in question.boosts) {
			array1.push(question.boosts[i]);
			if (i === "atk") {let atk1 = "Attack"; array2.push(atk1);}
			if (i === "def") {let def1 = "Defense"; array2.push(def1);}
			if (i === "spa") {let spa1 = "Special Attack"; array2.push(spa1);}
			if (i === "spd") {let spd1 = "Special Defense"; array2.push(spd1);}
			if (i === "spe") {let spe1 = "Speed"; array2.push(spe1);}
			if (i === "accuracy") {let acc1 = "Accuracy"; array2.push(acc1);}
			if (i === "evasion") {let eva1 = "Evasion"; array2.push(eva1);}
		}
		if (array1.length === 1) this.say("Miltank randomly selected **" + question.name + "!**" + (question.target === "self" ? " Its " : " Your ") + array2[0] + " was " + (question.target === "self" ? "raised" : "lowered") + " by " + (array1[0] === 1 || array1[0] === -1 ? "1 stage!" : "2 stages!"));
		if (array1.length > 1) this.say("Miltank randomly selected **" + question.name + "!**" + (question.target === "self" ? " Its " : " Your ") + array2[0] + " and " + array2[1] + " was " + (question.target === "self" ? "raised" : "lowered") + " by **" + (array1[0] === array1[1] ? "1** stage!" : array1[0] + "** / ** " + array1[1] + " stages!"));
		for (let i in data) {
			let move = data[i];
			let booster = move.boosts;
			if (!booster) continue;
			let bad = false;
			for (let j in question.boosts) {
				if (!booster[j]) {
					bad = true;
					break;
				} else if (booster[j] + question.boosts[j] !== 0) {
					bad = true;
				}
			}
			if (bad) continue;
			for (let j in booster) {
				if (!question.boosts[j]) {
					bad = true;
					break;
				} else if (booster[j] + question.boosts[j] !== 0) {
					bad = true;
				}
			}
			if (bad) continue;
			this.answers.push(move.name);
		}
		this.timeout = setTimeout(() => this.askQuestion(), 10 * 1000);
	}

	guess(guess, user) {
		if (!this.answers) return;
		guess = Tools.toId(guess);
		let correct = false;
		for (let i = 0, len = this.answers.length; i < len; i++) {
			if (Tools.toId(this.answers[i]) === guess) {
				correct = true;
				break;
			}
		}
		if (!correct) return;
		clearTimeout(this.timeout);
		if (!(user.id in this.players)) this.addPlayer(user);
		let player = this.players[user.id];
		let points = this.points.get(player) || 0;
		points += 1;
		this.points.set(player, points);
		if (points >= this.maxPoints) {
			this.say("Correct! " + user.name + " wins the game! (Answer" + (this.answers.length > 1 ? "s" : "") + ": __" + this.answers.join(", ") + "__)");
			this.end();
			return;
		}
		this.say("Correct! " + user.name + " advances to " + points + " point" + (points > 1 ? "s" : "") + ". (Answer" + (this.answers.length > 1 ? "s" : "") + ": __" + this.answers.join(", ") + "__)");
		this.answers = null;
		this.timeout = setTimeout(() => this.askQuestion(), 5 * 1000);
	}
}

exports.name = name;
exports.id = "mmm";
exports.description = "Guess Pokemon based on the given attacks.";
exports.game = MMM;