import { defineStore } from 'pinia'
import { ExchangeApi } from '../index'
import {   type IExchangeModel } from './types'

export const useExchangeModel = defineStore('exchange', {
    state: () => <IExchangeModel>{ 
        loading: false,
        data: {}
    },
    actions: {
        async getCurrencies(): Promise<void> {
            this.loading = true
            try {
                let currencies = await ExchangeApi.getCurrencies()
                if (currencies.success && currencies.data) {
                    this.data = currencies.data
                }
                this.loading = false
            } catch (error) {
                this.loading = false
            }
            
        },
    },
})