import type { Post } from '$lib/types.js';
import { error } from '@sveltejs/kit';

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
