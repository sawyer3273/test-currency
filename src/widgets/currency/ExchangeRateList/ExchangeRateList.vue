<script setup lang="ts">
import { useExchangeModel } from '@/entities/exchange'
import { useSettingsModel } from '@/entities/settings'
const ExchangeModel = useExchangeModel()
const SettingsModel = useSettingsModel()

const currencyList = ref<string[]>([]);
onMounted(() => {
  refresh()
})
async function refresh() {
  await ExchangeModel.getCurrencies()
  switch(SettingsModel.currency) {
    case 'RUB': currencyList.value = [`1 USD = ${ExchangeModel.data['usd-rub']} RUB`, `1 EUR = ${ExchangeModel.data['eur-rub']} RUB`]; break;
    case 'USD': currencyList.value = [`1 RUB = ${ExchangeModel.data['rub-usd']} USD`, `1 EUR = ${ExchangeModel.data['eur-usd']} USD`]; break;
    case 'EUR': currencyList.value = [`1 RUB = ${ExchangeModel.data['rub-eur']} EUR`, `1 USD = ${ExchangeModel.data['usd-eur']} EUR`]; break;
  }
}
watch(() => SettingsModel.currency, () => {
  refresh()
})

</script>
<template>
  <v-card title="Текущий курс валют" class="text-left mt-2">
    <div class='!p-3'>
      <div v-for="item in currencyList" :key="item">
        {{item}}
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
</style>
