export function test() {
  const synth = window?.speechSynthesis;
  const speakText = new SpeechSynthesisUtterance("hello");
  synth.speak(speakText);
}