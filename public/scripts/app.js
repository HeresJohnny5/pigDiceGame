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
	
	diceDom.style.display = 'block';
	diceDom.src = '/public/images/dice-' + dice + '.png';
	
	if(dice !== 1) {
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		document.querySelector('#current-' + activePlayer).textContent = 0;
				
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		
		document.querySelector('.player-0-panel').classList.remove('active');
				
		roundScore = 0;		
	}
	
//	if(dice > 1) {
//		scores[activePlayer] += document.querySelector('#current-' + activePlayer).textContent = dice;
//		
//		document.querySelector('#current-' + activePlayer).textContent = scores[activePlayer];
//		
//		console.log(scores[activePlayer]);
//	} else {
//		scores[activePlayer] = 0;
//
//		document.querySelector('#current-' + activePlayer).textContent = 0;
//		
//		console.log(scores[activePlayer]);
//		
//		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
//	}

});