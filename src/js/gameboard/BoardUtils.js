(function () {
    'use strict';
    var _ = require('lodash');

    var roomMap = {
        'Kitchen': ['8-10', '9-9', '9-10', '10-8', '10-9', '10-10', '8-9', '9-8'],
        'Ballroom': ['8-4', '8-6', '9-5', '10-4', '10-5', '10-6', '9-6', '8-5', '9-4'],
        'Conservatory': ['8-0', '9-0', '9-1', '10-0', '10-1', '10-2', '9-2', '8-1'],
        'Billiard Room': ['4-4', '4-6', '5-5', '6-4', '6-6', '6-5', '4-5', '5-4', '5-6'],
        'Library': ['4-0', '4-2', '5-0', '5-1', '6-0', '6-2', '6-1', '4-1', '5-2'],
        'Study': ['0-0', '0-1', '0-2', '1-0', '1-1', '2-0', '2-1', '1-2'],
        'Hall': ['0-4', '0-5', '0-6', '1-5', '2-4', '2-6', '1-4', '1-6', '2-5'],
        'Lounge': ['0-8', '0-9', '0-10', '1-9', '1-10', '2-10', '1-8', '2-9'],
        'Dining Room': ['4-8', '4-10', '5-9', '5-10', '6-8', '6-10', '4-9', '6-9', '5-8']
    };

    var findEmptyCellInRoom = function (room, currentPosition, playerList) {
        var cellsInRoom = roomMap[room];
        return findFirstCellWithoutCharacter(cellsInRoom, currentPosition, playerList);
    };

    var findFirstCellWithoutCharacter = function (cellList, currentPos, playerList) {
        if (cellList.indexOf(currentPos) >= 0) {
            return currentPos;
        }

        for (var i = 0; i < cellList.length; i++) {
            var pos = cellList[i];
            if (_.find(playerList, ['position', pos]) === undefined) {
                return pos;
            }
        }
        return currentPos;
    };

    var boardUtils = {
        findEmptyCellInRoom: findEmptyCellInRoom
    };

    module.exports = boardUtils;
}());