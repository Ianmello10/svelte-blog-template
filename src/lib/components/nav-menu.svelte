<script lang="ts">
	import { page } from '$app/state';
	import type { Post } from '$lib/types';
	import ThemeToggle from './theme-toggle.svelte';
	import type { Attachment } from 'svelte/attachments';

	const pageId = page.route.id;

	let { postTitle } = $props();
	let search = $state<string>('');
	let showDropdown = $state<boolean>(false);

	const clickOutside: Attachment = (node) => {
		function handleClick(event: MouseEvent) {
			// If the clicked element is not inside `node`, close dropdown
			if (!(event.target as HTMLElement)?.closest?.(node.tagName)) {
				showDropdown = false;
			}
		}

		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	};

	// Derived list of posts matching the search term:
	const filtered = $derived(() => {
		if (!Array.isArray(postTitle) || search.length === 0) return [];
		return postTitle.filter((item) =>
			item.metadata.title.toLowerCase().includes(search.toLowerCase())
		) as Post[];
	});
</script>

<nav
	class="navbar bg-base-100/80 shadow-base-300/10
	 border-base-300/70 sticky top-4 z-50 mx-auto mt-4 h-10 w-full max-w-7xl rounded-3xl
	  border shadow backdrop-blur-md
	 "
>
	<div class="flex w-full items-center justify-between px-4 py-2">
		<a class=" btn btn-ghost text-md" href="/">Svelblog</a>

		<div class="flex items-center justify-between">
			{#if pageId === '/blog'}
				<!-- Dropdown do DaisyUI -->
				<label
					class="input bg-base-200 border-base-300 text-base-content border"
					{@attach clickOutside}
				>
					<svg
						class="text-base-content h-[1em] opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g
							stroke-linejoin="round"
							stroke-linecap="round"
							stroke-width="2.5"
							fill="none"
							stroke="currentColor"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</g>
					</svg>
					<input
						type="search"
						class="text-base-content placeholder-base-content/60 bg-transparent px-2 focus:outline-none"
						placeholder="Search"
						bind:value={search}
						onfocus={() => (showDropdown = true)}
					/>
					<span class="kbd-group flex w-10 justify-end gap-1">
						{#if showDropdown === false && search.length === 0}
							<kbd class="kbd kbd-sm bg-base-300 text-base-content">⌘</kbd>
							<kbd class="kbd kbd-sm bg-base-300 text-base-content">K</kbd>
						{/if}
					</span>

					{#if showDropdown === true && filtered().length > 0}
						<ul
							class="dropdown-ul bg-base-100 border-base-300 absolute top-full left-0 z-10 mt-2 w-full rounded-xl border shadow"
						>
							{#each filtered() as post}
								<li class="hover:bg-base-200 cursor-pointer overflow-hidden px-2 py-2">
									<a href="/blog/{post.metadata.slug}" class="text-base-content box-border">
										{post.metadata.title}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</label>
			{:else}
				<a class="btn btn-sm btn-ghost text-base-content" href="/blog">Blog</a>
			{/if}
			<ThemeToggle />
		</div>
	</div>
</nav>
