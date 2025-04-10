<script setup lang="ts">
import { BaseIcon } from '@/shared/ui/components';
import { mdiSwapHorizontal } from '@mdi/js';

const emit = defineEmits(['click']);
</script>
<template>
  <div class='!p-3 flex justify-center items-center cursor-pointer' @click="$emit('click')">
    <BaseIcon :path='mdiSwapHorizontal' :size='40' />
  </div>
</template>