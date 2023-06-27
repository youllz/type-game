<script>
	import { gameFocus, responsiveNav } from '$lib/store';
	import { fade } from 'svelte/transition';
	import Theme from './Theme.svelte';
</script>

<nav class="flex py-5 px-[5vw] w-screen items-center justify-between ">
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
			<li class="Icon" transition:fade>
				<svg
					class="hover:secondary"
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="m12 8l3 5.2l3-2.7l-.7 3.5H6.7L6 10.5l3 2.7L12 8m0-4l-3.5 6L3 5l2 11h14l2-11l-5.5 5L12 4m7 14H5v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-1Z"
					/></svg
				>
			</li>
			<li class="Icon" transition:fade>
				<svg
					class="hover:secondary"
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 20 20"
					><g fill="currentColor"
						><path
							fill-rule="evenodd"
							d="M10 7a2 2 0 0 1 2 2v7a2 2 0 1 1-4 0V9a2 2 0 0 1 2-2Z"
							clip-rule="evenodd"
						/><path d="M12 4a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" /></g
					></svg
				>
			</li>
			<li class="Icon" transition:fade>
					<svg
						class="hover:secondary"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						viewBox="0 2.4 24 24"
						><path
							fill="currentColor"
							d="m9.25 24.4l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 21.775l-2.75-4.75l2.575-1.95Q4.5 14.9 4.5 14.738v-.675q0-.163.025-.338l-2.575-1.95l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.675q0 .162-.05.337l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 14.4q0-1.45-1.025-2.475T12.05 10.9q-1.475 0-2.488 1.025T8.55 14.4q0 1.45 1.012 2.475T12.05 17.9Z"
						/></svg
					>
			</li>
		{/if}
	</ul>

	{#if $gameFocus}
		<ul class="  flex gap-3 items-center" transition:fade>
			<li class="Icon">
				<svg
					class="hover:text-secondary"
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z"
					/></svg
				>
			</li>
			<li class="Icon">
				<svg
					class="hover:text-secondary"
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					><g fill="none"
						><path
							d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
						/><path
							fill="currentColor"
							d="M16 14a5 5 0 0 1 4.995 4.783L21 19v1a2 2 0 0 1-1.85 1.995L19 22H5a2 2 0 0 1-1.995-1.85L3 20v-1a5 5 0 0 1 4.783-4.995L8 14h8ZM12 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z"
						/></g
					></svg
				>
			</li>
			<li class="Btn">
				<Theme/>
			</li>
			<li class="Btn">
				<button class="hover:text-secondary" on:click={() => {$responsiveNav = !$responsiveNav}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
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
