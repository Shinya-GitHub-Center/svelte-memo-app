<script lang="ts">
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Submit | Memo App</title>
</svelte:head>

<div class="card p-3">
	<form method="POST" action="?/save">
		<label class="label" for="body">本文:</label>
		<textarea id="body" name="body" class="textarea" value={data.memo.body}
		></textarea>
		<div class="button-container">
			<input type="submit" value="保存" class="button is-primary" />
			{#if data.memo.id && data.memo.id !== 0}
				<button
					type="submit"
					formaction="?/delete"
					class="delete-button"
					title="削除"
				>
					<span class="icon">🗑️</span>
				</button>
			{/if}
		</div>
	</form>
</div>
