(function () {
    'use strict';
    var _ = require('lodash');


    var suspects = ['Ms. Scarlet', 'Col. Mustard', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];

    var weapons = ['Candlestick', 'Poison', 'Rope', 'Gloves', 'Horseshoe', 'Knife', 'Lead Pipe', 'Revolver', 'Wrench'];

    var rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study', 'Hall', 'Lounge', 'Dining Room', 'Cellar'];

    var allCards = [];

    var shuffleDecks = function () {
        suspects = _.shuffle(suspects);
        weapons = _.shuffle(weapons);
        rooms = _.shuffle(rooms);
    };

    var selectMurderCase = function () {
        shuffleDecks();
        return {
            'suspect': suspects.pop(),
            'weapon': weapons.pop(),
            'room': rooms.pop()
        };
    };

    var combineDecks = function () {
        allCards = suspects.concat(weapons).concat(rooms);

        allCards = _.shuffle(allCards);
        return allCards;
    };

    var dealCards = function (playerCount) {
        combineDecks();
        var deltCards = {};
        var currentPlayer = 1;

        for (var i = 1; i <= playerCount; i++) {
            deltCards['' + i] = [];
        }

        while (allCards.length > playerCount) {
            deltCards['' + currentPlayer] = deltCards['' + currentPlayer].concat(allCards.pop());

            currentPlayer = currentPlayer === playerCount ? 1 : currentPlayer + 1;
        }

        if (allCards.length > 0) {
            deltCards.remaining = allCards;
        }

        return deltCards;
    };

    var cardService = {
        selectMurderCase: selectMurderCase,
        dealCards: dealCards
    };

    module.exports = cardService;
}());