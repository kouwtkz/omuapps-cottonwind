declare function $$render<T>(): {
    props: {
        primary?: boolean;
        disabled?: boolean;
        onclick?: (event: {
            currentTarget: EventTarget & HTMLButtonElement;
        }) => PromiseLike<T> | undefined | unknown;
        promise?: PromiseLike<T> | undefined | unknown;
        children?: import("svelte").Snippet<[any]>;
    };
    exports: {};
    bindings: "promise";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "promise";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Button: $$IsomorphicComponent;
type Button<T> = InstanceType<typeof Button<T>>;
export default Button;
