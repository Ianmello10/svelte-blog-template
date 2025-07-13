// src/routes/blog/[slug]/+page.server.js
import { compile } from 'mdsvex';
import { readSync } from 'to-vfile';
import { matter } from 'vfile-matter';
import { error } from '@sveltejs/kit';
import path from 'path';
import fs from 'fs';
import remarkFlexibleToc from 'remark-flexible-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { PostMetadata } from '$lib/types.js';

const postsDir = path.resolve(process.cwd(), 'src/blog/posts');

export async function load({ params }) {
	const { slug } = params;
	const filepath = path.join(postsDir, `${slug}.md`) as string;

	if (!fs.existsSync(filepath)) {
		error(404, 'Post not found');
	}

	try {
		const file = readSync(filepath, 'utf-8') as any;
		matter(file, { strip: true });
		const toc: PostMetadata['toc'] = [];

		const compiled = await compile(file, {
			extensions: ['.md'],
			remarkPlugins: [[remarkFlexibleToc, { tocRef: toc, skipLevels: [1] }]] as any,
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]] as any
		});

		if (!compiled || !compiled.code) {
			error(500, 'Failed to compile Markdown.');
		}

		return {
			content: compiled.code,

			meta: {
				...file.data.matter,
				toc
			} as PostMetadata
		};
	} catch (e) {
		console.error(e);
		error(500, `Error processing post: ${slug}`);
	}
}

export function entries() {
	const files = fs.readdirSync(postsDir);

	return files
		.filter((file) => path.extname(file) === '.md')
		.map((file) => {
			const slug = path.basename(file, '.md');
			return { slug };
		});
}

export const prerender = true;
