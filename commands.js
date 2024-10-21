/**
 * Commands
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * This file contains the base commands for Cassius.
 *
 * @license MIT license
 */

'use strict';
const gifts = ["A new pair of pants", "A hug C:", "The new copy of sun and moon you were hoping for!", "a chocolate", "a pikachu!", "a pillow lol", "a macbook", "an iphone", "a suitcase", "whatever you want-", "a special room", "a private jet!"];
const jokes = ["How does a tree go? It leaves.",
			  "Why didn't the skeleton go to the party? He had no-body to dance with!",
			  "Why didn't the skeleton cross the road? Because he didn't have the guts!",
			   '"Somebody told me you remind them of an owl." "Who?"',
			   "How do you make an octopus laugh? With ten-tickles!",
			   "What's an octupus' favorite dessert? Octo-pi!",
			   "This joke is like a bar at a wedding; it has no punchline.",
			   'There were two twins named Juan and Amal. I saw a picture of Juan, and wanted to see Amal to compare them, but my friend said, "once you\'ve seen Juan you\'ve seen Amal.',
			   "What do you call an alligator in a vest? An investigator!",
			   "Whats a ghosts favorite fruit? Booberries.",
			   "Whats a vampires favorite fruit? Necktarines.",
			   "What do you get when you cross a snowman and a vampire? Frostbite.",
			   "What do you call it when you Santa stops moving? Santa Pause.",
	                   "Why do we tell actors to 'break a leg?' Because every play has a cast.",
			   "Helvetica and Times New Roman walk into a bar.'Get out of here!' shouts the bartender. 'We don’t serve your type.'",
	                   "Hear about the new restaurant called Karma? There’s no menu: You get what you deserve.",
	      " What do you call a boomerang that won’t come back? A stick",
	      "What musical instrument is found in the bathroom? a tuba toothpaste", 
	      "Where would you find an elephant? the same place where you lost her.",
	      "How do you get a squirrel to like you? act like a nut!",
	      "Dogs don't operate MRI machines. But catscan.
",
"Why did the man propose to the woman working at the zoo? Coz She is a keeper!",
	      "What did the skillet eat on its birthday? Pan cakes.",
"Why shouldn’t you fall in love with a pastry chef? He’ll dessert you!",
	      "I was going to try an all almond diet, but that's just nuts."];
const funnyquote = ["Someone just farted! maybe its me!",
                  "What is the best thing to do when you have a hole in a boat and water is leaking inside? Make another hole to drain the water",
                   "I finally realized that people are prisoners of their phones... that's why it's called a 'cell' phone.",
                   "Your secrets are safe with me... I wasn't even listening.",
                   "Dear Math, please grow up and solve your own problems, I'm tired of solving them for you.",
                   "Did you just fall? No, I was checking if gravity still works.",
                   "It takes real skills to choke on air, fall up the stairs and trip over nothing. I have those skills.",
                   "There are a 100 billions nerves in the human body, and there are people who have the ability to irritate all of them.",
                   "I'm always in a rush to go home, and do absolutely nothing.",
                   "Just once I'd like to wake up, turn on the news, and hear 'Monday has been cancelled', and then go back to sleep.",
                   "I like to take rest. I am tired of taking rest and so I am taking rest from rest."];
const song = ["You need to calm down- Taylor Swift",
             "Stitches - Shawn Mendes",
             "Treat You Better - Shawn Mendes",
             "Mercy - Shawn Mendes",
             "Girls Like You - Maroon 5",
             "Blank Space - Taylor Swift",
             "Believer - Imagine Dragons",
             "Sucker - Jonas Brothers",
             "Rewrite The Stars - Zac Efron",
	     "Baby - Justin Biever",
	     "Love Yourself - Justin Bieber",
	     "Never gonna give you up - Rick Astley",
	     "STAY - The Kid LAROI & Justin Bieber",
	     "34+35 - Ariana Grande",
	     "I want it that way! - Backstreet Boys",
	     "All of me - John Legend",
	     "Destination - Crash Adams",
	     "Give me a kiss - Crash Adams",
	     "Forget me - Lewis Capaldi",
	     "There's nothing holding me back - Shawn Mendes",
	     "Someone you loved - Lewis Capaldi",
	     "You are the reason - Calum SCott",
	     "Love me like you do! - Ellie Goulding",
	     "Friends - Anne Marie",
	     "2002 - Anne Marie",
	     "Swala - Jason Derulo",
	     "Memories - Maroon 5",
	     "At my worst - Pink Sweat"];
