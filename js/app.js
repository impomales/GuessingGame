$(document).ready(function() {
	const game = newGame();

	$('#submit').on('click', game, handleSubmit);
	$('#player-input').keyup(game, handleKeyUp);
});

function handleSubmit(e) {
	const game = e.data;
	const input = $('#player-input');
	const guess = Number(input.val());
	input.val('');

	console.log(game.playersGuessSubmission(guess));
}

function handleKeyUp(e) {
	const code = e.keyCode || e.which;
	if (code === 13) handleSubmit({data: e.data});
}