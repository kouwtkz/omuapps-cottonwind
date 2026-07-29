// src/routes/chatRing/index.ts
export const prerender = true;'ti-'

import { App, Identifier } from "@omujs/omu";
import { NAMESPACE, ORIGIN } from "../define";
export const APP_ID = new Identifier(NAMESPACE, "chat-ring");

// 管理画面用のアプリ情報
export const CHAT_RING_APP = new App(`${NAMESPACE}:chatRing`, {
  url: `${ORIGIN}/chatRing`, // アプリの開かれるページのURL
  metadata: {
    locale: "ja", // アプリの推奨言語
    name: "チャット通知音", // アプリの名前
    description: "チャットの新着の通知の音を鳴らすアプリです！", // 一行の説明をつけることを推奨
    icon: "ti-bell-ringing", // アイコンのURL、もしくは先端にti-をつけることでTabler Iconsのアイコンを指定することができます
  },
});

import { Omu } from "@omujs/omu";
import { IndexedDataClass } from "$lib/cottonwind/IndexedDB/MeeIndexedDataClass";
import { MeeIndexedDB } from "$lib/cottonwind/IndexedDB/MeeIndexedDB";

export interface ChatRingData {
  key: string;
  file: File | null;
}

export class ChatRingApp {
  omu: Omu;
  key: string;
  db: MeeIndexedDB | null;
  indexedData: IndexedDataClass<ChatRingData>;
  constructor(omu: Omu) {
    const indexedData: IndexedDataClass<ChatRingData> = new IndexedDataClass({
      name: "file",
      primary: "key",
    });
    this.indexedData = indexedData;
    this.db = null;
    MeeIndexedDB.create({
      dbName: "omuapps.cottonwind",
      onupgradeneeded(e, db) {
        indexedData.dbUpgradeneeded(e, db);
      },
      onsuccess(db) {
        indexedData.dbSuccess(db);
      },
    }).then((db) => {
      this.db = db;
    });

    this.omu = omu;
    this.key = APP_ID.join("source").key();
  }
  public async load() {
    return this.indexedData.table.get({ query: this.key });
  }
  public async save(file: File) {
    return file.arrayBuffer().then((buffer) =>
      this.indexedData.save({
        data: {
          key: this.key,
          file,
        },
      }),
    );
  }
  public async delete() {
    this.indexedData.save({
      data: {
        key: this.key,
        file: null,
      },
    });
  }
}
