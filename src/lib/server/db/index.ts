import { drizzle } from 'drizzle-orm/d1';

import type { D1Database } from '@cloudflare/workers-types';

export const dbClient = (d1: D1Database | undefined) => {
	if (!d1) {
		throw new Error("Database not found");
	}
	return drizzle(d1);
};
