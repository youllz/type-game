<script>
	import { gameFocus, responsiveNav } from '$lib/store';
	import { fade } from 'svelte/transition';
	import Theme from './Theme.svelte';
</script>

<nav class="flex py-5 px-[5vw]  fixed  z-40 top-0 w-full items-center justify-between  ">
	<ul class="flex gap-3 items-center">
		<li>
			<a href="/" class="flex items-center">
				<span>
					<svg
						class="text-primary"
						xmlns="http://www.w3.org/2000/svg"
						width="42"
						height="42"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M6.71 9.29a1 1 0 0 0-1.42 0a1 1 0 0 0-.21.33a1 1 0 0 0 .21 1.09a1.15 1.15 0 0 0 .33.21A.84.84 0 0 0 6 11a1 1 0 0 0 .92-1.38a1 1 0 0 0-.21-.33ZM10 11a1 1 0 0 0 .92-1.38a1 1 0 0 0-.21-.33a1 1 0 0 0-.9-.29a.6.6 0 0 0-.19.06l-.18.09l-.15.12A1.05 1.05 0 0 0 9 10a1 1 0 0 0 1 1Zm-3.62 2.08a1 1 0 0 0-.76 0A1 1 0 0 0 5 14a1 1 0 0 0 1.38.92a1.15 1.15 0 0 0 .33-.21A1 1 0 0 0 7 14a1 1 0 0 0-.29-.71a.93.93 0 0 0-.33-.21ZM14 13h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Zm.71-3.71a1 1 0 0 0-1.42 0a1 1 0 0 0-.21.33A1 1 0 1 0 15 10a.84.84 0 0 0-.08-.38a1 1 0 0 0-.21-.33Zm3.85 3.88a.76.76 0 0 0-.18-.09a1 1 0 0 0-.76 0a1.15 1.15 0 0 0-.33.21A1.05 1.05 0 0 0 17 14a1 1 0 1 0 2 0a1.05 1.05 0 0 0-.29-.71ZM20 5H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm1 11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1Zm-2.29-6.71A1 1 0 0 0 17 10a1 1 0 1 0 1.92-.38a1 1 0 0 0-.21-.33Z"
						/></svg
					>
				</span>
				<h1 class="text-2xl">typegame</h1>
			</a>
		</li>
		{#if $gameFocus}
			<li class="Icon" transition:fade>
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M3 17h18v2H3v-2zm0-6h3v3H3v-3zm5 0h3v3H8v-3zM3 5h3v3H3V5zm10 0h3v3h-3V5zm5 0h3v3h-3V5zm-5 6h3v3h-3v-3zm5 0h3v3h-3v-3zM8 5h3v3H8V5z"
					/></svg
				>
			</li>
			
		{/if}
	</ul>

	{#if $gameFocus}
		<ul class="  flex gap-3 items-center" transition:fade>
			<li>
				<Theme/>
			</li>
			<li class="Btn">
				<Theme />
			</li>
			<li class="Btn">
				<button
					class="hover:text-secondary"
					on:click={() => {
						$responsiveNav = !$responsiveNav;
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"
						><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg
					>
				</button>
			</li>
		</ul>
	{/if}
</nav>

<style>
	.Btn {
		display: none;
	}

	@media (max-width: 750px) {
		.Btn {
			display: flex;
		}

		.Icon {
			display: none;
		}
	}
</style>
