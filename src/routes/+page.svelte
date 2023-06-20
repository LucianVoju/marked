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

<div class="min-h-full flex flex-col">
	<nav
		class="border-b border-gray-200 bg-white fixed top-0 h-[64px] w-full shadow-md flex items-center justify-end"
	>
		<div class=" px-4 sm:px-6 lg:px-8">selected timestamp: {selectedTimeStamp}</div>
	</nav>

	<div class="py-[84px]">
		<main>
			<div class="mx-auto max-w-7xl sm:px-6 lg:px-8 container">
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
</div>
