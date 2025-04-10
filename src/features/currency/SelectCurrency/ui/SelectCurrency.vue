<script setup lang="ts">
import { CURRENCY_LIST } from '@/shared/config/const';
import { useSettingsModel } from '@/entities/settings'

let SettingsModel = useSettingsModel()

const selectedCurrency = ref(SettingsModel.currency)
const currencies = CURRENCY_LIST
watch(selectedCurrency, () => {
    SettingsModel.updateCurrency(selectedCurrency.value)
})

</script>
<template>
    <div class='w-4xs'>
     <v-select
        v-model="selectedCurrency"
        :items="currencies"
        label="Валюта"
        variant="outlined"
        class="max-w-xs"
        density="compact"
        hide-details
      ></v-select>
    </div>
</template>

<style scoped lang="scss">
</style>
