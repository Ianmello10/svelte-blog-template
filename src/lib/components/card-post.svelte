<script lang="ts">
	import type { PostMetadata } from '$lib/types';

	let { title, description, slug, categories }: Omit<PostMetadata, 'published' | 'date'> = $props();
</script>

<article
	class="group bg-base-200 border-base-300/50 rounded-lg border p-6
         hover:shadow-sm"
>
	<h3 class="text-base-content mb-2 text-lg font-medium">{title}</h3>

	<div class="mb-3 flex flex-wrap gap-1">
		{#each categories as c}
			<span class="badge primary badge-sm text-primary-content text-xs">
				{c}
			</span>
		{/each}
	</div>

	<p class="text-muted mb-4 text-sm leading-relaxed">{description}</p>

	<a
		href="/blog/{slug}"
		class="  text-content inline-flex items-center text-xs font-medium transition-colors"
	>
		Read more
		<svg
			class="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</a>
</article>
