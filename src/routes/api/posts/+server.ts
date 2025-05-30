import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';
import type { Component } from 'svelte';
async function getPosts(): Promise<Post[]> {
	let posts: Post[] = [];

	const paths: Record<string, Post> = import.meta.glob('/src/blog/posts/*.md', {
		eager: true
	});

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').slice(-1)[0]?.replace('.md', '');

		if (!file || typeof file !== 'object' || !('metadata' in file) || !slug) continue;

		const postFrontMatter = { ...file.metadata, slug } as Post['metadata'];
		const postContent = file.default as Component;

		const post: Post = {
			metadata: postFrontMatter,
			default: postContent
		};

		if (post.metadata.published) posts.push(post);
	}

	posts = posts.sort((a, b) => {
		return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
	});

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
