import { ref } from "vue";

export function useVoiceRecognition() {
  const SpeechRecognition = (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.continuous = true;

  const result = ref("");

  recognition.onstart = () => {
    console.log("Starting speech recognition");
  };

  recognition.onresult = (voiceResult: any) => {
    result.value = voiceResult.results[0][0].transcript;
  };

  const start = () => {
    recognition.start();
  };

  const stop = () => {
    recognition.stop();
    const finalText = result.value;
    result.value = "";
    return finalText;
  };

  return {
    start,
    stop,
  };
}
