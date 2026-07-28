// src/routes/_omuapps.json/+server.ts

import { AppIndexRegistry } from '@omujs/omu';
import { json } from '@sveltejs/kit';
import { NAMESPACE } from '../define';
import { TUTORIAL_APP } from '../tutorial';
import { TUTORIAL_APP2 } from '../chatRing';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
    return json(
        AppIndexRegistry.build({
            id: `${NAMESPACE}:apps`,
            meta: {
                name: 'Cottonwind Apps', // 名前
                note: 'こっとんうぃんどによるアプリ', // 1行の説明
            },
            apps: [TUTORIAL_APP, TUTORIAL_APP2], // 配信するアプリの配列
        }).toJSON()
    );
};