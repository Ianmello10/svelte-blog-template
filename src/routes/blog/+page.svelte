<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import NavMenu from '$lib/components/nav-menu.svelte';
	import CardPost from '$lib/components/card-post.svelte';
	import type { Post } from '$lib/types';

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
		<ul class="mt-10 flex w-full flex-col justify-between">
			{#each data.posts as post}
				<li class="mb-10 w-full">
					<CardPost
						title={post.metadata.title}
						description={post.metadata.description}
						author={post.metadata.author}
						slug={post.metadata.slug}
						categories={post.metadata.categories}
					/>
				</li>
			{/each}
		</ul>
	</section>
</Container>
