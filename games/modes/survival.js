
/**
 * Survival
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * This file contains code for the game mode Survival
 *
 * @license MIT license
 */
​
'use strict';
​
const name = 'Survival';
const id = Tools.toId(name);
​
/**@augments Game */
class SurvivalGame {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.name = game.name + ' ' + name;
    this.id = game.id + id;
    this.freeJoin = false;
    this.playerList = [];
    this.survivalRound = 0;
    this.roundTime = 9000;
    this.hint = '';
    /**@type {Array<string>} */
    this.answers = [];
    /**@type {?NodeJS.Timer} */
    this.timeout = null;
  }
​
  onSignups() {}
​
  onStart() {
    this.nextRound();
  }
​
  onNextRound() {
    if (!this.playerList.length) {
      if (this.getRemainingPlayerCount() < 2) {
        this.end();
        return;
      }
      this.survivalRound++;
      this.say("/wall Round " + this.survivalRound + (this.survivalRound > 1 ? " | Remaining players: " + this.getPlayerNames(this.getRemainingPlayers()) : ""));
      this.playerList = this.shufflePlayers();
      if (this.roundTime > 1000) this.roundTime -= 500;
    }
    let currentPlayer = this.playerList.shift();
    while (currentPlayer && currentPlayer.eliminated) {
      currentPlayer = this.playerList.shift();
    }
