<script lang="ts">
	import type { PostMetadata } from '$lib/types';

	let { title, description, slug, categories }: Omit<PostMetadata, 'published' | 'date'> = $props();
</script>

<article
	class="card bg-base-100 border-base-300 border shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
>
	<div class="card-body p-5">
		<!-- Título -->
		<h3 class="card-title text-base-content text-lg font-semibold">{title}</h3>

		<!-- Categorias -->
		<div class="mt-1 flex flex-wrap gap-2">
			{#each categories as category}
				<span class="badge badge-soft badge-sm">{category}</span>
			{/each}
		</div>

		<!-- Descrição -->
		<p class="text-neutral-content mt-2 text-sm leading-relaxed">{description}</p>

		<!-- Ação -->
		<div class="card-actions mt-4 justify-start">
			<a href="/blog/{slug}" class="btn bg-base-200 btn-sm transition-none">
				Read post
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="ml-1 h-4 w-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
					/>
				</svg>
			</a>
		</div>
	</div>
</article>
