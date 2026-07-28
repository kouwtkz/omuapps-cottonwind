<script lang="ts">
  import { Omu, OmuPermissions } from "@omujs/omu";
  import { TUTORIAL_ASSET_APP, TutorialApp } from "..";
  import { browser } from "$app/environment";

  const omu = new Omu(TUTORIAL_ASSET_APP);
  const { tutorialData } = new TutorialApp(omu);

  if (browser) {
    omu.permissions.require(OmuPermissions.REGISTRY_PERMISSION_ID);
    omu.start();
  }
</script>

<h1>
  {$tutorialData.text}
</h1>

<style>
  h1 {
    background: #000;
    color: #fff;
    white-space: pre-wrap;
  }
</style>
