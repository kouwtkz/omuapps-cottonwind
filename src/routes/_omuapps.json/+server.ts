// src/routes/_omuapps.json/+server.ts

import { AppIndexRegistry } from '@omujs/omu';
import { json } from '@sveltejs/kit';
import { NAMESPACE, TUTORIAL_APP } from '../tutorial';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
    return json(
        AppIndexRegistry.build({
            id: `${NAMESPACE}:apps`,
            meta: {
                name: 'チュートリアル', // 名前
                note: 'チュートリアル用提供元', // 1行の説明
            },
            apps: [TUTORIAL_APP], // 配信するアプリの配列
        }).toJSON()
    );
};