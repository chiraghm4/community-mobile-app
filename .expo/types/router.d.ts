/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/Three` | `/(tabs)/two` | `/Three` | `/_sitemap` | `/modal` | `/two`;
      DynamicRoutes: `/Post/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/Post/[id]`;
    }
  }
}
