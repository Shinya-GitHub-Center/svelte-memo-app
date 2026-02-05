import type { Handle } from '@sveltejs/kit';
import { dbClient } from '$lib/server/db/index';
import { requireBasicAuth } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Basic認証チェック（本番環境のみ）
	const authResponse = requireBasicAuth(event);
	if (authResponse) {
		return authResponse;
	}

	// DB の設定
	try {
		event.locals.db = dbClient(event.platform?.env?.DB);
	} catch (error) {
		console.error("Initializing database failed:", error);
		return new Response("Database not found", { status: 503 });
	}

	return resolve(event);
};
