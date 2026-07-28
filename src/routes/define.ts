import { dev } from "$app/environment";

export const ORIGIN = dev ? 'http://localhost:5173' : 'https://apps.cottonwind.com/omuapps-tutorial' // 公開先のOrigin (開発時はローカルサーバーのOriginを指定する)
export const NAMESPACE = 'com.cottonwind.apps' // 公開先の逆順ドメイン
