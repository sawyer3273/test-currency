import { defineStore } from 'pinia'
import type { CurrecyList, ISettingsModel } from './types'

export const useSettingsModel = defineStore('settings', {
    state: () => <ISettingsModel>{ 
        currency: 'RUB',
    },
    actions: {
        updateCurrency(value: CurrecyList): void {
            this.currency = value
        },
    },
    persist: {
        enabled: true,
        key: 'settings-model',
        storage: localStorage,
        paths: ['currency'],
    }
})