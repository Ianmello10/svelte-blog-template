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
	toc: TocItem[];
};
export interface Post {
	metadata: PostMetadata;
	default: Component;
}

export type TocItem = {
	value: string;
	depth: number;
	href: string;
};
