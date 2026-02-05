<script lang="ts">
	import "../styles/global.css";

	let { children } = $props();
</script>

<div class="header">
	<h1>適当に作ったメモ帳アプリ</h1>
</div>

{@render children()}
