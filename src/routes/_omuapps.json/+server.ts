// src/routes/_omuapps.json/+server.ts

import { AppIndexRegistry } from '@omujs/omu';
import { json } from '@sveltejs/kit';
import { NAMESPACE, TUTORIAL_APP } from '../tutorial';
import type { RequestHandler } from './$types';
import { TUTORIAL_APP2 } from '../tutorial2';

export const prerender = true;

export const GET: RequestHandler = () => {
    return json(
        AppIndexRegistry.build({
            id: `${NAMESPACE}:apps`,
            meta: {
                name: 'めぇめぇアプリ（仮）', // 名前
                note: 'チュートリアルめぇ', // 1行の説明
            },
            apps: [TUTORIAL_APP, TUTORIAL_APP2], // 配信するアプリの配列
        }).toJSON()
    );
};