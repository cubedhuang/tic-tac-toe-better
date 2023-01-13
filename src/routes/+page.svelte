<script lang="ts">
	import { Board } from '$lib/Board';

	let board = new Board(10, 12);
</script>

<div
	class="grid grid-cols-3 gap-2 max-w-md"
	style:grid-template-columns="repeat({board.cols}, minmax(0, 1fr))"
>
	{#each board.spaces as space}
		<button
			on:click={() => (space.value = 1)}
			class="aspect-square text-xl bg-green-100 border border-green-400
				hover:bg-green-200 active:bg-green-300 transition-colors"
		>
			{space}
		</button>
	{/each}
</div>
