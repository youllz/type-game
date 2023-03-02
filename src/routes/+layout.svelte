<script>
	import '../app.postcss';
	import Nav from '../lib/components/Nav.svelte';
	import {gameFocus, inputFocus} from '$lib/store'
	
</script>


	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<header class="w-full" on:click={() => {inputFocus.isFocus()}}>
		<Nav/>
	</header>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:mousemove={() => {gameFocus.reset()}} on:click={() => {inputFocus.isFocus()}} class="w-full">
	
	<slot />
</main>






