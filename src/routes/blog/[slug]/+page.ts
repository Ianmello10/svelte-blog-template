import type { Post } from '$lib/types.js';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export async function load({ params }) {
	const post: Post = await import(`../../../blog/posts/${params.slug}.md`);

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		content: post.default,
		meta: post.metadata
	};
}

export const entries: EntryGenerator = async () => {
	const modules = import.meta.glob('../../../blog/posts/*.md');
	return Object.keys(modules).map((path) => {
		const slug = path.split('/').pop()?.replace('.md', '');

		// Ensure slug is always a string (not undefined)
		if (!slug) throw new Error(`Invalid post path: ${path}`);
		return { slug };
	});
};

export const prerender = true;
