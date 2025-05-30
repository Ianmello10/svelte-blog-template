<script lang="ts">
	import type { PostMetadata } from '$lib/types';

	let { title, description, slug, categories }: Omit<PostMetadata, 'published' | 'date'> = $props();
</script>

<div class="card bg-base-100 w-full shadow-md">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<div class="mt-1 flex">
			{#each categories as category}
				<span class="badge badge-sm">{category}</span>
			{/each}
		</div>

		<p class="mt-1">{description}</p>
		<div class="card-actions justify-start">
			<a href="/blog/{slug}" class="link mt-2">Click me</a>
		</div>
	</div>
</div>
