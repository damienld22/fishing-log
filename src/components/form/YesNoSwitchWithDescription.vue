<template>
  <div class="my-4">
    <YesNoSwitchButton v-model="enabled" :label="props.label" />

    <div v-if="enabled" class="mt-2">
      <div class="form-control w-full max-w-xs">
        <input type="text" placeholder="Details" v-model="details" class="input input-bordered w-full max-w-xs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import YesNoSwitchButton from "./YesNoSwitchButton.vue";

const enabled = ref(false);
const details = ref("");

const props = defineProps<{
  label: string;
  modelValue?: string | boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string | boolean): void;
}>();

const onChange = ({ enabled, details }: { enabled: boolean; details: string }) => {
  // If no details or no enabled, we only sent the boolean state
  if (!enabled || !details) {
    emits("update:modelValue", enabled);
  } else {
    emits("update:modelValue", details);
  }
};

watchEffect(() => onChange({ enabled: enabled.value, details: details.value }));
</script>
