
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, AudioLines } from "lucide-react";
import "./VoiceAssistant.css";

export default function VoiceAssistant({
  products = [],
  onAddToCart,
  onSearch,
}) {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("How can I help you?");
  const recognitionRef = useRef(null);

  function speak(text) {
    setMessage(text);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  }

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript
        .toLowerCase()
        .trim();

      setListening(false);
      handleCommand(command);
    };

    recognition.onerror = () => {
      setListening(false);
      speak("Sorry, I could not hear you. Please try again.");
    };

    recognition.onend = () => setListening(false);

    return () => {
      recognition.abort();
      window.speechSynthesis?.cancel();
    };
  }, [products]);

  function handleCommand(command) {
    const addCommand =
      /\b(add|buy|order|put)\b/.test(command) &&
      /\b(cart|basket|please|add|buy|order)\b/.test(command);

    const cleaned = command
      .replace(/\b(please|search|find|show|me|for|the|a|an|some|add|put|buy|order|to|my|cart|basket|in|want|need)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const product = products.find((item) => {
      const name = String(item.name || "").toLowerCase();
      return name.includes(cleaned) || cleaned.includes(name);
    });

    if (addCommand && product) {
      onAddToCart?.(product);
      speak(`${product.name} added to your cart.`);
      return;
    }

    if (cleaned) {
      onSearch?.(cleaned);
      speak(`Searching for ${cleaned}.`);
      return;
    }

    speak("Please say a product name, like search tomatoes.");
  }

  function startListening() {
    if (!recognitionRef.current) {
      speak("Voice search is not supported in this browser. Please try Chrome.");
      return;
    }

    try {
      window.speechSynthesis?.cancel();
      setListening(true);
      setMessage("Listening... Speak in English");
      recognitionRef.current.start();
    } catch {
      setListening(false);
      speak("Please try clicking the microphone again.");
    }
  }

  return (
    <div className="voice-assistant">
      <button
        type="button"
        className={`voice-mic ${listening ? "is-listening" : ""}`}
        onClick={listening ? () => recognitionRef.current?.stop() : startListening}
        aria-label={listening ? "Stop voice search" : "Start voice search"}
        title="English voice assistant"
      >
        {listening ? <MicOff size={19} /> : <Mic size={19} />}
        <span>{listening ? "Listening" : "AI Voice"}</span>
      </button>

      <div className="voice-status" aria-live="polite">
        <AudioLines size={15} />
        <span>{message}</span>
      </div>
    </div>
  );
}
