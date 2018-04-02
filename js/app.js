$(document).ready(function() {
	const data = {
		game: newGame(),
		count: 0
	}

	$('#submit').on('click', data, handleSubmit);
	$('#player-input').keyup(data, handleKeyUp);
});

function handleSubmit(e) {
	console.log(e.data);
	const input = $('#player-input');
	const { game, count } = e.data;
	const guess = Number(input.val());
	const heading = $('#title');
	const subtitle = $('#subtitle');
	const slot = $('.guess').eq(count);
	const submit = $(this);
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