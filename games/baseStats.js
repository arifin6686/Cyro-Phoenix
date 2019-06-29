'use strict';

const name = "Pupitar's Power Placement";

const data = {};
const goodBP = [];
for (let i in Tools.data.moves) {
	let move = Tools.data.moves[i];
	if (!move.basePower) continue;
	data[i] = move.basePower;
	if (goodBP.indexOf(move.basePower) === -1) {
		goodBP.push(move.basePower);
	}
}

class Pupitars extends Games.Game {
	constructor(room) {
		super(room);
		this.name = name;
		this.id = Tools.toId(name);
		this.answers = [];
		this.points = new Map();
		this.maxPoints = 5;
	}

	onStart() {
		this.askQuestion();
	}

	askQuestion() {
		if (this.answers.length > 0) {
			let answers = this.answers.length;
			this.say("Time's up! The answer" + (answers > 1 ? "s were" : " was") + " __" + this.answers.join(", ") + "__");
		}
		this.answers = [];
		let number = Math.floor(Math.random() * 140) + 10;
		let dist = Math.abs(goodBP[0] - number);
		let minindex = 0;
		for (let i = 1; i < goodBP.length; i++) {
			let curDist = Math.abs(goodBP[i] - number);
			if (curDist < dist) {
				dist = curDist;
				minindex = i;
			}
		}
		let bestBP = goodBP[minindex];
		for (let i in data) {
			if (data[i] === bestBP) {
				this.answers.push(i);
			}
		}
		this.room.say("The current base power is: **" + number + "**");
		this.timeout = setTimeout(() => this.askQuestion(), 10 * 1000);
	}

	guess(guess, user) {
		if (this.answers.length === 0) return;
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
		this.answers = [];
		this.timeout = setTimeout(() => this.askQuestion(), 5 * 1000);
	}
}

exports.name = name;
exports.id = "ppp";
exports.description = "Guess a move with base power as close as possible to that the given power!";
exports.game = Pupitars;