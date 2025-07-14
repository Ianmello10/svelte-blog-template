<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import NavMenu from '$lib/components/nav-menu.svelte';
	import TocComponent from '$lib/components/toc-component.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:image" content="" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href={`https://seudominio.com/ ${data.meta.slug}`} />
</svelte:head>

<Container>
	<NavMenu postTitle={[]} />

	<!-- Back to blog link -->
	<div class="mt-10 mb-4">
		<a
			href="/blog"
			class="group text-base-content hover:text-primary inline-flex items-center
             text-sm transition-colors"
			aria-label="Back to blog"
		>
			<svg
				class="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to blog
		</a>
	</div>

	<article class="relative pb-20">
		<!-- Article Header -->
		<header class="border-base-300 mb-10 border-b pb-8">
			<!-- Publication Date -->
			<div class="mt-6 mb-6">
				<time datetime={data.meta.date} class="badge badge-ghost p-2 py-3 text-sm">
					<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					{data.meta.date}
				</time>
			</div>

			<!-- Title -->
			<h1 class="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl">
				{data.meta.title}
			</h1>

			<!-- Description -->
			{#if data.meta.description}
				<p class="text-muted max-w-3xl text-xl leading-relaxed">
					{data.meta.description}
				</p>
			{/if}

			<!-- Categories -->
			{#if data.meta.categories && data.meta.categories.length > 0}
				<div class="mt-6 flex flex-wrap gap-2">
					{#each data.meta.categories as category}
						<span class="badge badge-ghost text-content text-sm">
							{category}
						</span>
					{/each}
				</div>
			{/if}
		</header>

		<!-- Decorative gradient orbs -->
		<TocComponent tocItems={data.meta.toc} />

		<!-- Article Content -->
		<div class="prose prose-lg mt-14 max-w-none">
			<div
				class="
          [&>h1]:text-base-content [&>h2]:text-base-content [&>h3]:text-base-content
          [&>blockquote]:border-primary [&>blockquote]:bg-base-200
          [&>pre]:bg-base-200 [&>code]:bg-base-200
          [&>a]:text-primary hover:[&>a]:text-accent
          [&>hr]:border-base-300
          [&>table]:border-base-300
          [&>th]:border-base-300 [&>td]:border-base-300
          [&>a]:underline-offset-4
        "
			>
				{@html data.content}
			</div>
		</div>

		<!-- Article Footer -->
		<footer class="border-base-300 mt-16 border-t pt-8">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<!-- Reading progress -->
				<span class="text-muted flex items-center gap-2 text-sm"> Thanks for reading! </span>

				<!-- Back to top -->
				<button
					onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					class="
            btn btn-ghost btn-sm btn-circle
            hover:bg-primary/10 hover:text-primary
            transition-colors
          "
				>
					↑
				</button>
			</div>
		</footer>
	</article>
</Container>
