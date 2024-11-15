/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(communities)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(posts)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(recipes)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(restaurants)'}` | ``; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}${'/(communities)'}` | ``; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}${'/(posts)'}` | ``; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}${'/(recipes)'}` | ``; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}${'/(restaurants)'}` | ``; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${'/(communities)'}${`?${string}` | `#${string}` | ''}` | `${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${'/(posts)'}${`?${string}` | `#${string}` | ''}` | `${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${'/(recipes)'}${`?${string}` | `#${string}` | ''}` | `${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${'/(restaurants)'}${`?${string}` | `#${string}` | ''}` | `${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(communities)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(posts)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(recipes)'}` | ``; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(restaurants)'}` | ``; params?: Router.UnknownInputParams; };
    }
  }
}
