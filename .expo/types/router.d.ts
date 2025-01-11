/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(Favourites)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(Profile)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(addNew)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(communities)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(posts)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(recipes)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(restaurants)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(login)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/Post/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(drawerNav)'}${'/(Favourites)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(drawerNav)'}${'/(Profile)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(addNew)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(communities)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(posts)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(recipes)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(restaurants)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(login)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `/Post/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(drawerNav)'}${'/(Favourites)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(drawerNav)'}${'/(Profile)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(drawerNav)'}${'/(tabs)'}${'/(addNew)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(drawerNav)'}${'/(tabs)'}${'/(communities)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(drawerNav)'}${'/(tabs)'}${'/(posts)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(drawerNav)'}${'/(tabs)'}${'/(recipes)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(drawerNav)'}${'/(tabs)'}${'/(restaurants)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(login)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(Favourites)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(Profile)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(addNew)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(communities)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(posts)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(recipes)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(drawerNav)'}${'/(tabs)'}${'/(restaurants)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(login)'}` | `/`; params?: Router.UnknownInputParams; } | `/Post/${Router.SingleRoutePart<T>}` | { pathname: `/Post/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
