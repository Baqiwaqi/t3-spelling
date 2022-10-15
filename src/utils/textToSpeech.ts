export function textToSpeech(text: string) {
  const synth = window?.speechSynthesis;
  const speakText = new SpeechSynthesisUtterance(text);
  speakText.lang = 'nl-NL';
  synth.speak(speakText);
}