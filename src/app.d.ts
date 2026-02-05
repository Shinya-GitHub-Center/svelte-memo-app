// See https://svelte.dev/docs/kit/types#app.d.ts

import type { D1Database } from '@cloudflare/workers-types';

declare global {
	namespace App {
		interface Locals {
			db: ReturnType<typeof import("$lib/server/db/index").dbClient>;
		}
		interface Platform {
			env?: {
				DB?: D1Database;
			};
		}
	}
}

export { };
