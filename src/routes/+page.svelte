<script lang="ts">
	import FooterBtn from '$lib/components/FooterBtn.svelte';
	import GameOver from '$lib/components/GameOver.svelte';
	import Language from '$lib/components/Language.svelte';
	import Theme from '$lib/components/Theme.svelte';
	import { gameFocus, inputFocus } from '$lib/store';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	type Game = 'waiting for input' | 'in progress' | 'game over';
	type Mode = 'words' | 'time' | 'quote' | 'zen' | 'custom';
	type NumbersWords = 10 | 25 | 50 | 100;

	let game: Game = 'waiting for input';
	// let words =
	// 	'to add scrollbars to an element in the event that its content overflows the bounds of that element. Unlike which always shows scrollbars, this utility will only show them if scrolling is necessary to add scrollbars to an element in the event that its content overflows the bounds of that element. Unlike which always shows scrollbars, this utility will only show them if scrolling is necessary'.split(
	// 		' '
	// 	);

	let gameMode: Mode = 'time';
	let numWords: NumbersWords = 100;

	let wordIndex = 0;
	let letterIndex = 0;
	let typeLetter = '';
	let correctLetters = 0;
	let seconds = 30;

	let wordsEl: HTMLDivElement;
	let letterEl: HTMLSpanElement;
	let caretEl: HTMLDivElement;
	let inputEl: HTMLInputElement;
	let initWords = data.wordData.words;
	let words = data.wordData.words.slice(0, numWords).sort(() => 0.5 - Math.random());

	function handleKeyDown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();

			if (game === 'in progress') {
				nextWorld();
				gameFocus.toggleFocus();
			}
		}

		// if(gameMode === 'zen') {

		// 	if(event.code === 'Space') {
		// 		zenWords.push(typeLetter)
		// 		console.log(zenWords.length)
		// 	}
		// }

		if (game === 'waiting for input') {
			starGame();
		}
	}

	function updateGameState() {
		setLetter();
		checkLetter();
		nextLetter();
		resetLetter();
		updateLine();
		moveCaret();
	}

	// words = [...words, words.slice(0, numWords)]

	let fetchWord;
	async function getWords() {
		const response = await fetch(`/api/words/${data.wordData.cookiesLanguage}`);
		fetchWord = await response.json();
		words = fetchWord.slice(0, numWords).sort(() => 0.5 - Math.random());
	}

	function starGame() {
		setGameState('in progress');
		if(gameMode === 'time') {

			setGameTimer();
		}
	}

	function setGameState(sate: Game) {
		game = sate;
	}

	function setGameTimer() {
		function gameTimer() {
			if (seconds > 0) {
				seconds -= 1;
			}

			if (game === 'waiting for input' || seconds === 0) {
				clearInterval(interval);
			}

			if (seconds === 0) {
				setGameState('game over');
				// getReuslt()
			}
		}

		const interval = setInterval(gameTimer, 1000);
	}

	$: if(wordIndex === words.length) {
		setGameState('game over');
	}

	function setLetter() {
		const isCompleted = letterIndex > words[wordIndex].length - 1;

		// resetLetterEl.push( wordsEl.children[wordIndex].children[letterIndex] as HTMLSpanElement)
		if (!isCompleted) {
			letterEl = wordsEl.children[wordIndex].children[letterIndex] as HTMLSpanElement;
		}
	}

	function checkLetter() {
		const currenLetter = words[wordIndex][letterIndex];

		if (typeLetter === currenLetter) {
			letterEl.dataset.letter = 'correct';
			increaseScore();
		}

		if (typeLetter !== currenLetter) {
			letterEl.dataset.letter = 'incorrect';
		}
	}

	function increaseScore() {
		correctLetters += 1;
	}

	function nextLetter() {
		letterIndex += 1;
	}

	function resetLetter() {
		typeLetter = '';
	}

	function updateLine() {
		const wordEl = wordsEl.children[wordIndex];
		const wordsY = wordsEl.getBoundingClientRect().y;
		const wordY = wordEl.getBoundingClientRect().y;

		if (wordY > wordsY) {
			wordEl.scrollIntoView({ block: 'center' });
		}
	}

	function nextWorld() {
		const isNotFirstLetter = letterIndex !== 0;
		const isOneLetterWord = words[wordIndex].length === 1;

		if (isNotFirstLetter || isOneLetterWord) {
			wordIndex += 1;
			letterIndex = 0;
			increaseScore();
			moveCaret();
		}
	}

	function moveCaret() {
		const offset = 1;
		caretEl.style.top = `${letterEl.offsetTop + offset}px`;
		caretEl.style.left = `${letterEl.offsetLeft + letterEl.offsetWidth}px`;
	}

	function focusInput() {
		inputEl.focus();
	}

	onMount(async () => {
		focusInput();
	});

	// function numbersActive() {
	// 	numbers = !numbers;
	// }
	// function puncActive() {
	// 	punctuation = !punctuation;
	// }

	function setGameMode(mode: Mode) {
		gameMode = mode;
	}
	function getNumWord(words: NumbersWords) {
		numWords = words;
	}

	// function getWords(num:NumbersWords) {
	// 	words = initWords.slice(0, num).slice(0, num).sort(() => 0.5 - Math.random())
	// }
	function resetCheck() {
		for (let i = 0; i < words.length; i++) {
			for (let j = 0; j < words[i].length; j++) {
				const rLetterEl = wordsEl.children[i].children[j] as HTMLSpanElement;
				rLetterEl.dataset.letter = '';
			}
		}
	}

	function resetGame() {
		inputFocus.reset();
		resetCheck();
		getWords();
		seconds = 30;
		typeLetter = '';
		wordIndex = 0;
		letterIndex = 0;
		correctLetters = 0;
		setGameState('waiting for input');
		inputEl.focus();
		// words = data.wordData.words;
		// getWords(numWords)
	}
	function resetEndGame() {
		inputFocus.reset();
		// resetCheck();
		getWords();
		seconds = 30;
		typeLetter = '';
		wordIndex = 0;
		letterIndex = 0;
		correctLetters = 0;
		setGameState('waiting for input');
		inputEl.focus();
		// words = data.wordData.words;
		// getWords(numWords)
	}