const roast = ["Scientists say the universe is made up of neutrons, protons and electrons. They forgot to mention morons.",
               "I’m sorry, was I meant to be offended? The only thing offending me is your face.",
              "Someday you’ll go far… and I hope you stay there.",
              "Stupidity’s not a crime, so you’re free to go.",
              "No, those pants don’t make you look fatter – how could they?",
              "What’s the difference between your girlfriend and a walrus? One has a moustache and smells of fish and the other is a walrus.",
              "Save your breath – you’ll need it to blow up your date.",
              "You’re not stupid; you just have bad luck when thinking."];
const welcome = ["Welcome to the best server! Hope u enjoy! make friends and chill and do many more interesting thingS!"]
const wyr = ["Would you rather : Be a lion or a tiger?",
            "Would you rather : Lose the ability to read or lose the ability to speak?",
            "Would you rather : Have a golden voice or a silver tongue?",
            "Would You rather : Always be 10 minutes late or always be 20 minutes early",
	    "Would You rather : Be a noob or a pro?",
	     "Would You rather : eat chocolate or burger? (weird options, ikr) ",
	     "Would You rather : play fornite or pubg?",
	     "Would You rather : go for a vacation or study whole night?",
	     "Would You rather : play pokemon go or pokemon unite?"];

const byemsg = ['Bye!, Make sure to come back once at least...', 'Buh-Bye!', 'See ya mate! ttyl', 'Cya!'];


// Users who use the settour command when a tournament is already
// scheduled will be added here and prompted to reuse the command.
// This prevents accidentally overwriting a scheduled tournament.
/**@type {Map<string, string>} */
let overwriteWarnings = new Map();

