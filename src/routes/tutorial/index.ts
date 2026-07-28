// src/routes/tutorial/index.ts

import { dev } from "$app/environment";
import { App } from "@omujs/omu";

export const ORIGIN = dev ? 'http://localhost:5173' : 'https://omuapps.github.io' // 公開先のOrigin (開発時はローカルサーバーのOriginを指定する)
export const NAMESPACE = 'io.github.omuapps' // 公開先の逆順ドメイン

// 管理画面用のアプリ情報
export const TUTORIAL_APP = new App(`${NAMESPACE}:tutorial`, {
    url: `${ORIGIN}/tutorial`, // アプリの開かれるページのURL
    metadata: {
        locale: "ja", // アプリの推奨言語
        name: "チュートリアルアプリ", // アプリの名前
        description: "初めてのアプリ", // 一行の説明をつけることを推奨
        icon: 'ti-align-box-left-middle' // アイコンのURL、もしくは先端にti-をつけることでTabler Iconsのアイコンを指定することができます
    },
});

// 配信画面用のアプリ情報
export const TUTORIAL_ASSET_APP = new App(`${NAMESPACE}:tutorial/app`, {
    url: `${ORIGIN}/tutorial/asset`, // アセットの開かれるページのURL
    parentId: TUTORIAL_APP, // 親アプリを設定
    metadata: {
        locale: "ja",
        name: "チュートリアルアセット",
    },
});

import type { Writable } from "svelte/store";
import { Omu } from '@omujs/omu';

type TutorialData = {
    text: string
};

export class TutorialApp {
    public tutorialData: Writable<TutorialData>;

    constructor(omu: Omu) {
        this.tutorialData = omu.registries.json<TutorialData>('tutorial_data', {
            default: {
                text: 'Default text'
            }
        }).compatSvelte();
    }
}