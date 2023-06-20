<script lang="ts">
	import type { PageData } from './$types';

	import Heading from '$lib/components/Heading.svelte';
	import Paragraph from '$lib/components/Paragraph.svelte';

	export let data: PageData;

	let selectedTimeStamp: string = 'none';

	const onParagraphClicked = (e: CustomEvent) => {
		const timeComponents = e.detail.timestamp.match(/t(\d{2}):(\d{2}):(\d{2})/);
		const hours = timeComponents[1];
		const minutes = timeComponents[2];
		const seconds = timeComponents[3];

		selectedTimeStamp = `${hours}:${minutes}:${seconds}`;
	};

	$: ({ tokens } = data);
</script>

<div class="min-h-full flex flex-col relative">
	<div class="fixed top-0 right-0 pr-2">
		<dl class="">
			<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
				<dt class="truncate text-sm font-medium text-gray-500">Selected timestamp</dt>
				<dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
					{selectedTimeStamp}
				</dd>
			</div>
		</dl>
	</div>

	<main class="container">
		<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div class="mt-16 max-w-2xl">
				{#each tokens as token}
					{#if token.type === 'heading'}
						<Heading {token} />
					{:else if token.type === 'paragraph'}
						<Paragraph {token} on:paragraph-clicked={onParagraphClicked} />
					{/if}
				{/each}
			</div>
		</div>
	</main>
</div>
