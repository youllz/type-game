<script lang="ts">
	import { tweened } from 'svelte/motion';

	type Word = string;
	export let correctLetters: number;
	export let words: Word[];
	export let seconds: number;
	export let wordIndex: number;
	let wordsPerMinute = tweened(0, { delay: 300, duration: 1000 });
	let accuracy = tweened(0, { delay: 1300, duration: 1000 });

	// https://www.speedtypingonline.com/typing-equations
	// words per minute = (correct / 5) / time
	// accuracy = (correct / total) * 100%

	$: if (seconds === 0) {
		getResults();
	}

	$: if (wordIndex === words.length) {
		getResults();
	}

	function getWordsPerMinute() {
		const word = 5;
		const minutes = 0.5;
		return Math.floor(correctLetters / word / minutes);
	}

	function getResults() {
		$wordsPerMinute = getWordsPerMinute();
		$accuracy = getAccuracy();
	}

	function getAccuracy() {
		const totalLetters = getTotalLetters(words);
		return Math.floor((correctLetters / totalLetters) * 100);
	}

	function getTotalLetters(words: Word[]) {
		return words.reduce((count, word) => count + word.length, 0);
	}
</script>

<div class="results h-full w-full flex flex-col items-center justify-center">
	<div class="text-center">
		<p class="title text-primary text-2xl">wpm</p>
		<p class="score text-secondary text-4xl">{Math.trunc($wordsPerMinute)}</p>
	</div>

	<div class="text-center">
		<p class="title  text-primary text-2xl">accuracy</p>
		<p class="score  text-secondary text-4xl">{Math.trunc($accuracy)}%</p>
	</div>
</div>
