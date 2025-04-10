import { DefineStoreOptions } from 'pinia';

interface PersistOptions {
  enabled: boolean;
  key?: string;
  storage?: Storage;
  paths?: string[];
}

declare module 'pinia' {
  export interface DefineStoreOptions<Id extends string, S extends StateTree, G extends GetterTree<S>, A extends _ActionsTree> {
    persist?: PersistOptions;
  }
}

export {};