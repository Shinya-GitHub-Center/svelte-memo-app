// See https://svelte.dev/docs/kit/types#app.d.ts
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
