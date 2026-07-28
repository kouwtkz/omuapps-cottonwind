<script lang="ts">
    import { browser } from "$app/environment";
    import { OBSPermissions, OBSPlugin } from "@omujs/obs";
    import { BrowserSession, Omu, OmuPermissions } from "@omujs/omu";
    import { TUTORIAL_APP, TUTORIAL_ASSET_APP, TutorialApp } from ".";

    // APIを触るのに必要なOmuオブジェクトを生成します
    const omu = new Omu(TUTORIAL_APP);

    // Omuオブジェクトからその他のAPIを使用する事ができます
    const obs = OBSPlugin.create(omu);

    // アプリを初期化して必要な変数を取り出します
    const { tutorialData } = new TutorialApp(omu);

    // 必要な権限を要求します
    omu.permissions.require(
        OmuPermissions.GENERATE_TOKEN_PERMISSION_ID,
        OBSPermissions.OBS_SOURCE_CREATE_PERMISSION_ID,
    );

    // ブラウザのみでAPIに接続します
    if (browser) {
        omu.start();
    }

    // OBSにソースを追加する関数
    async function handleInstall() {
        // アセット用のtokenを生成
        const session = await omu.sessions.generateToken({
            app: TUTORIAL_ASSET_APP,
        });
        const url = new URL(TUTORIAL_ASSET_APP.url!);
        url.searchParams.set(
            BrowserSession.PARAM_NAME,
            JSON.stringify(session),
        );
        // OBSにソースを追加
        await obs.browserAdd({
            name: "チュートリアル表示", // ソース名
            url: url.toString(),
        });
    }
</script>

<h2>文字</h2>
<textarea cols="50" rows="5" bind:value={$tutorialData.text}></textarea>

<button onclick={handleInstall}> OBSに追加 </button>