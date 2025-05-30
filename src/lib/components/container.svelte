<script>
	let { children } = $props();
</script>

<div class="mx-auto h-screen w-[90%] md:w-[60%]">
	{@render children()}
</div>
