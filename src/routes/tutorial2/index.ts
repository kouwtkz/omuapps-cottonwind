// src/routes/tutorial2/index.ts
export const prerender = true;

import { App } from "@omujs/omu";
import { NAMESPACE, ORIGIN } from "../define";

// 管理画面用のアプリ情報
export const TUTORIAL_APP2 = new App(`${NAMESPACE}:tutorial2`, {
    url: `${ORIGIN}/tutorial2`, // アプリの開かれるページのURL
    metadata: {
        locale: "ja", // アプリの推奨言語
        name: "チュートリアルアプリ2", // アプリの名前
        description: "初めてのアプリ2", // 一行の説明をつけることを推奨
        icon: 'ti-align-box-left-middle' // アイコンのURL、もしくは先端にti-をつけることでTabler Iconsのアイコンを指定することができます
    },
});

// 配信画面用のアプリ情報
export const TUTORIAL_ASSET_APP2 = new App(`${NAMESPACE}:tutorial2/app`, {
    url: `${ORIGIN}/tutorial2/asset`, // アセットの開かれるページのURL
    parentId: TUTORIAL_APP2, // 親アプリを設定
    metadata: {
        locale: "ja",
        name: "チュートリアルアセット2",
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