/**@type {{[k: string]: Command | string}} */
let commands = {
	// Developer commands
	js: 'eval',
	eval: function (target, room, user) {
		if (!user.isDeveloper()) return;
		try {
			target = eval(target);
			this.say(JSON.stringify(target));
		} catch (e) {
			this.say(e.name + ": " + e.message);
		}
	},
  
  compare: function (target, room, user) {
            if(!user.hasRank(room, '+') && !user.isDeveloper()) return;
             let splitStr = target.split(",");
		if (splitStr.length !== 2) return;
		let comparing = Tools.sampleMany(splitStr,2)
            let better,than;
            better =  comparing[0];
            than = comparing[1];            
            this.say(better + "  is far better than " + than + "!!!");
            
        },
        
  
  
  say: function(target, room, user){
    if(!user.isDeveloper()) return;
    this.say(target);
  },
  
  
	dab: function (target, room, user) {
        if (room !== user && !user.hasRank(room, '+')) return;
        room.say("/me dabs on " + target);
    },
  hug: function (target, room, user) {
        if (room !== user && !user.hasRank(room, '+')) return;
        room.say("/me hugs " + target);
    },
  
  reverseio: function(target, room, user){
    let str = target;
    
    var n = str.includes("!");
    if(n)
    {return this.say("you cant use ! in your sentence");
    }
        var m = str.includes("/");
    if(m)
    {return this.say("you cant use / in your sentence");
    }
     var splitString = str.split("");
    var reverseArray = splitString.reverse();
      var joinArray = reverseArray.join("");
    
     if(joinArray == target) {
       return this.say("you spotted a palindrome! " + joinArray);}
    return this.say(joinArray);
  },
	wyr: function (target,room,user ) {
    if (!user.isDeveloper() && !user.hasRank(room, '+') && (!Games.host || Games.host.id !== user.id)) return;
  room.say(Tools.sample(wyr));
  },

	byemsg: function (target,room,user ) {
    if (!user.isDeveloper() && !user.hasRank(room, '+') && (!Games.host || Games.host.id !== user.id)) return;
  room.say(Tools.sample(byemsg));
  },
  
  
   calculate: function(target, room, user){
     let myArray;
    if(target.includes('+')){
      myArray = target.split('+');
      this.say(math.add(myArray[0],myArray[1]));
    }
    if(target.includes('-')){
      myArray = target.split('-');
      this.say(math.substract(myArray[0],myArray[1]));
    } 
     if(target.includes('*')){
      myArray = target.split('*');
      this.say(math.mult(myArray[0],myArray[1]));
    }
     
     if(target.includes('/')){
      myArray = target.split('/');
      this.say(math.div(myArray[0],myArray[1]));
    }
  },
  
  selfpc: function(target,room, user) {
    if (!user.isDeveloper() && !user.hasRank(room, '@'));
        this.say("/addhtmlbox <h3>Pratik seems to be the coolest nerd</h3>");
  },
  rpsrock: function (target, room, user) {
          if(!(room instanceof Users.User) && !user.hasRank(room, '+')) return;
          var rate = Math.floor((Math.random() * 10) + 1);
          if(rate == 1){
          this.say("Paper! I won!");
          }
    else if(rate == 4){
          this.say("Rock! Its a draw! ohooo");
      }
    else{
      this.say("Scissors! Oops, I lose!");
    }},
  rpspaper: function (target, room, user) {
          if(!(room instanceof Users.User) && !user.hasRank(room, '+')) return;
          var rate = Math.floor((Math.random() * 10) + 1);
          if(rate == 1){
          this.say("Paper! Its a draw! ohooo!");
          }
    else if(rate == 4){
          this.say("Rock! Oops , I lose!");
      }
    else{
      this.say("Scissors! I won!");
    }},
  rpsscissors: function (target, room, user) {
          if(!(room instanceof Users.User) && !user.hasRank(room, '+')) return;
          var rate = Math.floor((Math.random() * 10) + 1);
          if(rate == 1){
          this.say("Rock! I won!");
          }
  else if(rate == 4){
          this.say("Paper! Oops , I lose!");
      }
      else{
      this.say("Scissors! Its a draw! ohooo");
    }},
  discord: function (target,room ,user) {
    this.say ("Yo! Dont forget to join our Server's Discord! Link- https://discord.gg/GRpa3t");
  },
	git: function (target,room,user) {
    this.say ("The Bot Of Arifin is made by Sir Arifin. Link- https://github.com/Arifin6686/Cyro-Phoenix")
  },
  
  selfamy: function (target,room,user) {
    if (!user.isDeveloper() && !user.hasrank(room, '@'));
    this.say("/addhtmlbox <h3>Ameena : I am not afraid to walk this world alone.</h3>");
  },
  kden: function (target,room, user) {
    this.say("Ok then");
  }, 
  arifin: function (target, room, user) {
     this.say("Arifin is like The God to me! Better ~~dont~~ believe that");
   }, 
  rpshelp: function (target,room,user) {
    this.say ("Just do +rock, +paper or +scissors and check it out!")
  },
  
  uptime: function (target, room, user, pm) {
		let uptime = process.uptime();
		let uptimeText;
		if (uptime > 24 * 60 * 60) {
			let uptimeDays = Math.floor(uptime / (24 * 60 * 60));
			uptimeText = uptimeDays + " " + (uptimeDays === 1 ? "day" : "days");
			let uptimeHours = Math.floor(uptime / (60 * 60)) - uptimeDays * 24;
			if (uptimeHours) uptimeText += ", " + uptimeHours + " " + (uptimeHours === 1 ? "hour" : "hours");
		} else {
			uptimeText = Tools.toDurationString(uptime * 1000);
		}
		this.say("Uptime: **" + uptimeText + "**");
	},
  kill: function (target, room, user) {
    if (!user.isDeveloper()) return false;
	  console.log('Killed by ' + user.name);
	  process.exit(-1);
        },
  developer: function (target,room, user) {
    if (!user.isDeveloper() && !user.hasRank(room, '@'));
        this.say("/addhtmlbox <h3>My Master (A_R_I_F_I_N) is awesome at coding! :D Better believe that :D</h3>");
   },

  
   ping: {
    command(target, room, user) {
      if (!(room instanceof Users.User) && !user.hasRank(room, "+")) return;
      var rate = Math.floor((Math.random() * 10) + 1);
      if (rate == 1) {
        this.say("You win");
      } else if (rate == 4) {
        this.say("You lose");
      } else {
        this.say("Pong!");
      }
    }
  },
	
 vibe: {
    command(target, room, user){
      if (room instanceof Users.User || !user.hasRank(room, '+')) return;
      let rate = Math.floor(Math.random() * 100 + 1);
      let vibe = '<img src="https://cdn.discordapp.com/emojis/682731600479518730.gif" alt="vibe" height="60" width="60"/>';
      room.say("/adduhtml vibe, " + vibe.repeat(rate));
    },
  },
  j: 'judge',
        judge:  function (target, room, user) {
        var judgement = [" is so cute"," is the worst!!!"," is um eh not bad "," is the best"," is ok","nothing"];
        var rand = Math.floor((Math.random() * 4) + 1); 
        if (!["!", "/"].includes(target.charAt(0))) 
        this.say(target.split('/') + judgement[rand]);
        },
  codingskills: function (arg, user, room) {
          if (!arg) return this.say('You didn\'t specify a person');
          this.say('Analysing the coding skills of the person. ' + 'Checking , so wait! It takes time bruh! lelelol')
          var x = Math.floor((Math.random() * 500) + 1);
          this.say('The coding skills of ' + arg + ' ' +'is :  ' +   x );
         
        },
  iq: function (arg, user, room) {
          if (!arg) return this.say('You didn\'t specify a person');
          this.say('Analysing the IQ of the person. ' + 'Give me a few moments.......')
          var x = Math.floor((Math.random() * 200) + 1);
          this.say('The iq of ' + arg + ' ' +'is :  ' +   x );
         
        },
  
  
deva: function (target,room, user) {
    if (!user.isDeveloper() && !user.hasRank(room, '@'));
        this.say("/addhtmlbox <h3>My Master (A_R_I_F_I_N) is awesome at coding! :D Better believe that :D</h3>");
   },

  gift: function (target, room, user) {
    
		if(!target) return;
		this.say("Inside " + target + "'s gift is ..." + Tools.sample(gifts));
	},
	roast: function (target, room, user) {
    
		if(!target) return;
		this.say(target + "," + " " + Tools.sample(roast));
	},
  welcome: function (target, room, user) {
    
		if(!target) return;
		this.say(target + "!" + " " + Tools.sample(welcome));
	},
	joke: function (target, room, user) {
		if (!user.isDeveloper() && !user.hasRank(room, '+') && (!Games.host || Games.host.id !== user.id)) return;
		room.say(Tools.sample(jokes));
	},      
  randsong: function (target, room, user) {
		if (!user.isDeveloper() && !user.hasRank(room, '+') && (!Games.host || Games.host.id !== user.id)) return;
		room.say(Tools.sample(song));
	},      
  
 funnyquote: function (target, room, user) {
		if (!user.isDeveloper() && !user.hasRank(room, '+') && (!Games.host || Games.host.id !== user.id)) return;
		room.say(Tools.sample(funnyquote));
	},      
  
  c: 'roomsay',
  roomsay: function (target, room, user) {
		if (!user.isDeveloper()) return;
		let splitStr = target.split(",");
		if (splitStr.length !== 2) return;
		let realroom = Rooms.get(splitStr[0]);
		if (!realroom) return;
		realroom.say(splitStr[1]);
	},
  
  jr:'joinroom',
  joinroom: function (target,room, user){
    if (!user.isDeveloper() || !(room instanceof Users.User) && !user.hasRank(room, '+')) return;
  
    this.say("/join " + target);
  },
  
  
  pick: function (target, room, user) {
		if (!user.hasRank(room, '+') && (!Games.host || Games.host.id !== user.id)) return;
		if (Users.self.hasRank(room, '*')) {
			let stuff = target.split(",");
			let str = "<em>We randomly picked:</em> " + Tools.sample(stuff);
				
			if (room.id === 'developmen') {
				room.say("/addhtmlbox " + str);
			} else {
				room.say("!htmlbox " + str);
			}
		}
		else {
			this.say("!pick " + target);
		}
	},
  
  
  timer: function (target, room, user) {
		if (!user.hasRank(room, '+') && (!Games.host || Games.host.id !== user.id)) return;
		let x = Math.floor(target);
		if (!x || x >= 120 || (x < 10 && x > 2) || x <= 0) return room.say("The timer must be between 10 seconds and 2 minutes.");
		if (x === 1) x = 60;
		let minutes = Math.floor(x / 60);
		let seconds = x % 60;
		clearTimeout(Games.timeout);
		this.say("Timer set for " + (minutes > 0 ? "1 minute" + (seconds > 0 ? " and " : "") : "") + (seconds > 0 ? ((seconds) + " second" + (seconds > 1 ? "s" : "")) : "") + ".");
		setTimeout(() => this.say("Times Up!"), x * 1000);
	},
	
	helix: "8ball",
  "8ball": {
    command(target, room, user) {
      if (!(room instanceof Users.User) && !user.hasRank(room, "+")) return;
      let cases = [
        "Signs point to yes.",
        "Yes.",
        "Reply hazy,try again.",
        "Without a doubt.",
        "My sources say no.",
        "As I see it, yes.",
        "You may rely on it.",
        "Concentrate and ask again.",
        "Outlook not so good.",
        "It is decidedly so.",
        "Very doubtful.",
        "Better not tell you now.",
        "Yes - definitely.",
        "It is certain.",
        "Cannot predict now.",
        "Most likely.",
        "Ask again later.",
        "My reply is no.",
        "Outlook good.",
        "Don't count on it."
      ];
      this.say(Tools.sampleOne(cases));
    }
  },
	
	cal: "calculate",
  calculate: {
    command(target, room, user) {
      if (!(room instanceof Users.User) && !user.hasRank(room, "+")) return;
      let alphabets = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "x",
        "y",
        "z"
      ];
      let cond = true;
      for (let i = 0; i < alphabets.length; i++) {
        if (target.includes(alphabets[i])) cond = false;
      }
      if (cond == true) return this.say(eval(target));
    }
  },
	
   
  roll: function (target, room, user) {
		let realtarget = target;
		if (!user.hasRank(room, '+') && (!Games.host || Games.host.id !== user.id)) return;
		let plusIndex = target.indexOf("+");
		let adder = 0;
		if (plusIndex !== -1) {
			adder = parseInt(target.substr(plusIndex + 1));
			let str = adder.toString();
			if (str.length !== (target.substr(plusIndex + 1)).length) return;
			if (!adder) return;
			target = target.substr(0, plusIndex);
		}
		let dIndex = target.indexOf("d");
		let numDice = 1;
		let roll;
		if (dIndex !== -1) {
			numDice = parseInt(target.substr(0, dIndex));;
			if (!numDice) return;
			roll = parseInt(target.substr(dIndex + 1));
			if (!roll) return;	
		} else {
			roll = parseInt(target);
			if (!roll) return;
		}
		let rolls = [];
		let sum = 0;
		for (let i = 0; i < numDice; i++) {
			rolls.push(Tools.random(roll) + 1);
			sum += rolls[i];
		}
		if ((Users.self.hasRank(room, "*"))) {
			if (numDice === 1) {
				let str = "Roll (1 - " + roll + "): " + rolls[0];
				if (room.id === 'survivor') {
					this.say("/addhtmlbox " + str);
				} else {
					this.say("!htmlbox " + str);
				}
			} else {
				let str = numDice + " Rolls (1 - " + roll + "): " + rolls.join(", ") + "<br></br>" + "Sum: " + sum;
				if (room.id === 'survivor') {
					this.say("/addhtmlbox " + str);
				} else {
					this.say("!htmlbox " + str);
				}
			}
		} else {
			room.say("Rolls: " + rolls.join(",") + " || Total: " + (sum + adder));
		}
	},
  
  
	about: function (target, room, user) {
		if (!(room instanceof Users.User) && !user.hasRank(room, '+')) return;
		this.say(Config.username + "  will make one soon maybe xD");
	},
	help: function (target, room, user) {
		if (!(room instanceof Users.User) && !user.hasRank(room, '+')) return;
		if (!Config.guide) return this.say("There is no guide available.Maybe someone will create it! xD");
		this.say(Users.self.name + " guide: " + Config.guide);
	},
	mail: function (target, room, user) {
		if (!(room instanceof Users.User) || !Config.allowMail) return;
		let targets = target.split(',');
		if (targets.length < 2) return this.say("Please use the following format: .mail user, message");
		let to = Tools.toId(targets[0]);
		if (!to || to.length > 18 || to === Users.self.id || to.startsWith('guest')) return this.say("Please enter a valid username");
		let message = targets.slice(1).join(',').trim();
		let id = Tools.toId(message);
		if (!id) return this.say("Please include a message to send.");
		if (message.length > (258 - user.name.length)) return this.say("Your message is too long.");
		let database = Storage.getDatabase('global');
		if (to in database.mail) {
			let queued = 0;
			for (let i = 0, len = database.mail[to].length; i < len; i++) {
				if (Tools.toId(database.mail[to][i].from) === user.id) queued++;
			}
			if (queued >= 3) return this.say("You have too many messages queued for " + Users.add(targets[0]).name + ".");
		} else {
			database.mail[to] = [];
		}
		database.mail[to].push({time: Date.now(), from: user.name, text: message});
		Storage.exportDatabase('global');
		this.say("Swish! Your message has been sent to " + Users.add(targets[0]).name + "!");
	},

  
  
  
	// Game commands
	signups: 'creategame',
  games: 'creategame',
  
	creategame: function (target, room, user) {
		if (room instanceof Users.User) return;
		if (!user.hasRank(room, '+')) return;
		//if (!Config.games || !Config.games.includes(room.id)) return this.say("Games are not enabled for this room.");
		let format = Games.getFormat(target);
		if (!format || format.inheritOnly) return this.say("The game '" + target + "' was not found.");
		if (format.internal) return this.say(format.name + " cannot be started manually.");
		Games.createGame(format, room);
		if (!room.game) return;
		room.game.signups();
	},
	start: 'startgame',
	startgame: function (target, room, user) {
		if (!(room instanceof Users.User) && !user.hasRank(room, '+')) return;
		if (room.game) room.game.start();
	},
	cap: 'capgame',
	capgame: function (target, room, user) {
		if (room instanceof Users.User || !room.game || !user.hasRank(room, '+')) return;
		let cap = parseInt(target);
		if (isNaN(cap)) return this.say("Please enter a valid player cap.");
		if (cap < room.game.minPlayers) return this.say(room.game.name + " must have at least " + room.game.minPlayers + " players.");
		if (room.game.maxPlayers && cap > room.game.maxPlayers) return this.say(room.game.name + " cannot have more than " + room.game.maxPlayers + " players.");
		room.game.playerCap = cap;
		this.say("The game will automatically start at **" + cap + "** players!");
	},
  mp: 'maxpoints',
	maxpoints: function (target, room, user) {
		if (room instanceof Users.User || !room.game || !user.hasRank(room, '+')) return;
		let mp = parseInt(target);
		if (isNaN(mp)) return this.say("Please enter a valid value.");
		//if (cap < room.game.minPlayers) return this.say(room.game.name + " must have at least " + room.game.minPlayers + " players.");
		//if (room.game.maxPlayers && cap > room.game.maxPlayers) return this.say(room.game.name + " cannot have more than " + room.game.maxPlayers + " players.");
		room.game.maxPoints = mp;
		this.say("Player with **" + mp + "** points wins the game!");
	},
  
  
  players: 'pl',
	pl: function (target, room, user) {
		if ((!user.isDeveloper() && !user.hasRank(room, '+')) || !room.game) return;
		if (typeof room.game.pl === 'function') room.game.pl();
	},
  
  
	end: 'endgame',
	endgame: function (target, room, user) {
		if (!(room instanceof Users.User) && !user.hasRank(room, '+')) return;
		if (room.game) room.game.forceEnd();
	},
  
  answer: 'a',
	a: function (target, room, user) {
		if (!room.game) return;
		if (typeof room.game.guess === 'function') room.game.guess(target, user);
	},
  
	join: 'joingame',
	joingame: function (target, room, user) {
		if (room instanceof Users.User || !room.game) return;
		room.game.join(user);
	},
	leave: 'leavegame',
	leavegame: function (target, room, user) {
		if (room instanceof Users.User || !room.game) return;
		room.game.leave(user);
	},
 elim: 'eliminate',
	eliminate: function (target, room, user) {
		if (room instanceof Users.User || !room.game || !user.hasRank(room, '@')) return;
		room.game.elim(target);
	},
	// Storage commands
	bits: 'points',
	points: function (target, room, user) {
		if (room !== user) return;
		let targetUserid = target ? Tools.toId(target) : user.id;
		/**@type {Array<string>} */
		let points = [];
		user.rooms.forEach((rank, room) => {
			if (!(room.id in Storage.databases) || !('leaderboard' in Storage.databases[room.id])) return;
			if (targetUserid in Storage.databases[room.id].leaderboard) points.push("**" + room.id + "**: " + Storage.databases[room.id].leaderboard[targetUserid].points);
		});
		if (!points.length) return this.say((target ? target.trim() + " does not" : "You do not") + " have points on any leaderboard.");
		this.say(points.join(" | "));
	},
  
  choose: function (target, room, user) {
		for (room in Rooms.rooms) {
			let realRoom = Rooms.rooms[room];
			if (realRoom.game && typeof realRoom.game.choose === 'function') realRoom.game.choose(user, target);
		}
	},

	suspect: function (target, room, user) {
		if (room.name !== user.name) return;
		let firstComma = target.indexOf(',');
		if (firstComma === -1) {
			user.say("The correct syntax is " + Config.commandCharacter + "suspect user, pokemon, room");
			return;
		}
		let userID = target.substr(0, firstComma);
		target = target.substr(firstComma + 1);
		if (target.charAt(0) === ' ') {
			target = target.substr(1);
		}
		for (room in Rooms.rooms) {
			let realRoom = Rooms.rooms[room];
			if (realRoom.game && typeof realRoom.game.suspect === 'function') realRoom.game.suspect(user, userID, target);
		}
	},
	
	steal: function (target, room, user) {
		if (!room.game) return;
		if (typeof room.game.steal === 'function') room.game.steal(target, user);
	},
	
	count: function (target, room, user) {
		if (!room.game) {
			if (!user.hasRank(room, '+') || Tools.toId(target) !== "start") {
				return;
			}
			Games.createGame("count", room)
		} else if (typeof room.game.count === 'function') {
			room.game.count(target,user);
		}
	},
  
  

  

	// Tournament commands
	tour: 'tournament',
	tournament: function (target, room, user) {
		if (room instanceof Users.User || !Config.tournaments || !Config.tournaments.includes(room.id)) return;
		if (!target) {
			if (!user.hasRank(room, '+')) return;
			if (!room.tour) return this.say("I am not currently tracking a tournament in this room.");
			let info = "``" + room.tour.name + " tournament info``";
			if (room.tour.startTime) {
				return this.say(info + ": **Time**: " + Tools.toDurationString(Date.now() - room.tour.startTime) + " | **Remaining players**: " + room.tour.getRemainingPlayerCount() + '/' + room.tour.totalPlayers);
			} else if (room.tour.started) {
				return this.say(info + ": **Remaining players**: " + room.tour.getRemainingPlayerCount() + '/' + room.tour.totalPlayers);
			} else {
				return this.say(info + ": " + room.tour.playerCount + " player" + (room.tour.playerCount > 1 ? "s" : ""));
			}
		} else {
			if (!user.hasRank(room, '%')) return;
			let targets = target.split(',');
			let cmd = Tools.toId(targets[0]);
			let format;
			switch (cmd) {
			case 'end':
				this.say("/tour end");
				break;
			case 'start':
				this.say("/tour start");
				break;
			default:
				format = Tools.getFormat(cmd);
				if (!format) return this.say('**Error:** invalid format.');
				if (!format.playable) return this.say(format.name + " cannot be played, please choose another format.");
				let cap;
				if (targets[1]) {
					cap = parseInt(Tools.toId(targets[1]));
					if (cap < 2 || cap > Tournaments.maxCap || isNaN(cap)) return this.say("**Error:** invalid participant cap.");
				}
				this.say("/tour new " + format.id + ", elimination, " + (cap ? cap + ", " : "") + (targets.length > 2 ? ", " + targets.slice(2).join(", ") : ""));
			}
		}
	},
	settour: 'settournament',
	settournament: function (target, room, user) {
		if (room instanceof Users.User || !Config.tournaments || !Config.tournaments.includes(room.id) || !user.hasRank(room, '%')) return;
		if (room.id in Tournaments.tournamentTimers) {
			let warned = overwriteWarnings.has(room.id) && overwriteWarnings.get(room.id) === user.id;
			if (!warned) {
				overwriteWarnings.set(room.id, user.id);
				return this.say("A tournament has already been scheduled in this room. To overwrite it, please reuse this command.");
			}
			overwriteWarnings.delete(room.id);
		}
		let targets = target.split(',');
		if (targets.length < 2) return this.say(Config.commandCharacter + "settour - tier, time, cap (optional)");
		let format = Tools.getFormat(targets[0]);
		if (!format) return this.say('**Error:** invalid format.');
		if (!format.playable) return this.say(format.name + " cannot be played, please choose another format.");
		let date = new Date();
		let currentTime = (date.getHours() * 60 * 60 * 1000) + (date.getMinutes() * (60 * 1000)) + (date.getSeconds() * 1000) + date.getMilliseconds();
		let targetTime = 0;
		if (targets[1].includes(':')) {
			let parts = targets[1].split(':');
			let hours = parseInt(parts[0]);
			let minutes = parseInt(parts[1]);
			if (isNaN(hours) || isNaN(minutes)) return this.say("Please enter a valid time.");
			targetTime = (hours * 60 * 60 * 1000) + (minutes * (60 * 1000));
		} else {
			let hours = parseFloat(targets[1]);
			if (isNaN(hours)) return this.say("Please enter a valid time.");
			targetTime = currentTime + (hours * 60 * 60 * 1000);
		}
		let timer = targetTime - currentTime;
		if (timer <= 0) timer += 24 * 60 * 60 * 1000;
		Tournaments.setTournamentTimer(room, timer, format.id, targets[2] ? parseInt(targets[2]) : 0);
		this.say("The " + format.name + " tournament is scheduled for " + Tools.toDurationString(timer) + ".");
	},
	canceltour: 'canceltournament',
	canceltournament: function (target, room, user) {
		if (room instanceof Users.User || !Config.tournaments || !Config.tournaments.includes(room.id) || !user.hasRank(room, '%')) return;
		if (!(room.id in Tournaments.tournamentTimers)) return this.say("There is no tournament scheduled for this room.");
		clearTimeout(Tournaments.tournamentTimers[room.id]);
		this.say("The scheduled tournament was canceled.");
	},
};

module.exports = commands;
