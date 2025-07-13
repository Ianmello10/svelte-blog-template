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
			class="group inline-flex items-center text-sm transition-colors duration-200"
			aria-label="Back to blog"
		>
			<svg
				class="text-neutral mr-1 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110 hover:text-zinc-500"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			<span
				class="text-neutral duration-200 group-hover:text-zinc-500 group-hover:opacity-100 hover:transition-transform"
				>Back to blog</span
			>
		</a>
	</div>

	<article class="relative pb-20">
		<!-- Article Header -->
		<header class="border-neutral mb-10 border-b pb-8">
			<!-- Publication Date -->
			<div class="mt-6 mb-6">
				<time
					datetime={data.meta.date}
					class="badge badge-soft badge-ghost inline-flex items-center
					 gap-2 rounded-full px-3 py-4 text-sm font-medium"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
			<h1
				class="text-foreground mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl"
			>
				{data.meta.title}
			</h1>

			<!-- Description -->
			{#if data.meta.description}
				<p class="text-muted-foreground max-w-3xl text-xl leading-relaxed">
					{data.meta.description}
				</p>
			{/if}

			<!-- Categories if they exist -->
			{#if data.meta.categories && data.meta.categories.length > 0}
				<div class="mt-6 flex flex-wrap gap-2">
					{#each data.meta.categories as category}
						<span
							class="badge badge-soft badge-ghost text-primary
							inline-flex items-center rounded-full border px-3 py-2 text-sm font-medium"
						>
							{category}
						</span>
					{/each}
				</div>
			{/if}
		</header>
		<TocComponent tocItems={data.meta.toc} />
		<!-- Article Content -->
		<div class="relative mt-10">
			<!-- Decorative gradient -->
			<div
				class="from-primary/10 absolute -top-20 -left-20 -z-10 h-40 w-40 rounded-full bg-gradient-to-br to-transparent blur-3xl"
			></div>
			<div
				class="from-accent/10 absolute -right-20 -bottom-20 -z-10 h-40 w-40 rounded-full bg-gradient-to-br to-transparent blur-3xl"
			></div>

			<!-- Content wrapper -->
			<div class="prose prose-lg prose-slate dark:prose-invert max-w-none">
				<!-- Custom prose styling -->
				<div
					class="
                    [&>h1]:text-foreground [&>h2]:text-foreground [&>h3]:text-foreground [&>p]:text-foreground [&>li]:text-foreground
                    [&>blockquote]:border-primary [&>blockquote]:bg-muted/30 [&>pre]:bg-muted [&>code]:bg-muted [&>a]:text-primary
                    [&>a]:decoration-primary/30 hover:[&>a]:decoration-primary [&>hr]:border-border [&>table]:border-border [&>thead]:bg-muted
                    [&>th]:border-border [&>td]:border-border [&>a]:underline
                    [&>a]:underline-offset-4 [&>a]:transition-colors
                    [&>blockquote]:my-6 [&>blockquote]:rounded-r-lg
                    [&>blockquote]:border-l-4 [&>blockquote]:py-2 [&>blockquote]:pl-6 [&>code]:rounded [&>code]:px-2 [&>code]:py-1 [&>code]:font-mono
                    [&>code]:text-sm [&>h1]:mt-12 [&>h1]:mb-6 [&>h1]:text-3xl [&>h1]:font-bold [&>h2]:mt-10
                    [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-xl
                    [&>h3]:font-semibold [&>hr]:my-12 [&>img]:my-8 [&>img]:rounded-lg [&>img]:shadow-md [&>li]:mb-2
                    [&>ol]:my-6 [&>p]:mb-6 [&>p]:leading-relaxed
                    [&>pre]:my-6 [&>pre]:overflow-x-auto
                    [&>pre]:rounded-lg [&>pre]:border [&>pre]:p-4 [&>table]:my-6 [&>table]:border-collapse [&>table]:overflow-hidden
                    [&>table]:rounded-lg
                    [&>table]:border [&>td]:border [&>td]:px-4 [&>td]:py-2 [&>th]:border [&>th]:px-4
                    [&>th]:py-2 [&>th]:text-left [&>th]:font-semibold [&>ul]:my-6
                "
				>
					{@html data.content}
				</div>
			</div>
		</div>

		<!-- Article Footer -->
		<footer class="border-neutral mt-16 border-t pt-8">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<!-- Reading progress indicator -->
				<div class="text-muted-foreground flex items-center gap-2 text-sm">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Thanks for reading!</span>
				</div>

				<!-- Back to top -->
				<button
					onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					class="btn hover:text-foreground bg-muted/50 hover:bg-muted inline-flex
					items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
				>
					<span>Back to top</span>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 11l5-5m0 0l5 5m-5-5v12"
						/>
					</svg>
				</button>
			</div>
		</footer>
	</article>
</Container>
