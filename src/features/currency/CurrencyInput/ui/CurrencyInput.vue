

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric,  helpers } from '@vuelidate/validators';

const props = defineProps({
  currency: {
    type: String,
    required: true
  },
  currencies: {
    type: Array,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
});

const emit = defineEmits(['update:currency', 'update:amount']);

const amountRef = ref(props.amount); 
watch(
  () => props.amount,
  (newAmount) => {
    amountRef.value = newAmount;
  }
);

// Validation 
const rules = computed(() => ({
  amountRef: {
    required: helpers.withMessage('Поле обязательно для заполнения', required),
    numeric: helpers.withMessage('Поле должно содержать только цифры', numeric),
  },
}));
const v$ = useVuelidate(rules, { amountRef });
const amountErrors = ref<string[]>([]);

watch(
  () => amountRef.value,
  async (newAmount) => {
    const result = await v$.value.$validate();
    if (!result) {
      amountErrors.value = v$.value.amountRef.$errors.map((error) => error.$message.toString());
    } else {
      amountErrors.value = [];
    }
  },
  { immediate: true }
);

</script>

<template>
  <v-row class='!p-3'>
    <v-select
      class='w-50 mt-2'
      :model-value="currency"
      :items="currencies"
      label="Валюта"
      variant="outlined"
      hide-details
      @update:model-value="$emit('update:currency', $event)"
    ></v-select>
    <v-text-field
      class='mt-2'
      :model-value="amount"
      label="Сумма"
      type="number"
      variant="outlined"
      hide-details
      :error-messages="amountErrors"
      @update:model-value.number="$emit('update:amount', $event)"
    ></v-text-field>
    <span v-for="error in amountErrors" class="text-red-500">{{ error }}</span>
  </v-row>
</template>