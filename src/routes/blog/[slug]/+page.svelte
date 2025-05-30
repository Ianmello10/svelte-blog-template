<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import NavMenu from '$lib/components/nav-menu.svelte';
	import { formatReadableDate } from '$lib/format-date';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:image" content="" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href={`https://seudominio.com/${data.meta.slug}`} />
</svelte:head>

<Container>
	<NavMenu postTitle />
	<article class="mt-10 w-full">
		<span class="bg-base-100">{formatReadableDate(data.meta.date)}</span>
		<div class="prose prose-lg box-border !w-full max-w-none overflow-hidden break-words">
			<data.content />
		</div>
	</article>
</Container>
