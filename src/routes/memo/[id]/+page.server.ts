import { memoItems } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	const id = parseInt(event.params.id);

	if (id === 0) {
		// 新規メモ
		return {
			memo: {
				id: 0,
				body: '',
				createdAt: new Date()
			}
		};
	}

	const db = event.locals.db;
	const result = await db.select().from(memoItems).where(eq(memoItems.id, id)).limit(1);

	if (result.length === 0) {
		// メモが見つからない場合は新規メモとして扱う
		return {
			memo: {
				id: 0,
				body: '',
				createdAt: new Date()
			}
		};
	}

	return {
		memo: result[0]
	};
};

export const actions: Actions = {
	save: async (event) => {
		const formData = await event.request.formData();
		const body = formData.get('body') as string;
		const id = parseInt(event.params.id);

		if (!body) {
			return fail(400, { error: 'メモの内容を入力してください' });
		}

		const db = event.locals.db;

		if (id === 0) {
			// 新規作成
			await db.insert(memoItems).values({
				body,
				createdAt: new Date()
			});
		} else {
			// 更新
			await db.update(memoItems)
				.set({
					body,
					createdAt: new Date()
				})
				.where(eq(memoItems.id, id));
		}

		throw redirect(303, '/');
	},

	delete: async (event) => {
		const id = parseInt(event.params.id);

		if (id === 0) {
			return fail(400, { error: '新規メモは削除できません' });
		}

		const db = event.locals.db;
		await db.delete(memoItems).where(eq(memoItems.id, id));

		throw redirect(303, '/');
	}
};
