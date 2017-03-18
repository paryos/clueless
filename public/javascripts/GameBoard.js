(function () {
    'use strict';
    var $ = require('jquery');

    var boardInfo = {
        '0-0': 'study',
        '0-1': 'study',
        '0-2': 'study',
        '1-0': 'study',
        '1-1': 'study',
        '1-2': 'study',
        '2-0': 'study',
        '2-1': 'study',
        '2-2': 'secret',
        '0-3': 'empty',
        '1-3': 'hallway',
        '2-3': 'empty',
        '0-4': 'hall',
        '0-5': 'hall',
        '0-6': 'hall',
        '1-4': 'hall',
        '1-5': 'hall',
        '1-6': 'hall',
        '2-4': 'hall',
        '2-5': 'hall',
        '2-6': 'hall',
        '0-7': 'empty',
        '1-7': 'hallway',
        '2-7': 'empty',
        '0-8': 'lounge',
        '0-9': 'lounge',
        '0-10': 'lounge',
        '1-8': 'lounge',
        '1-9': 'lounge',
        '1-10': 'lounge',
        '2-8': 'secret',
        '2-9': 'lounge',
        '2-10': 'lounge',
        '3-0': 'empty',
        '3-1': 'hallway',
        '3-2': 'empty',
        '3-3': 'empty',
        '4-0': 'library',
        '4-1': 'library',
        '4-2': 'library',
        '5-0': 'library',
        '5-1': 'library',
        '5-2': 'library',
        '6-0': 'library',
        '6-1': 'library',
        '6-2': 'library',
        '4-3': 'empty',
        '5-3': 'hallway',
        '6-3': 'empty',
        '4-4': 'billiard',
        '4-5': 'billiard',
        '4-6': 'billiard',
        '5-4': 'billiard',
        '5-5': 'billiard',
        '5-6': 'billiard',
        '6-4': 'billiard',
        '6-5': 'billiard',
        '6-6': 'billiard',
        '3-4': 'empty',
        '3-5': 'hallway',
        '3-6': 'empty',
        '3-7': 'empty',
        '3-8': 'empty',
        '3-9': 'hallway',
        '3-10': 'empty',
        '4-7': 'empty',
        '5-7': 'hallway',
        '6-7': 'empty',
        '4-8': 'dining',
        '4-9': 'dining',
        '4-10': 'dining',
        '5-8': 'dining',
        '5-9': 'dining',
        '5-10': 'dining',
        '6-8': 'dining',
        '6-9': 'dining',
        '6-10': 'dining',
        '7-0': 'empty',
        '7-1': 'hallway',
        '7-2': 'empty',
        '7-3': 'empty',
        '8-0': 'conservatory',
        '8-1': 'conservatory',
        '8-2': 'secret',
        '9-0': 'conservatory',
        '9-1': 'conservatory',
        '9-2': 'conservatory',
        '10-0': 'conservatory',
        '10-1': 'conservatory',
        '10-2': 'conservatory',
        '7-4': 'empty',
        '7-5': 'hallway',
        '7-6': 'empty',
        '7-7': 'empty',
        '8-3': 'empty',
        '9-3': 'hallway',
        '10-3': 'empty',
        '8-4': 'ballroom',
        '8-5': 'ballroom',
        '8-6': 'ballroom',
        '9-4': 'ballroom',
        '9-5': 'ballroom',
        '9-6': 'ballroom',
        '10-4': 'ballroom',
        '10-5': 'ballroom',
        '10-6': 'ballroom',
        '8-7': 'empty',
        '9-7': 'hallway',
        '10-7': 'empty',
        '7-8': 'empty',
        '7-9': 'hallway',
        '7-10': 'empty',
        '8-8': 'secret',
        '8-9': 'kitchen',
        '8-10': 'kitchen',
        '9-8': 'kitchen',
        '9-9': 'kitchen',
        '9-10': 'kitchen',
        '10-8': 'kitchen',
        '10-9': 'kitchen',
        '10-10': 'kitchen'
    };

    var lookupClass = function (i, j) {
        return boardInfo[i + '-' + j];
    };

    var gameBoard = function () {

        var populateCells = function () {
            var tableHtml = '';

            for (var i = 0; i <= 10; i++) {
                tableHtml += '<tr>';
                for (var j = 0; j <= 10; j++) {
                    var cssClass = lookupClass(i, j);
                    tableHtml += '<td class=\'' + cssClass + '\'>' + i + ', ' + j + '</td>';
                }
                tableHtml += '</tr>';
            }

            $('#game-board tbody').append(tableHtml);
        };

        return {
            populateCells: populateCells
        };
    };

    module.exports = gameBoard();

}());