var inquirer = require('inquirer');
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

function screenOne() {
  inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: 
      "\n---------------------------\nWelcome to the Pokedex!!\nTo begin, please select\nhow the pokedex may assist.\n---------------------------",
      choices: ["Look up a Pokemon", "Look up a Berry", "Look up an Item", "I'm just looking for a friend"],
    }
  ]).then(function(replyOne) {
    if (replyOne.answer === "Look up a Pokemon") {
      pokemonFinder()
    }
    else if (replyOne.answer == "Look up a Berry") {
      berryFinder()
    }
    else if (replyOne.answer === "Look up an Item") {
      itemFinder()
    }
    else if (replyOne.answer === "I'm just looking for a friend") {
      console.log("---------------------------\nSorry. Pokedex is not a friend, but a tool for mastering pokemon\n---------------------------")
      setTimeout (function() {
        doNext();
      },4000)
    }
  })
}

function doNext() {
  inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: 
      "\n---------------------------\nHow may the pokedex assist next?\n---------------------------",
      choices: ["Look up a Pokemon", "Look up a Berry", "Look up an Item", "I'm just looking for a friend"],
    }
  ]).then(function(replyOne) {
    if (replyOne.answer === "Look up a Pokemon") {
      pokemonFinder()
    }
    else if (replyOne.answer == "Look up a Berry") {
      berryFinder()
    }
    else if (replyOne.answer === "Look up an Item") {
      itemFinder()
    }
    else if (replyOne.answer === "I'm just looking for a friend") {
      console.log("Sorry. Pokedex is not a friend, but a tool for mastering pokemon")
      doNext()
    }
  })
}

function pokemonFinder() {
  inquirer.prompt([
    {
      type: "input",
      name: "pFAnswer",
      message: 
      "---------------------------\nPokemon Finder!!\nPlease type the name of the\npokemon you wish to access.\n---------------------------",
    },
  ]).then(function(replyPF) {
      P.getPokemonByName(replyPF.pFAnswer, function(response, error) { 
        if(!error) {
          console.log(
            `
            ----------------------------------------------
            Pokemon: ${response.name}
            Weight:  ${response.weight}
            ID:      ${response.id}
            Thanks for using the Pokedex!
            ----------------------------------------------
            `);
            setTimeout (function() {
              doNext();
            },4000)
        } else {
          console.log(error)
        }
      });
  });
}

function berryFinder() {
  inquirer.prompt([
    {
      type: "input",
      name: "bFAnswer",
      message: 
      "---------------------------\nPokemon Finder!!\nPlease type the name of the\nberry you wish to access.\n---------------------------",
    },
  ]).then(function(replyBF) {
      P.getBerryByName(replyBF.bFAnswer, function(response, error) { 
        if(!error) {
          console.log(
            `
            ----------------------------------------------
            Berry Name:   ${response.name}
            Max Harvest:  ${response.max_harvest}
            Soil Dryness: ${response.soil_dryness}
            Growth Time:  ${response.growth_time}
            ID:           ${response.id}
            Size:         ${response.size}
            Thanks for using the Pokedex!
            ----------------------------------------------
            `); 
             setTimeout (function() {
              doNext();
            },4000) 
        } else {
          console.log(error)
        }
      });
  });
}

function itemFinder() {
  inquirer.prompt([
    {
      type: "input",
      name: "iFAnswer",
      message: 
      "---------------------------\nPokemon Finder!!\nPlease type the name of the\nitem you wish to access.\n---------------------------",
    },
  ]).then(function(replyIF) {
      P.getItemByName(replyIF.iFAnswer, function(response, error) { 
        if(!error) {
           console.log(
            `
            ----------------------------------------------
            Item Name:    ${response.name}
            Effect:       ${response.effect_entries[0].short_effect}
            Thanks for using the Pokedex!
            ----------------------------------------------
            `); 
             setTimeout (function() {
              doNext();
            },4000)  
        } else {
          console.log(error)
        } 
      });
  });
}
screenOne();