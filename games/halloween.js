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

const name = "Magnezone";
const data = {};
const monForms = {};

for (let i in Tools.data.pokedex) {
	let mon = Tools.data.pokedex[i];
	if (!mon.species) continue;
	let species = mon.species;
	data[species] = {};
	data[species]["Pokemon Types"] = mon.types;
	data[species]["Egg Groups"] = mon.eggGroups;
	data[species]["Color"] = [mon.color];
	if (mon.otherFormes) {
		for (let i = 0, len = mon.otherFormes.length; i < len; i++) {
			monForms[mon.otherFormes[i]] = species;
		}
	}
	if (i in Tools.data.learnsets) {
		data[species]["Pokemon Moves"] = [];
		for (let move in Tools.data.learnsets[i].learnset) {
			data[species]["Pokemon Moves"].push(Tools.data.moves[move].name);
		}
	} else {
		if (i in monForms) {
			data[species]["Pokemon Moves"] = data[monForms[i]]["Pokemon Moves"];
		}
	}
}

class Magnezone extends Games.Game {
	constructor(room) {
		super(room);
		this.name = name;
		this.id = Tools.toId(name);
		this.categories = Object.keys(data["Bulbasaur"]);
		this.mons = new Map();
		this.killers = new Map();
		this.category = null;
		this.curGuesses = new Map();
		this.numKillers = null;
		this.fakeMons = [];
		this.usedParams = [];
	}

	onStart() {
		if (this.playerCount < 2) {
			this.room.say("The game needs at least 2 players to play!");
			this.end();
			return;
		}
		this.askForMons();
	}

	nextRound() {
		let keys = Object.keys(this.mons);
		let curMon, category, param, found, notFound;
		while (!found || !notFound) {
			curMon = this.mons[keys[Math.floor(keys.length * Math.random())]];
			category = this.categories[Math.floor(Math.random() * this.categories.length)];
			param = data[curMon][category][Math.floor(Math.random() * data[curMon][category].length)];
			if (this.usedParams.indexOf(param) !== -1) continue;
			for (let id in this.mons) {
				if (data[this.mons[id]][category].indexOf(param) !== -1) {
					found = true;
				} else {
					notFound = true;
				}
			}
		}

		this.usedParams.push(param);
		this.room.say("The current param is: **" + param + "**");
		let mons = [];
		for (let id in this.mons) {
			mons.push(this.mons[id]);
		}
		mons = mons.concat(this.fakeMons);
		this.room.say("List of pokemon: " + shuffle(mons).join(", "));
		let players = [];
		for (let id in this.players) {
			let player = this.players[id].name + ": ";
			if ((data[this.mons[id]][category].indexOf(param) !== -1 && !this.killers[id]) ||
				(!data[this.mons[id]][category].indexOf(param) !== -1 && this.killers[id])) {
				player += "**T**";
			} else {
				player += "**F**";
			}
			players.push(player);
		}
		this.curGuesses.clear();
		this.room.say("List of Users: " + players.join(", "));
		this.room.say("Use ``" + Config.commandCharacter + "suspect user, mon`` in pms to attempt to lock up a user!");
		this.timeout = setTimeout(() => this.nextRound(), 45 * 1000);
	}

	chooseKillers() {
		let keys = Object.keys(data);
		for (let id in this.players) {
			if (!(id in this.mons)) {
				this.mons[id] = shuffle(keys)[0];
				Users.get(id).say("You did not choose a mon. You were given " + this.mons[id]);
			}
		}
		let numFakes = Math.floor(this.playerCount / 5);
		if (numFakes < 1) numFakes = 1;
		for (let i = 0; i < numFakes; i++) {
			let found = true;
			let mon;
			while (found) {
				mon = shuffle(keys)[0];
				found = false;
				for (let id in this.mons) {
					if (mon === this.mons[id]) {
						found = true;
						break;
					}
				}
			}
			this.fakeMons.push(mon);
		}
		this.room.say("Now handing out player assignments!");
		this.numKillers = Math.floor(((this.playerCount - 1) / 7) + 1);
		let list = [];
		for (let i = 0; i < this.playerCount; i++) {
			list.push(i);
		}
		list = shuffle(list);
		let count = 0;
		for (let id in this.players) {
			let killer = false;
			for (let i = 0; i < this.numKillers; i++) {
				if (count === list[i]) {
					killer = true;
					break;
				}
			}
			if (killer) {
				this.killers[id] = true;
				Users.get(id).say("You have been chosen to be a killer this game!");
			} else {
				Users.get(id).say("You have been chosen to be a regular person this game!");
			}
			count++;
		}
		this.timeout = setTimeout(() => this.nextRound(), 3 * 1000);
	}

	askForMons() {
		for (let id in this.players) {
			Users.get(id).say("Please tell me which Pokémon you would like to be! (Usage: ``" + Config.commandCharacter + "choose <mon>``)");
		}
		this.room.say("Now requesting Pokémon choices!");
		this.timeout = setTimeout(() => this.chooseKillers(), 30 * 1000);
	}

	suspect(user, target, mon) {
		if (!(user.id in this.players)) {
			return;
		}
		if (this.curGuesses.has(this.players[user.id])) {
			user.say("You have already guessed this round!");
			return;
		}
		let targetId = Tools.toId(target);
		this.curGuesses.set(this.players[user.id], targetId);
		if (this.killers[user.id] === this.killers[targetId]) {
			return;
		}

		if (Tools.toId(this.mons[targetId]) === Tools.toId(mon)) {
			user.say("You have successfully killed " + Users.get(target).name);
			Users.get(target).say(user.name + " has killed you!");
			if (this.killers[targetId]) {
				this.numKillers--;
			}
			this.playerCount--;
			if (this.numKillers === 0) {
				this.room.say("All killers have been revealed!");
				this.end();
				return;
			}
			if (this.numKillers === this.playerCount) {
				this.room.say("All regular people have been killed!");
				this.end();
				return;
			}
			delete this.players[targetId];
			delete this.mons[targetId];
			delete this.killers[targetId];
		}
	}

	choose(user, target) {
		if (!(user.id in this.players)) {
			return;
		}
		if (user.id in this.mons) {
			user.say("You have already chosen your Pokémon!");
			return;
		}
		target = Tools.toId(target);
		let species;
		if (Tools.data.pokedex[target]) species = Tools.data.pokedex[target].species;
		if (!species || !(species in data)) {
			user.say("That is not a valid Pokémon!");
			return;
		}
		for (let id in this.mons) {
			if (this.mons[id] === species) {
				user.say("That Pokémon has already been chosen! Please choose another");
				return;
			}
		}
		user.say("You have chosen " + species + "!");
		this.mons[user.id] = species;
	}
}

exports.name = name;
exports.id = "magnezone";
exports.description = "Magnezone's Murder Mystery! Every person chooses a pokemon, after which the bot says which players are killers and which players are regular people. Your goal is to figure out who is which mon based on the params listed. However, for killers the param will always be the opposite of what is stated! Last group surviving (either regular people or killers) wins.";
exports.game = Magnezone;