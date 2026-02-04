import { memoItems } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const db = event.locals.db;
	const items = await db.select().from(memoItems).orderBy(desc(memoItems.createdAt));

	return {
		items
	};
};
