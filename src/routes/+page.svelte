<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import NavMenu from '$lib/components/nav-menu.svelte';
	import type { Post } from '$lib/types';
	import IconServer from 'lucide-svelte/icons/server';
	import Map from 'lucide-svelte/icons/map';
	import { Bot } from 'lucide-svelte';
	let { data } = $props() as { data: { posts: Post[] } };
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="A collection of blog posts." />
	<meta property="og:title" content="A collection of blog posts" />
	<meta property="og:description" content="A collection of blog posts" />
</svelte:head>

<Container>
	<NavMenu postTitle={data.posts} />
	<section class="container">
		<div class="container mx-auto mt-4 px-4 py-12">
			<h2 class="mb-16 text-center text-3xl font-bold md:text-4xl">
				Blog template powered by <span class="underline decoration-orange-500">Svelekit</span> and Markdown
			</h2>

			<div class="mt-2 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				<div class="card bg-base-100 shadow-md">
					<div class="card-body items-center text-center">
						<div class=" mb-4 rounded-full p-4">
							<IconServer size={48} class="text-secondary" />
						</div>
						<h3 class="card-title mb-2 text-xl font-bold">SSR/SSG</h3>
						<p class="mb-4">
							Server-side rendering and static generation for maximum performance and better
							indexing.
						</p>
					</div>
				</div>

				<div class="card bg-base-100 l shadow-md">
					<div class="card-body items-center text-center">
						<div class=" mb-4 rounded-full p-4">
							<Bot size={48} class="text-info" />
						</div>
						<h3 class="card-title mb-2 text-xl font-bold">Robots</h3>
						<p class="mb-4">
							Indexing control with optimized robots.txt and custom settings for SEO.
						</p>
					</div>
				</div>

				<div class="card bg-base-100 shadow-md">
					<div class="card-body items-center text-center">
						<div class=" mb-4 rounded-full p-4">
							<Map size={48} class="text-success" />
						</div>
						<h3 class="card-title mb-2 text-xl font-bold">Sitemap</h3>
						<p class="mb-4">
							Automatic generation of dynamic sitemap for better crawling by search engines.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</Container>
