(function () {
    'use strict';
    var messages = require('./Messages');
    var cellUtils = require('./CellUtils');
    var cards = require('./Cards');
    var accusation = require('./Accusation');

    var welcomeModal = '#welcome-modal';
    var endTurnButton = '#end-turn';
    var makeSuggestionButton = '#make-suggestion';
    var makeAccusationButton = '#make-accusation';
    var gameRunning = false;
    var gameSocket = {};

    var playerClasses = ['mustard', 'scarlet', 'white', 'green', 'peacock', 'plum'];

    var playerClass = '';
    var playerPosition = '';

    var secretPassageMap = {
        '2-8': ['8-1', '9-1', '9-2', '8-2'],
        '8-2': ['1-8', '1-9', '2-9', '2-8'],
        '2-2': ['8-9', '9-9', '9=8', '8-8'],
        '8-8': ['1-2', '1-1', '2-1', '2-2']
    };

    var startGame = function () {
        gameRunning = true;
        gameSocket.emit('start-game', {
            started: gameRunning
        });
        return;
    };

    var registerEndTurnButton = function () {
        $(endTurnButton).click(function () {
            endTurn();
        });
    };

    var registerCloseGameLostButton = function () {
        $('#game-lost-close').click(function () {
            playerPosition = cellUtils.findNearestCellForPlayerOutOfGame(playerPosition);
            endTurn();
        });
    };

    var endTurn = function () {
        gameSocket.emit('end-turn', {
            position: playerPosition
        });
        cellUtils.disableCellClicks();
        disableButtons();
    };

    var disableButtons = function () {
        $(endTurnButton).prop('disabled', true);
        $(makeSuggestionButton).prop('disabled', true);
        $(makeAccusationButton).prop('disabled', true);
        return;
    };

    var enableButtons = function () {
        $(endTurnButton).prop('disabled', false);
        $(makeSuggestionButton).prop('disabled', false);
        $(makeAccusationButton).prop('disabled', false);
        return;
    };

    var registerCellClicks = function () {
        $('.td-clickable').click(function () {
            $('#' + playerPosition).removeClass(playerClass);
            var id = $(this).attr('id');
            $(this).addClass(playerClass);

            if ($(this).attr('class').indexOf('secret') >= 0) {
                playerPosition = cellUtils.findFirstCellWithoutCharacter(secretPassageMap[id], playerPosition);
            } else {
                playerPosition = id;
            }
        });
    };

    var startPlayerTurn = function (position) {
        cellUtils.makeCellsClickable(position);
        registerCellClicks();
    };

    var listenToSocket = function () {
        gameSocket.on('game-started', function (data) {
            messages.addMessage(data.message);
            $(welcomeModal).modal('toggle');
        });
        gameSocket.on('player-turn', function (data) {
            enableButtons();
            startPlayerTurn(data.position);
            playerClass = data.cssClass;
            playerPosition = data.position;
        });
        gameSocket.on('game-status', function (data) {
            messages.addMessage(data.message);
        });
        gameSocket.on('cards', function (data) {
            cards.init(data.cards, data.extraCards);
            accusation.init(gameSocket, cards.getSortedPlayerCards(), data.extraCards);
        });
        gameSocket.on('game-lost', function (data) {
            $('#solution-text').append('<p>Unfortunately the correct solution is ' + data.suspect + ' with the ' + data.weapon + ' in the ' + data.room + '.</p>');
            $('#game-lost-modal').modal('show');
            registerCloseGameLostButton();
        });
        gameSocket.on('game-won', function (data) {
            $('#solution-winning-text').append('<p>Correct! It was ' + data.suspect + ' with the ' + data.weapon + ' in the ' + data.room + '!</p>');
            $('#game-won-modal').modal({
                backdrop: 'static',
                keyboard: false
            });
        });
    };

    var init = function (socket) {
        gameSocket = socket;
        listenToSocket();
        disableButtons();
        registerEndTurnButton();
    };

    var game = {
        init: init,
        startGame: startGame
    };

    module.exports = game;

}());