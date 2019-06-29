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

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

const name = "Chimecho's Stat School";
const data = {};

for (let i in Tools.data.pokedex) {
	let mons = Tools.data.pokedex[i];
	if (!mons.species || !mons.baseStats) continue;
	data[mons.species] = mons.baseStats;
}

class CSS extends Games.Game {
	constructor(room) {
		super(room);
		this.name = name;
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
		let question = data[shuffle(Object.keys(data))[0]];
		//Because there is only one Object in the "data" constant defined earlier, there is no need for the let category line as the category I'll be extracting data from each time will be the same. I've therefore removed every instance of category from the brackets in the lines above and below this comment and replaced them with "Pokemon" as that is the only Object.
		for (let i in data) {
			let mons = data[i];
			if (mons.hp === question.hp && mons.atk === question.atk && mons.def === question.def && mons.spa === question.spa && mons.spd === question.spd && mons.spe === question.spe) {
				this.answers.push(i);
			}
		}
		//The above for loop checks the entire pokedex to see if there is a pokemon with identical stat distribution to the question. For instance, if the question is 95/23/48/23/48/23, the for loop will return with Wynaut, because it is the only Pokemon to have that distribution, but if the question was 100/100/100/100/100/100, the for loop will return with 6 different answers, seeing as there are 6 Pokemon with that distribution.
		this.say("**Stats**: " + question.hp + " / " + question.atk + " / " + question.def + " / " + question.spa + " / " + question.spd + " / " + question.spe);
		this.timeout = setTimeout(() => this.askQuestion(), 20 * 1000);
		//The timer has been increased to 20 seconds for this game
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
exports.id = "css";
exports.description = "Guess Pokemon based on the given Base Stats.";
exports.game = CSS;