<script lang="ts">
  import { browser } from "$app/environment";
  import { Omu, OmuPermissions } from "@omujs/omu";
  import { CHAT_RING_APP, ChatRingApp, type ChatRingData } from ".";
  import { Chat, ChatEvents, ChatPermissions } from "@omujs/chat";
  import Header from "../../ui/Header.svelte";
  import Button from "../../ui/Button.svelte";

  //ChatRingAppuオブジェクトを生成します
  const omu = new Omu(CHAT_RING_APP);

  const chat = Chat.create(omu);

  // アプリを初期化して必要な変数を取り出します
  const chatRingApp = new ChatRingApp(omu);
  let audioFile: File | null = $state(null);

  // 必要な権限を要求します
  omu.permissions.require(ChatPermissions.CHAT_PERMISSION_ID);

  // ブラウザのみでAPIに接続します
  if (browser) {
    omu.start();
  }
  let audioElement: HTMLAudioElement | null = null;
  let formElement: HTMLFormElement | null = null;
  chatRingApp.indexedData.addEventListener("dbSet", () => {
    chatRingApp.load().then((d) => {
      if (d) {
        audioFile = d.file;
        if (audioElement) {
          if (d.file) audioElement.src = URL.createObjectURL(d.file);
          audioElement.volume = d.volume;
          audioElement.muted = d.muted;
        }
      }
    });
  });
  chat.on(ChatEvents.Message.Add, async (message) => {
    audioElement?.play();
  });
</script>

<header>
  <Header
    icon={CHAT_RING_APP.metadata?.icon?.toString() || ""}
    title={CHAT_RING_APP.metadata?.name?.toString() || ""}
    subtitle={CHAT_RING_APP.metadata?.description?.toString()}
  />
</header>
<main>
  <section>
    <div>
      <p>
        <span>
          {audioFile?.name || "通知音なし"}
        </span>
        <button
          type="button"
          class="delete"
          disabled={!audioFile}
          onclick={() => {
            audioFile = null;
            chatRingApp.save({ file: null });
            if (audioElement) audioElement.src = "";
          }}
        >
          削除
        </button>
      </p>
      <audio
        controls
        bind:this={audioElement}
        onvolumechange={() => {
          chatRingApp.save({
            volume: audioElement!.volume,
            muted: audioElement!.muted,
          });
        }}
      ></audio>
    </div>
    <form bind:this={formElement}>
      <Button
        onclick={() => {
          formElement!.file.click();
        }}
        primary={true}
      >
        音源を選択する
      </Button>
      <input
        name="file"
        type="file"
        hidden
        accept="audio/*"
        onchange={(e) => {
          const inputElm = e.target as unknown as HTMLInputElement;
          if ("files" in inputElm && audioElement) {
            audioFile = (inputElm.files as FileList)[0];
            audioElement.src = URL.createObjectURL(audioFile);
            chatRingApp.save({ file: audioFile });
            inputElm.form?.reset();
          }
        }}
      />
    </form>
  </section>
</main>

<style>
  :root {
    --color-bg-1: rgb(246, 242, 235);
    --color-bg-2: rgb(255, 254, 252);
    --color-1: rgb(11, 111, 114);
    --color-2: rgb(53, 223, 225);
    --color-text: rgb(68, 68, 68);
    --color-outline: rgba(0, 0, 0, 0.1);
    --margin: 10px;
  }
  main {
    inset: 0;
    color: var(--color-1);
    container-type: inline-size;
    margin: 1rem;
    gap: 1rem;
  }
  section {
    background: var(--color-bg-2);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .delete {
    margin-left: 1rem;
  }
</style>
