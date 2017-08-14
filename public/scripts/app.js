/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

document.querySelector('.btn-roll').addEventListener('click', function() {
	var dice = Math.floor(Math.random() * 5) + 1;
	var diceDom = document.querySelector('.dice');
	var currentScore = document.querySelector('#current-' + activePlayer);
	
	diceDom.style.display = 'block';
	diceDom.src = '/public/images/dice-' + dice + '.png';
	
	if(dice !== 1) {
		roundScore += dice;
		currentScore.textContent = roundScore;
	} else {
		nextPlayer();
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	scores[activePlayer] += roundScore;
	
	document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	
	console.log(scores[activePlayer]);
	
	gameWon();	
});

document.querySelector('.btn-new').addEventListener('click', function() {
	var diceDom = document.querySelector('.dice');
	diceDom.style.display = 'none';
	
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
});

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
	if(scores[activePlayer] >= 10) {
		document.getElementById('name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	} else {
		nextPlayer();
	}
}