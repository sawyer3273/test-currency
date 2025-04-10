<script setup lang="ts">
import { ref, watch } from 'vue';
import { useExchangeModel } from '@/entities/exchange';
import { useSettingsModel } from '@/entities/settings';
import { CURRENCY_LIST } from '@/shared/config/const';
import { ExchangeRates } from '@/entities/exchange/model/types';
import { CurrencyInput, SwapCurrencyButton } from '@/features/currency';



const ExchangeModel = useExchangeModel();
const SettingsModel = useSettingsModel();

const currencies = ref(CURRENCY_LIST);

const fromCurrency = ref('RUB');
const toCurrency = ref('USD');
const fromAmount = ref(100);
const toAmount = ref(0);

onMounted(async () => {
  await ExchangeModel.getCurrencies();
});

const convertCurrency = async (amount: number, from: string, to: string): Promise<number> => {
  if (from == to) {
    return amount;
  }
  await ExchangeModel.getCurrencies();
  const rateKey = `${from}-${to}`.toLowerCase();
  const rate: number | undefined = ExchangeModel.data[rateKey as keyof typeof ExchangeModel.data];

  if (rate === undefined) {
    return 0;
  }
  return parseFloat((amount * rate).toFixed(2));
};

const isConverting = ref(false);

watch(
  [fromAmount, fromCurrency, toCurrency],
  async () => {
    if (isConverting.value) {
      return;
    }
    isConverting.value = true;
    try {
      toAmount.value = await convertCurrency(fromAmount.value, fromCurrency.value, toCurrency.value);
    } finally {
      setTimeout(() => {
        isConverting.value = false;
      })
    }
  },
  { immediate: true } 
);

watch(
  [toAmount],
  () => {
    if (isConverting.value) {
      return;
    }
    isConverting.value = true;
    try {
      const reverseRateKey = `${toCurrency.value}-${fromCurrency.value}`.toLowerCase() as keyof ExchangeRates;
      const reverseRate: number | undefined = ExchangeModel.data[reverseRateKey];
      if (reverseRate === undefined) {
        fromAmount.value = 0;
        return;
      }
      const amount = parseFloat((toAmount.value * reverseRate).toFixed(2));
      fromAmount.value = amount;
    } finally {
      setTimeout(() => {
        isConverting.value = false;
      }, 0);
    }
  }
);

async function reverse() {
  const temp = toCurrency.value;
  toCurrency.value = fromCurrency.value;
  fromCurrency.value = temp;
  toAmount.value = await convertCurrency(fromAmount.value, fromCurrency.value, toCurrency.value);
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <CurrencyInput
          :currency="fromCurrency"
          :currencies="currencies"
          :amount="Number(fromAmount)"
          @update:currency="fromCurrency = $event"
          @update:amount="fromAmount = $event"
        />
      </v-col>
      <v-col cols="12" class="flex justify-center items-center" md="2">
        <SwapCurrencyButton @click="reverse" />
      </v-col>
      <v-col cols="12" md="5">
        <CurrencyInput
          :currency="toCurrency"
          :currencies="currencies"
          :amount="Number(toAmount)"
          @update:currency="toCurrency = $event"
          @update:amount="toAmount = $event"
        />
      </v-col>
    </v-row>
  </v-container>
</template>




<style scoped lang="scss"></style>