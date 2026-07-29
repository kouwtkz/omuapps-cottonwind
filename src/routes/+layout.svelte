<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "@tabler/icons-webfont/dist/tabler-icons.scss";
  import "@fontsource/noto-sans-jp/japanese-400.css";
  import "@fontsource/noto-sans-jp/japanese-500.css";
  import "@fontsource/noto-sans-jp/japanese-600.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
