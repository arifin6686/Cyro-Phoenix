'use strict';

function replaceAt(str, index, character) {
	return str.substr(0, index) + character + str.substr(index + character.length);
}

const name = "Hangman Bomb";
const data = {
	"Pokemon Moves" : [],
	"Pokemon Items" : [],
	"Pokemon Abilities": [],
};

data["Pokemon Characters"] = Tools.data.characters;
data["Pokemon Locations"] = Tools.data.locations;

for (let i in Tools.data.moves) {
	let move = Tools.data.moves[i];
	if (!move.name || !move.desc) continue;
	data["Pokemon Moves"].push(move.name);
}

for (let i in Tools.data.items) {
	let item = Tools.data.items[i];
	if (!item.name || !item.desc) continue;
	data["Pokemon Items"].push(item.name);
}

for (let i in Tools.data.abilities) {
	let ability = Tools.data.abilities[i];
	if (!ability.name || !ability.desc) continue;
	data["Pokemon Abilities"].push(ability.name);
}

class HangmanBomb extends Games.Game {
	constructor(room) {
		super(room);
		this.name = name;
		this.id = Tools.toId(name);
		this.answer = null;
		this.points = new Map();
		this.categories = Object.keys(data);
		this.guessedLets = [];
		this.guessedWords = [];
		this.category = null;
		this.curGuesses = new Map();
		this.round = 0;
	}

	onStart() {
		if (this.playerCount < 2) {
			this.room.say("The game needs at least two players to start!");
			this.end();
			return;
		}
		this.askQuestion();
	}

	onJoin(user) {
		this.points.set(this.players[user.id], 5);
	}

	onLeave(user) {
		let player = this.players[user.id];
		this.points.delete(player);
		this.curGuesses.delete(player);
	}

	nextLetter() {
		let realAnswer = this.answer;
		this.answer = this.answer.toLowerCase();
		let str = Array(this.answer.length + 1).join("_");
		let badstr = [];
		for (let i = 0, len = this.answer.length; i < len; i++) {
			if (this.answer[i] === ' ' || this.answer[i] === '-') {
				str = replaceAt(str, i, '/');
			}
		}
		for (let letter in this.guessedLets) {
			let found = false;
			for (let i = 0, len = this.answer.length; i < len; i++) {
				if (this.answer[i] === this.guessedLets[letter]) {
					str = replaceAt(str, i, realAnswer.charAt(i));
					found = true;
				}
			}
			if (!found) {
				badstr.push(this.guessedLets[letter]);
			}
		}
		for (let i in this.guessedWords) {
			badstr.push(this.guessedWords[i]);
		}
		if (this.round !== 0) {
			for (let userID in this.players) {
				if (!userID) {
					continue;
				}
				let player = this.players[userID];
				let guess = this.curGuesses.get(player);
				let points = this.points.get(player);

				if (guess !== "" && (!guess || guess.length > 1 || (guess.length === 1 && this.answer.split(guess).length === 1))) {
					points--;
					this.points.set(player, points);
					if (points === 0) {
						this.playerCount--;
						player.say("You have lost all of your lives!");
						delete this.players[userID];
					}
				}
				this.curGuesses.delete(player);
			}
		} else {
			this.round++;
		}
		if (this.playerCount === 0) {
			this.room.say("The correct answer was: __" + realAnswer + "__");
			this.room.say("No winners this game! Better luck next time!");
			this.end();
			return;
		}
		if (this.playerCount === 1) {
			this.room.say("The correct answer was: __" + realAnswer + "__");
			this.room.say("**Congratulations**! " + this.players[Object.keys(this.players)[0]].name + " has won the game!");
			this.end();
			return;
		}
		this.room.say(str.split("").join(" ") + " | **" + this.category + "** | " + badstr.join(", "));
		this.answer = realAnswer;
		this.timeout = setTimeout(() => this.nextLetter(), 10 * 1000);
	}
	askQuestion() {
		this.round = 0;
		let players = [];
		for (let userID in this.players) {
			players.push(this.players[userID].name + ": (" + this.points.get(this.players[userID]) + "♥)");
		}
		this.curGuesses.clear();
		this.guessedLets = [];
		this.guessedWords = [];
		this.category = this.categories[Math.floor(Math.random() * this.categories.length)];
		this.answer = data[this.category][Math.floor(Math.random() * data[this.category].length)];
		this.room.say("**Players (" + this.playerCount + ")**: " + players.join(", "));
		this.nextLetter();
	}
	guess(guess, user) {
		let userID = user.id;
		let player = this.players[userID];
		if (!player) {
			return;
		}
		if (this.curGuesses.get(player)) {
			return;
		}
		guess = Tools.toId(guess);
		if (guess.length === 1) {
			if (this.guessedLets.indexOf(guess) === -1) {
				this.guessedLets.push(guess);
				this.curGuesses.set(player, guess);
			}
		} else {
			if (this.guessedWords.indexOf(guess) === -1) {
				this.guessedWords.push(guess);
				this.curGuesses.set(player, guess);
			}
		}
		if (guess === Tools.toId(this.answer)) {
			clearTimeout(this.timeout);
			let points = this.points.get(player);
			points += 1;
			this.points.set(player, points);
			this.room.say("**Correct**! " + user.name + " guessed the correct answer and gained one life! (Answer: __" + this.answer + "__)");
			this.answer = null;
			this.timeout = setTimeout(() => this.askQuestion(), 5 * 1000);
		}
	}
}

exports.name = name;
exports.id = "hangmanbomb";
exports.description = "A variation of hangman in which each player starts with 5 lives - if you guess the answer, you gain a life, but with every wrong guess you lose a life. Last survivor wins!";
exports.game = HangmanBomb;