</script>

{#if game !== 'game over'}
	<section
		class="w-screen relative  flex flex-col justify-between items-center h-[calc(100vh-6rem)] "
		class:center={!$gameFocus}
		data-game={game}
	>
		{#if $gameFocus}
			<div
				class="w-70 flex items-center bg-neutral rounded px-2  justify-between text-neutral-content"
				transition:fade
			>
				<div class="flex items-center">
					<div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span
							class=" flex gap-1 w-auto p-2 items-center justify-center text-xs cursor-pointer"
							class:text-secondary={gameMode === 'time'}
							on:click|stopPropagation={() => {
								setGameMode('time');
								resetGame();
								inputFocus.reset();
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.71L11 12.41V7h2v4.59l3.71 3.71l-1.42 1.41z"
								/></svg
							>
							time
						</span>
					</div>
					<div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span
							class=" flex gap-1 w-auto p-2 items-center justify-center text-xs cursor-pointer"
							class:text-secondary={gameMode === 'words'}
							on:click|stopPropagation={() => {
								setGameMode('words');
								resetGame();
								inputFocus.reset();
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M5 18h14v3H5zm7.5-14h-1c-.401 0-.764.24-.921.609L5.745 16h2.173l1.273-3h5.604l1.268 3h2.171L13.421 4.61A1 1 0 0 0 12.5 4zm-2.46 7l1.959-4.616L13.95 11h-3.91z"
								/></svg
							>
							words
						</span>
					</div>
				</div>
				<!-- end mode -->
				<div class="h-3 w-0.5 bg-base-100" />
				<!-- wordCount -->
				<div class="flex items-center gap-2 px-2">
					<div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span
							class=" text-xs cursor-pointer"
							class:text-secondary={numWords === 10}
							on:click|stopPropagation={() => {
								getNumWord(10);
								getWords();
								resetGame();
								inputFocus.reset();
							}}>10</span
						>
					</div>
					<div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span
							class=" text-xs cursor-pointer"
							class:text-secondary={numWords === 25}
							on:click|stopPropagation={() => {
								getNumWord(25);
								getWords();
								resetGame();
								inputFocus.reset();
							}}>25</span
						>
					</div>
					<div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span
							class=" text-xs cursor-pointer"
							class:text-secondary={numWords === 50}
							on:click|stopPropagation={() => {
								getNumWord(50);
								getWords();
								resetGame();
								inputFocus.reset();
							}}>50</span
						>
					</div>
					<div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span
							class=" text-xs cursor-pointer"
							class:text-secondary={numWords === 100}
							on:click|stopPropagation={() => {
								getNumWord(100);
								getWords();
								resetGame();
								inputFocus.reset();
							}}>100</span
						>
					</div>
					<!-- <div>
							<span class=" items-center justify-center text-xs">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
									><path
										fill="currentColor"
										d="m10.3 8.2l-.9.9l.9.9l-1.2 1.2l4.3 4.3c.6.6 1.5.6 2.1 0s.6-1.5 0-2.1l-5.2-5.2zm3.9 6.8c-.4 0-.8-.3-.8-.8c0-.4.3-.8.8-.8s.8.3.8.8s-.3.8-.8.8zM3.6 8l.9-.6L6 5.7l.9.9l.9-.9l-.1-.1c.2-.5.3-1 .3-1.6c0-2.2-1.8-4-4-4c-.6 0-1.1.1-1.6.3l2.9 2.9l-2.1 2.1L.3 2.4C.1 2.9 0 3.4 0 4c0 2.1 1.6 3.7 3.6 4z"
									/><path
										fill="currentColor"
										d="m8 10.8l.9-.8l-.9-.9l5.7-5.7l1.2-.4L16 .8l-.7-.7l-2.3 1l-.5 1.2L6.9 8L6 7.1l-.8.9s.8.6-.1 1.5c-.5.5-1.3-.1-2.8 1.4L.2 13s-.6 1 .6 2.2s2.2.6 2.2.6l2.1-2.1c1.4-1.4.9-2.3 1.3-2.7c.9-.9 1.6-.2 1.6-.2zm-3.1-.4l.7.7l-3.8 3.8l-.7-.7z"
									/></svg
								>
							</span>
						</div> -->
				</div>
			</div>
		{/if}
	
		<!-- main -->
		<div class="w-full   flex flex-col items-center"  >
			{#if $gameFocus}
				<div transition:fade>
					<Language language={data.wordData.cookiesLanguage} />
				</div>
			{/if}
			<input
				type="text"
				bind:value={typeLetter}
				on:input={updateGameState}
				on:keydown={handleKeyDown}
				bind:this={inputEl}
				class="opacity-0"
			/>
			<div class="text-2xl mb-2 text-primary h-6 ">
				{#if game === 'in progress' && gameMode === 'time'}
					{seconds}
				{:else if game === 'in progress' && gameMode === 'words'}
					{wordIndex} / {words.length}
				{/if}
			</div>
			<div
				class="flex gap-2 flex-wrap  text-xl  relative overflow-hidden h-[calc(1em*4*1.42)] w-full select-none transition-all px-40"
				bind:this={wordsEl}
			>
				{#each words as word}
					<span class="word  ">
						{#each word as letter}
							<span class="letter transition-all ">{letter}</span>
						{/each}
					</span>
				{/each}
				<div bind:this={caretEl} class="caret" />
			</div>
			<!-- add blur -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if !$inputFocus}
				<div
					on:click|stopPropagation={() => {
						inputFocus.reset();
						inputEl.focus();
					}}
					class="cblur cursor-pointer flex items-center justify-center gap-2 w-full h-[11rem] absolute top-1/4"
				>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"
							><path
								fill="currentColor"
								d="M123.193 29.635L121 406.18l84.31-82.836l65.87 159.02l67.5-27.96l-65.87-159.02L391 294.342z"
							/></svg
						>
					</span>
					<span> Click here or start typing to focus </span>
				</div>
			{/if}
			<div class="w-full flex items-center justify-center mt-10 ">
				<div class="tooltip tooltip-bottom" data-tip="Restart Test">
					<button class="" on:click|stopPropagation|stopPropagation={resetGame}>
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
								><g
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									><path
										d="M19.933 13.041a8 8 0 1 1-9.925-8.788c3.899-1 7.935 1.007 9.425 4.747"
									/><path d="M20 4v5h-5" /></g
								></svg
							>
						</span>
					</button>
				</div>
			</div>
		</div>
	
		<!-- bottom -->
		{#if $gameFocus}
			<div transition:fade>
				<!-- key tips -->
				<div class="flex flex-col items-center justify-center">
					<div>
						<kbd class="kbd kbd-xs">tab</kbd>
						&nbsp; + &nbsp;
						<kbd class="kbd kbd-xs">enter</kbd>
	
						<span class="text-xs"> &nbsp; - &nbsp; restart test</span>
					</div>
					<div>
						<kbd class="kbd kbd-xs">esc</kbd>
						<span class="text-xs"> &nbsp; or &nbsp;</span>
						<kbd class="kbd kbd-xs">ctrl</kbd>
						+
						<kbd class="kbd kbd-xs">shift</kbd>
						+
						<kbd class="kbd kbd-xs">p</kbd>
	
						<span class="text-xs"> &nbsp; - &nbsp; command line</span>
					</div>
				</div>
				<!-- leftright -->
				<div class="flex items-center justify-between w-full mt-10 gap-40">
					<div class="flex items-center gap-2">
						<FooterBtn />
					</div>
					<!-- The button to open modal -->
					<Theme />
				</div>
			</div>
		{/if}
	</section>
	
{/if}

{#if game === 'game over'}
	<div class="h-[30rem] w-full flex flex-col gap-5 ">
		<GameOver {words} {correctLetters} {seconds} {wordIndex}/>
		<div class="tooltip tooltip-bottom" data-tip="Restart Test">
			<button class="" on:click|stopPropagation|stopPropagation={resetEndGame}>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
						><g
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							><path
								d="M19.933 13.041a8 8 0 1 1-9.925-8.788c3.899-1 7.935 1.007 9.425 4.747"
							/><path d="M20 4v5h-5" /></g
						></svg
					>
				</span>
			</button>
		</div>
	</div>
{/if}
<style lang="scss">
	.letter {
		opacity: 0.4;
		transition: all 0.3s ease;

		&:global([data-letter='correct']) {
			opacity: 1;
		}

		&:global([data-letter='incorrect']) {
			color: hsl(var(--er));
			opacity: 1;
		}
	}

	:global([data-game='waiting for input'] .word) {
		color: hsl(var(--bc)) !important;
	}

	.caret {
		position: absolute;
		height: 1.8rem;
		top: 0;
		border-right: 1px solid hsl(var(--s));
		animation: caret 1s infinite;
		transition: all 0.2s ease;
	}

	@keyframes caret {
		0%,
		to {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}

	.cblur {
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(5px);
	}


	.center {
		justify-content: center !important;
	}
</style>
