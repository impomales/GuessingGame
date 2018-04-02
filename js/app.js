$(document).ready(function() {
	const data = {
		game: newGame(),
		count: 0
	}

	$('#submit').on('click', data, handleSubmit);
	$('#player-input').keyup(data, handleKeyUp);
	$('#reset').on('click', data, handleReset);
	$('#hint').on('click', data, handleHint);
});

function handleSubmit(e) {
	const input = $('#player-input');
	const { game, count } = e.data;
	const guess = Number(input.val());
	const heading = $('#title');
	const subtitle = $('#subtitle');
	const slot = $('.guess').eq(count);
	const submit = $('#submit');
	const hint = $('#hint');


	if (!input.val()) return;
	input.val('');

	try {
		const response = game.playersGuessSubmission(guess);

		if (response === 'You have already guessed that number.') {
			heading.text(response + ' Try again.');
			return;
		}
			
		heading.text(response);

		if (response === 'You Win!' || response === 'You Lose.') {
			subtitle.text('Press the Reset button to play again.');
			submit.prop('disabled', true);
			hint.prop('disabled', true);
		}
		else {
			if (game.isLower()) subtitle.text('Guess Higher!');
			else subtitle.text('Guess Lower');
		}

		slot.text(guess);
		e.data.count++;
	} catch (msg) {
		heading.text(msg);
	}
}

function handleKeyUp(e) {
	const code = e.keyCode || e.which;
	if (code === 13) handleSubmit({data: e.data});
}

function handleReset(e) {
	e.data.game = newGame();
	e.data.count = 0;

	$('.guess').html('&nbsp;-&nbsp;');
	$('#title').text('Play the Guessing Game!');
	$('#subtitle').text('Guess a number between 1-100');
	$('#submit').prop('disabled', false);
	$('#hint').prop('disabled', false);
}

function handleHint(e) {
	const hints = e.data.game.provideHint();

	$("#title").text(`The winning number is ${hints[0]}, ${hints[1]}, or ${hints[2]}`);
}