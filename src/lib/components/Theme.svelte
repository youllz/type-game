<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';

	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	];

	let searchTheme: string[];

	let typeInput = '';
	let themeName: string | null;

	$: searchTheme = themes.filter((theme) => theme.includes(typeInput));

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};

	function getBtnText(e: MouseEvent) {
		const elTarget = e.target as HTMLButtonElement;
		themeName = elTarget.textContent;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label for="my-modal-5" class=" relative z-40 cursor-pointer my-10 flex gap-2 items-center">
	<span>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M12 22q-2.05 0-3.875-.788t-3.188-2.15q-1.362-1.362-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175Q6.4 3.575 8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9q1.337 1.212 2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.313.125t-.087.275q0 .3.375.863t.375 1.287q0 1.25-.688 1.85T12 22Zm-5.5-9q.65 0 1.075-.425T8 11.5q0-.65-.425-1.075T6.5 10q-.65 0-1.075.425T5 11.5q0 .65.425 1.075T6.5 13Zm3-4q.65 0 1.075-.425T11 7.5q0-.65-.425-1.075T9.5 6q-.65 0-1.075.425T8 7.5q0 .65.425 1.075T9.5 9Zm5 0q.65 0 1.075-.425T16 7.5q0-.65-.425-1.075T14.5 6q-.65 0-1.075.425T13 7.5q0 .65.425 1.075T14.5 9Zm3 4q.65 0 1.075-.425T19 11.5q0-.65-.425-1.075T17.5 10q-.65 0-1.075.425T16 11.5q0 .65.425 1.075T17.5 13Z"
			/></svg
		>
	</span>
	<span>{themeName ?? 'Theme'}</span>
</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-5" class="modal-toggle" />
<label for="my-modal-5" class="modal cursor-pointer">
	<label
		class="modal-box w-[40rem] max-w-5xl h-[calc(100vh-13rem)] relative overflow-y-scroll"
		for=""
	>
		<div class="w-full flex items-center">
			<span>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
					/></svg
				>
			</span>
			<input
				bind:value={typeInput}
				type="text"
				name=""
				id=" "
				class="w-full outline-none bg-transparent caret-[hsl(var(--s))] "
				placeholder="Type to search"
			/>
		</div>
		<form method="POST" use:enhance={submitUpdateTheme}>
			{#each searchTheme as theme}
				<button
					on:click={getBtnText}
					formaction="?/setTheme&theme={theme}&redirectTo={$page.url.pathname}"
					class="w-full p-1 hover:bg-secondary flex items-center justify-start"
				>
					{theme}
				</button>
			{/each}
		</form>
	</label>
</label>
