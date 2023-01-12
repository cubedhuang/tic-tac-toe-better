<script lang="ts">
	let rows = 10;
	let cols = 10;

	let board = Array(rows).fill(0).map(() => Array(cols).fill(0))
</script>

<div class="grid grid-cols-3 aspect-square gap-2 max-w-md" style:grid-template-columns="repeat({cols}, minmax(0, 1fr))">
	{#each board as row}
		{#each row as space}
			<button
				on:click={() => space++}
				class="text-xl bg-green-100 border border-green-400
					hover:bg-green-200 active:bg-green-300 transition-colors"
			>
				{space}
			</button>
		{/each}
	{/each}
</div>
