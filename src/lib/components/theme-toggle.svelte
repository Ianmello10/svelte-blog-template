<!-- src/lib/ThemeToggle.svelte -->
<script>
	import { Sun, Moon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let theme = 'sleek-dark';

	onMount(() => {
		// Verifica se há um tema salvo no localStorage
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			theme = savedTheme;
			document.documentElement.setAttribute('data-theme', theme);
		}
	});

	function toggleTheme() {
		theme = theme === 'monochrome-pro' ? 'monochrome-pro-light' : 'monochrome-pro';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<label class="swap swap-rotate mx-2">
	<input type="checkbox" on:change={toggleTheme} checked={theme === 'sleek-dark'} />

	<!-- Ícone de sol -->
	<Sun class="swap-on t h-4 w-4" />

	<!-- Ícone de lua -->
	<Moon class="swap-off t h-4 w-4" />
</label>
