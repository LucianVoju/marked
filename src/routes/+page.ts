import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load = (async ({ params, fetch }) => {
	const json = await fetch('/data/input.md');
	const text = await json.text();

	const tokens = marked.lexer(text);

	function extractTimestampsAndText(text: string) {
		const regex = /<!-- \[t(\d{2}:\d{2}:\d{2})\] --> (.*?) <!-- \[t(\d{2}:\d{2}:\d{2})\] -->/g;
		const matches = text.matchAll(regex);

		const result = [];

		for (const match of matches) {
			const timeStart = match[1];
			const timeEnd = match[3];
			const text = match[2].trim();

			result.push({
				time: `[t${timeStart}]`,
				text: text
			});
		}

		return result;
	}

	const data = tokens.map((token) => {
		if (token.type === 'heading') {
			return {
				type: 'heading',
				text: token.text
			};
		}

		if (token.type === 'html') {
			return {
				type: 'paragraph',
				text: extractTimestampsAndText(token.text)
			};
		}
	});

	console.log(data);

	return {
		post: {
			title: `Title for ${params.slug} goes here`,
			content: `Content for ${params.slug} goes here`
		}
	};
}) satisfies PageLoad;
