import type { RequestEvent } from '@sveltejs/kit';

/**
 * Basic認証のヘッダーをパース
 */
function parseBasicAuth(authHeader: string | null): { username: string; password: string } | null {
	if (!authHeader || !authHeader.startsWith('Basic ')) {
		return null;
	}

	try {
		const base64Credentials = authHeader.slice(6);
		const credentials = atob(base64Credentials);
		const [username, password] = credentials.split(':');
		return { username, password };
	} catch {
		return null;
	}
}

/**
 * Basic認証チェック（本番環境のみ）
 * @param event - SvelteKitのリクエストイベント
 * @returns 認証失敗時は401レスポンス、成功時はnull
 */
export function requireBasicAuth(event: RequestEvent): Response | null {
	// 本番環境判定用のキーを取得
	const isProduction = event.platform?.env?.IS_PROD;

	// 本番環境キーが設定されていない場合は開発環境と判断
	if (!isProduction) {
		return null;
	}

	// 本番環境の認証情報を取得（Cloudflare環境変数から）
	const authUsername = event.platform?.env?.AUTH_USERNAME;
	const authPassword = event.platform?.env?.AUTH_PASSWORD;

	// 認証情報が設定されていない場合はエラー
	if (!authUsername || !authPassword) {
		return new Response('認証設定エラー', { status: 500 });
	}

	// リクエストの認証ヘッダーを取得
	const authHeader = event.request.headers.get('Authorization');
	const credentials = parseBasicAuth(authHeader);

	// 認証失敗
	if (!credentials || credentials.username !== authUsername || credentials.password !== authPassword) {
		return new Response('ログインが必要です', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="Memo App - Login Required"'
			}
		});
	}

	// 認証成功
	return null;
}
