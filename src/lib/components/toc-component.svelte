<script lang="ts">
	import type { TocItem } from '$lib/types';
	import { slide, fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { BookOpen, ChevronDown, List } from 'lucide-svelte';

	let { tocItems = [] }: { tocItems?: TocItem[] } = $props();

	const minDepth = tocItems.length > 0 ? Math.min(...tocItems.map((item) => item.depth)) : 0;

	let isExpanded = $state(false);

	const totalSections = tocItems.length;
	const mainTopics = tocItems.filter((item) => item.depth <= minDepth + 1).length;
	const estimatedReadTime = Math.ceil(totalSections * 0.5);

	function scrollToSection(href: string) {
		const slug = href.slice(1);
		const element = document.getElementById(slug);
		if (!element) return;

		const offset = 120;
		const elementTop = element.getBoundingClientRect().top + window.scrollY;
		const scrollTo = elementTop - offset;

		window.scrollTo({
			top: Math.max(0, scrollTo),
			behavior: 'smooth'
		});
	}
</script>

{#if tocItems && tocItems.length > 0}
	<div
		in:fly={{ y: 20, duration: 400, easing: quintOut }}
		class="bg-base-100 border-base-300 w-full rounded-lg border shadow-sm backdrop-blur-sm"
	>
		<button
			class="hover:bg-base-200 flex w-full items-center justify-between p-4 text-left transition-colors duration-200"
			onclick={() => (isExpanded = !isExpanded)}
			aria-expanded={isExpanded}
			aria-controls="toc-content"
		>
			<div class="flex items-center gap-3">
				<div class="bg-primary/10 rounded-lg p-2">
					<BookOpen class="text-primary h-4 w-4" />
				</div>
				<div>
					<h3 class="text-base-content text-sm font-semibold">Table of Contents</h3>
					<p class="text-base-content text-xs">
						{totalSections} sections • Reading time of {estimatedReadTime} min
					</p>
				</div>
			</div>

			<div class="flex items-center gap-2">
				<span class="text-base-content hidden text-xs sm:inline">
					{isExpanded ? 'Recolher' : 'Expandir'}
				</span>
				<ChevronDown
					class={`text-base-content h-4 w-4 transition-transform duration-300${isExpanded ? ' rotate-180' : ''}`}
				/>
			</div>
		</button>

		<!-- Conteúdo expansível do ToC -->
		{#if isExpanded}
			<div
				id="toc-content"
				transition:slide={{ duration: 300, easing: quintOut }}
				class="overflow-hidden"
			>
				<div class="px-4 pb-4">
					<div class="border-base-300 border-t pt-4">
						<nav>
							<ul class="space-y-1">
								{#each tocItems as item, index (item.href)}
									<!-- Animação de entrada em cascata para cada item -->
									<li in:fly={{ x: -15, delay: index * 40, duration: 250, easing: quintOut }}>
										<button
											onclick={() => scrollToSection(item.href)}
											class="group text-base-content hover:bg-base-200 w-full rounded-md px-3 py-2 text-left text-sm transition-colors duration-200"
											style="padding-left: {12 + (item.depth - minDepth) * 16}px;"
										>
											<div class="flex items-start gap-3">
												<!-- Indicador de nível -->
												<div class="mt-1.5 flex items-center">
													<!-- svelte-ignore element_invalid_self_closing_tag -->
													<div
														class={{
															'group-hover:bg-primary h-1.5 w-1.5 rounded-full transition-colors duration-200': true,
															'bg-base-content/50': item.depth - minDepth === 0,
															'bg-base-content/30': item.depth - minDepth === 1,
															'bg-base-content/20': item.depth - minDepth >= 2
														}}
													/>
												</div>

												<!-- Conteúdo do item -->
												<div class="min-w-0 flex-1">
													<span
														class="group-hover:text-base-content leading-relaxed transition-colors duration-200"
														class:font-medium={item.depth - minDepth === 0}
													>
														{item.value}
													</span>
												</div>
											</div>
										</button>
									</li>
								{/each}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		{/if}

		<div class="mb-2 h-5">
			{#if !isExpanded}
				<div transition:fade={{ duration: 70, delay: 10 }} class="collapse mt-2 px-4 pb-2">
					<div class="text-base-content flex items-center justify-between text-xs">
						<span>Click to see all sections</span>
						<div class="flex items-center gap-2">
							<List class="text-neutral-content/70 h-3 w-3" />
							<span>{mainTopics} main topics</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
