$(document).ready(function() {
	const game = newGame();

	$('#submit').on('click', game, handleSubmit);
	$('#player-input').keyup(game, handleKeyUp);
});

function handleSubmit(e) {
	const input = $('#player-input');
	const game = e.data;
	const guess = Number(input.val());

	if (!input.val()) return;
	input.val('');

	try {
		const response = game.playersGuessSubmission(guess);

		if (response === 'You have already guessed that number.') {
			$('#title').text(response + ' Try again.');
		}
	} catch (msg) {
		$('#title').text(msg);
	}
}

function handleKeyUp(e) {
	const code = e.keyCode || e.which;
	if (code === 13) handleSubmit({data: e.data});
}