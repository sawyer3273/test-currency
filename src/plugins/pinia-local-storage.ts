import { PiniaPluginContext } from 'pinia';

interface PersistOptions {
  enabled: boolean;
  key?: string;
  storage?: Storage;
  paths?: string[];
}

interface PiniaPluginOptions {
  persist?: PersistOptions;
}

export const piniaPluginLocalStorage = (context: PiniaPluginContext): void => {
  const { store } = context;
  const { options } = context as { options: PiniaPluginOptions };
  if (options.persist && options.persist.enabled) {
    const storageKey = options.persist.key || store.$id;
    const storageType: Storage = options.persist.storage || localStorage;
    const paths = options.persist.paths || null;

    const savedState = storageType.getItem(storageKey);

    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        store.$patch(parsedState);
      } catch (e) {
        console.error('Failed to parse localStorage:', e);
      }
    }

    store.$subscribe(
      () => {
        let stateToPersist = store.$state;

        if (paths && paths.length) {
          stateToPersist = paths.reduce((obj: any, key: string) => {
            if (store.$state.hasOwnProperty(key)) {
              obj[key] = store.$state[key];
            }
            return obj;
          }, {});
        }

        try {
          storageType.setItem(storageKey, JSON.stringify(stateToPersist));
        } catch (e) {
          console.error('Failed to save localStorage:', e);
        }
      },
      { detached: true }
    );
  }
};