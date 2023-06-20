<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let token: any;

	const dispatch = createEventDispatcher();
</script>

<p
	class="pt-6 selection:bg-fuchsia-300 selection:text-fuchsia-900"
	on:mousedown={() => dispatch('paragraph-clicked', { timestamp: token.paragraphData[0].time })}
>
	{#each token.paragraphData as data}
		<span
			on:mousedown|stopPropagation={() => dispatch('paragraph-clicked', { timestamp: data.time })}
			>{data.text}
		</span>
	{/each}
</p>
