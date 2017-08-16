/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/* GAME CHALLENGES
1. A player looses his/her ENTIRE score when he/she rolls two 6's in a row. After that, it's the next player's turn.
*/

var scores, roundScore, activePlayer, gamePlaying, priorRoll, gameScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		var dice = Math.floor(Math.random() * 5) + 1;
		var diceDom = document.querySelector('.dice');
		var currentScore = document.querySelector('#current-' + activePlayer);
		
		diceDom.style.display = 'block';
		diceDom.src = '/public/images/dice-' + dice + '.png';

		if(priorRoll === 6 && dice === 6) {
			scores[activePlayer] = 0;
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('#score-' + activePlayer).textContent = 0;
			priorRoll = -1;
			nextPlayer();
		} else if(dice !== 1) {
			roundScore += dice;
			priorRoll = dice;
			currentScore.textContent = roundScore;
		} else {
			priorRoll = -1;
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	priorRoll = -1;
	
	if(gamePlaying) {
		scores[activePlayer] += roundScore;

		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value;
		
		if(input) {
			gameScore = input;
		} else {
			console.log('Nope!');
		}
		
		gameWon();
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {			
	var currentScore = document.querySelector('#current-' + activePlayer);
	
	currentScore.textContent = 0;
		
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

	roundScore = 0;

	document.querySelector('.dice').style.display = 'none';
}

function gameWon() {	
	if(scores[activePlayer] >= gameScore) {
		document.getElementById('name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		
		gamePlaying = false;
	} else {
		nextPlayer();
	}
}
	
function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	priorRoll = -1;
	
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;	
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
}
