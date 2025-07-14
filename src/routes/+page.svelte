<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import NavMenu from '$lib/components/nav-menu.svelte';
	import IconServer from 'lucide-svelte/icons/server';
	import Map from 'lucide-svelte/icons/map';
	import { Bot } from 'lucide-svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="A collection of blog posts." />
	<meta property="og:title" content="A collection of blog posts" />
	<meta property="og:description" content="A collection of blog posts" />
</svelte:head>

<Container>
	<NavMenu postTitle={data.posts} />

	<div class=" container mx-auto rounded-2xl px-4 py-16 lg:py-24">
		<!-- Hero Section -->
		<div class="mb-20 text-center">
			<h1 class="text-base-content mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
				Blog template powered by
				<span class="relative inline-block">
					<span
						class="from-base-content/80 via-base-content/60 to-base-content/80 bg-gradient-to-r bg-clip-text
						 text-orange-500"
					>
						SvelteKit
					</span>
					<span class="bg-base-content/10 absolute inset-x-0 bottom-1 h-3 -skew-x-12"></span>
				</span>
				and Markdown
			</h1>
			<p class="text-base-content/70 mx-auto max-w-2xl text-xl leading-relaxed">
				Discover powerful features that make your blog fast, SEO-friendly, and developer-focused
			</p>
		</div>

		<!-- Features Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
			<!-- SSR/SSG Card -->
			<div
				class="group bg-base-200 border-base-300 hover:border-primary/30 relative rounded-2xl border p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
			>
				<div
					class="bg-base-content/5 absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<div class="relative z-10">
					<div
						class="bg-primary/10 group-hover:bg-primary/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300"
					>
						<IconServer size={32} class="text-primary" />
					</div>
					<h3 class="text-base-content mb-4 text-2xl font-bold">SSR/SSG</h3>
					<p class="text-base-content/70 leading-relaxed">
						Server-side rendering and static generation for maximum performance and better indexing.
					</p>
				</div>
			</div>

			<!-- Robots Card -->
			<div
				class="group bg-base-200 border-base-300 hover:border-accent/30 relative rounded-2xl border p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
			>
				<div
					class="bg-base-content/5 absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<div class="relative z-10">
					<div
						class="bg-accent/10 group-hover:bg-accent/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300"
					>
						<Bot size={32} class="text-accent" />
					</div>
					<h3 class="text-base-content mb-4 text-2xl font-bold">Robots</h3>
					<p class="text-base-content/70 leading-relaxed">
						Indexing control with optimized robots.txt and custom settings for SEO.
					</p>
				</div>
			</div>

			<!-- Sitemap Card -->
			<div
				class="group bg-base-200 border-base-300 hover:border-success/30 relative rounded-2xl border p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl md:col-span-2 lg:col-span-1"
			>
				<div
					class="bg-base-content/5 absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
				<div class="relative z-10">
					<div
						class="bg-success/10 group-hover:bg-success/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300"
					>
						<Map size={32} class="text-success" />
					</div>
					<h3 class="text-base-content mb-4 text-2xl font-bold">Sitemap</h3>
					<p class="text-base-content/70 leading-relaxed">
						Automatic generation of dynamic sitemap for better crawling by search engines.
					</p>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="mt-20 text-center">
			<div
				class="bg-base-300/70 text-base-content/70 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
			>
				<div class="bg-success h-2 w-2 animate-pulse rounded-full"></div>
				Ready to start blogging
			</div>
			<p class="text-base-content/70 mx-auto mt-6 max-w-md text-lg">
				Start creating amazing content with our powerful and flexible blog template
			</p>
		</div>
	</div>
</Container>
