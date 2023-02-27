<template>
  <div class="form-control">
    <label v-if="props.label" class="label flex justify-between">
      <span class="label-text">{{ props.label }}</span>

      <div>
        <div class="inline" v-if="isSpeechRecognitionOn">
          <span class="text-xs mr-2 italic">On going...</span>
          <font-awesome-icon @click="handleSpeechRecognitionClick" icon="fa-stop" />
        </div>
        <font-awesome-icon v-else @click="handleSpeechRecognitionClick" icon="fa-microphone" />
        <font-awesome-icon class="ml-6" @click="handleDeleteContent" icon="fa-trash" />
      </div>
    </label>
    <textarea
      class="textarea textarea-bordered h-24"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="onChange"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { ref } from "vue";
import { useVoiceRecognition } from "@/services/use-voice-recognition";

const props = defineProps<{
  label?: string;
  placeholder?: string;
  modelValue?: string;
  field: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Field validation
useField<string>(props.field);

const onChange = (event: Event) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};

const handleDeleteContent = () => {
  emits("update:modelValue", "");
};

// Speech recognition
const recognition = useVoiceRecognition();
const isSpeechRecognitionOn = ref(false);
const handleSpeechRecognitionClick = () => {
  isSpeechRecognitionOn.value = !isSpeechRecognitionOn.value;

  if (isSpeechRecognitionOn.value) {
    recognition.start();
  } else {
    const result = recognition.stop();

    if (result) {
      if (props.modelValue) {
        emits("update:modelValue", `${props.modelValue}\n${result}`);
      } else {
        emits("update:modelValue", result);
      }
    }
  }
};
</script>
