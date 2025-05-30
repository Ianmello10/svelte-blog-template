import type { Component } from 'svelte';

export type Categories = 'sveltekit' | 'svelte';

export type PostMetadata = {
	title: string;
	author: string;
	description: string;
	date: string;
	updatedDate?: string;
	categories: Categories[];
	published: boolean;
	slug: string;
};
export interface Post {
	metadata: PostMetadata;
	default: Component;
}
