function generateWinningNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
	let partition = arr.length;
	let index, temp;

	while (partition) {
		index = Math.floor(Math.random() * partition);
		partition--;

		temp = arr[index];
		arr[index] = arr[partition];
		arr[partition] = temp;
	}
	return arr;
}

function newGame() {
	return new Game();
}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(guess) {
	if (isNaN(guess) || guess < 1 || guess > 100) 
		throw 'That is an invalid guess.';
	this.playersGuess = guess;
	return this.checkGuess();
};

Game.prototype.checkGuess = function() {
	this.count++;

	if (this.playersGuess === this.winningNumber)
		return 'You Win!';

	if (this.pastGuesses.indexOf(this.playersGuess) !== -1)
		return 'You have already guessed that number.';

	this.pastGuesses.push(this.playersGuess);

	if (this.pastGuesses.length === 5)
		return 'You Lose.';

	let diff = this.difference();

	if (diff < 10) return `You're burning up!`;
	if (diff < 25) return `You're lukewarm.`;
	if (diff < 50) return `You're a bit chilly.`;
	if (diff < 100) return `You're ice cold!`;
}

Game.prototype.provideHint = function() {
	let res = [this.winningNumber];
	res.push(generateWinningNumber());
	res.push(generateWinningNumber());
	return shuffle(res);
}