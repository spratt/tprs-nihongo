export class SpeechRecognizer {
  static isPossible(): boolean {
    const anyWindow: any = window;
    return anyWindow.SpeechRecognition || anyWindow.webkitSpeechRecognition ||
           anyWindow.mozSpeechRecognition || anyWindow.msSpeechRecognition;
  }

  private recognition: any;

  constructor(callback: (event: SpeechRecognitionEvent) => void) {
    const anyWindow: any = window;
    this.recognition = new (anyWindow.SpeechRecognition || anyWindow.webkitSpeechRecognition ||
                            anyWindow.mozSpeechRecognition || anyWindow.msSpeechRecognition)();
    this.recognition.lang = 'ja-JP';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 5;
    this.recognition.onresult = callback;
  }

  start() { this.recognition.start() }
}