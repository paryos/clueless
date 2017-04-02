(function () {
    'use strict';
    var _ = require('lodash');

    var suspects = ['Ms. Scarlet', 'Col. Mustard', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];
    var weapons = ['Candlestick', 'Poison', 'Rope', 'Gloves', 'Horseshoe', 'Knife', 'Lead Pipe', 'Revolver', 'Wrench'];
    var rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study', 'Hall', 'Lounge', 'Dining Room', 'Cellar'];

    var suspectSelect = '#suspect-select';
    var roomSelect = '#room-select';
    var weaponSelect = '#weapon-select';

    var gameSocket = {};
    var cards = {};
    var excessCards = [];

    var populateSelections = function () {
        var possibleSuspects = _.difference(_.difference(suspects, cards.suspects), excessCards);
        var possibleRooms = _.difference(_.difference(rooms, cards.rooms), excessCards);
        var possibleWeapons = _.difference(_.difference(weapons, cards.weapons), excessCards);

        appendToSelect(suspectSelect, possibleSuspects);
        appendToSelect(roomSelect, possibleRooms);
        appendToSelect(weaponSelect, possibleWeapons);
    };

    var appendToSelect = function (select, options) {
        return _.forEach(options, function (option) {
            $(select).append('<option>' + option + '</option>');
        });
    };

    var init = function (socket, playerCards, extraCards) {
        gameSocket = socket;
        cards = playerCards;
        excessCards = extraCards;

        populateSelections();
    };

    var accusation = {
        init: init
    };

    module.exports = accusation;

}());