<script lang="ts">
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<div class="card p-3">
	<div class="header-row">
		<span>編集したいメモを選んで下さい</span>
		<button
			class="button is-primary refresh-button"
			onclick={() => window.location.reload()}
		>
			更新
		</button>
	</div>
	<ul class="grid">
		<li class="cell card p-4 m-2">
			<a href="/memo/0" class="memo-preview"> 🖌️ 新規作成 </a>
		</li>
		{#each data.items as item}
			<li class="cell card p-4 m-2">
				<a href="/memo/{item.id}" class="memo-preview">
					{item.body}
				</a>
			</li>
		{/each}
	</ul>
</div>
