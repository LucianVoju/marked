import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load = (async ({ params, fetch }) => {
	const json = await fetch('/data/input.md');
	const text = await json.text();

	const tokens = marked.lexer(text);

	const extractTimestampsAndText = (text: string) => {
		const regex = /<!-- \[t(\d{2}:\d{2}:\d{2})\] --> (.*?) <!-- \[t(\d{2}:\d{2}:\d{2})\] -->/g;
		const matches = text.matchAll(regex);

		const result: { time: string; text: string }[] = [];

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
	};

	marked.walkTokens(tokens, (token) => {
		if (token.type === 'html') {
			token.type = 'paragraph';
			token.paragraphData = extractTimestampsAndText(token.text);
		}
	});

	console.log(tokens);

	return {
		tokens
	};
}) satisfies PageLoad;
