interface Props {
    title: string;
    subtitle?: string | undefined;
    icon: string;
    children?: import('svelte').Snippet;
}
declare const Header: import("svelte").Component<Props, {}, "">;
type Header = ReturnType<typeof Header>;
export default Header;
