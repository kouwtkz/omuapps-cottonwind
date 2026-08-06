// src/routes/_omuapps.json/+server.ts

import { App, AppIndexRegistry } from '@omujs/omu';
import { json } from '@sveltejs/kit';
import { NAMESPACE } from '../define';
import { TUTORIAL_APP } from '../tutorial';
import { CHAT_RING_APP } from '../chatRing';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';

const apps: App[] = [CHAT_RING_APP]; // 配信するアプリの配列
if (dev) {
    const dev_apps: App[] = [TUTORIAL_APP]; // デバッグするアプリの配列
    apps.unshift(...dev_apps);
}

export const GET: RequestHandler = () => {
    return json(
        AppIndexRegistry.build({
            id: `${NAMESPACE}:apps`,
            meta: {
                name: dev ? 'Cottonwind Apps - Beta' : 'Cottonwind Apps', // 名前
                note: 'こっとんうぃんどによるアプリ', // 1行の説明
            },
            apps
        }).toJSON()
    );
};