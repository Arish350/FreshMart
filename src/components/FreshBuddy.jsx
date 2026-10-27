import { useEffect, useState, useRef } from "react";
import { MessageCircle, X, Send, Leaf, Sparkles, Minimize2 } from "lucide-react";
import "./FreshBuddy.css";

const quickQuestions = [
  "🍎 Best fruits today?",
  "🥭 Suggest sweet fruits",
  "🥦 Healthy vegetables?",
  "🚚 How to track my order?",
];

function getReply(message) {
  const text = message.toLowerCase();

  if (text.includes("sweet") || text.includes("sweet fruit")) {
    return "🥭 Sweet fruits try panna mango, banana, grapes nalla choices! FreshMart-la available products check pannunga.";
  }

  if (text.includes("vegetable") || text.includes("healthy")) {
    return "🥦 Healthy choices-ku spinach, carrot, tomato, beans try pannalaam. Fresh vegetables daily diet-la include pannunga!";
  }

  if (text.includes("track") || text.includes("delivery") || text.includes("order")) {
    return "🚚 Unga order track panna website-la irukkura 'Track My Order' button-ai click pannunga!";
  }

  if (text.includes("fruit") || text.includes("apple") || text.includes("mango")) {
    return "🍎 Fruit suggestion venuma? Banana, apple, orange, grapes, mango madhiri fruits consider pannalaam. FreshMart product list-la available items check pannunga!";
  }

  if (text.includes("price") || text.includes("cost")) {
    return "💚 Product price therinjukka FreshMart product section-la current price check pannunga. Endha fruit or vegetable price venum?";
  }

  if (text.includes("hi") || text.includes("hello") || text.includes("vanakkam")) {
    return "Vanakkam! 🌿 Naan FreshBuddy! Fruits, vegetables, shopping help-ku naan assist panren. Enna help venum?";
  }

  return "🌿 Naan FreshBuddy! Fruits, vegetables, product suggestions, shopping help pathi kelunga. Ungalukku enna help venum?";
}

export default function FreshBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! 🍓 I'm FreshBuddy, your FreshMart assistant. How can I help you today?",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 7000);
    return () => clearTimeout(timer);
  }, []);
    const [position, setPosition] = useState(null);
  const dragging = useRef(false);
  const wasDragged = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  function handlePointerDown(event) {
    wasDragged.current = false;
    dragging.current = true;

    const rect = event.currentTarget.getBoundingClientRect();

    dragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!dragging.current) return;

    wasDragged.current = true;

    setPosition({
      x: Math.max(
        0,
        Math.min(
          window.innerWidth - 68,
          event.clientX - dragOffset.current.x
        )
      ),
      y: Math.max(
        0,
        Math.min(
          window.innerHeight - 68,
          event.clientY - dragOffset.current.y
        )
      ),
    });
  }

  function handlePointerUp() {
    dragging.current = false;
  }

  function sendMessage(value = input) {
    const message = value.trim();
    if (!message || isTyping) return;

    setMessages((previous) => [
      ...previous,
      { from: "user", text: message },
    ]);
    setInput("");
    setIsTyping(true);
    setShowGreeting(false);

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        { from: "bot", text: getReply(message) },
      ]);
      setIsTyping(false);
    }, 900);
  }

  
return (
  <div
    className={`freshbuddy-widget ${position ? "is-moved" : ""}`}
    style={
      position
        ? {
            left: `${position.x}px`,
            top: `${position.y}px`,
            bottom: "auto",
          }
        : undefined
    }
  >

      {isOpen && (
        <section className="freshbuddy-window" aria-label="FreshBuddy chat">
          <header className="freshbuddy-header">
            <div className="freshbuddy-avatar">
              🍓
              <span className="freshbuddy-online" />
            </div>

            <div className="freshbuddy-heading">
              <h3>FreshBuddy AI</h3>
              <p><span /> Your FreshMart assistant</p>
            </div>

            <button
              className="freshbuddy-close"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
              type="button"
            >
              <Minimize2 size={19} />
            </button>
          </header>

          <div className="freshbuddy-welcome">
            <div className="freshbuddy-welcome-icon">
              <Leaf size={20} />
            </div>
            <div>
              <strong>Fresh help, fresh choices!</strong>
              <p>Ask me about fruits, vegetables and orders.</p>
            </div>
          </div>

          <div className="freshbuddy-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`freshbuddy-message ${message.from}`}
                key={`${index}-${message.from}`}
              >
                {message.from === "bot" && (
                  <span className="freshbuddy-mini-avatar">🍓</span>
                )}
                <p>{message.text}</p>
              </div>
            ))}

            {isTyping && (
              <div className="freshbuddy-message bot">
                <span className="freshbuddy-mini-avatar">🍓</span>
                <div className="freshbuddy-typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="freshbuddy-quick-questions">
                <span>QUICK QUESTIONS</span>
                {quickQuestions.map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() => sendMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="freshbuddy-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask FreshBuddy anything..."
              aria-label="Type your message"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </form>

          <div className="freshbuddy-footer">
            <Sparkles size={12} /> Fresh choices, happy living
          </div>
        </section>
      )}

      {!isOpen && showGreeting && (
        <button
          type="button"
          className="freshbuddy-greeting"
          onClick={() => setIsOpen(true)}
        >
          <span>🍓</span>
          <span>
            <strong>Need fresh help?</strong>
            <small>Chat with FreshBuddy!</small>
          </span>
          <X
            size={15}
            onClick={(event) => {
              event.stopPropagation();
              setShowGreeting(false);
            }}
          />
        </button>
      )}

      
<button
  type="button"
  className={`freshbuddy-launcher ${isOpen ? "active" : ""}`}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerUp}
  onClick={() => {
    if (wasDragged.current) return;
    setIsOpen((previous) => !previous);
    setShowGreeting(false);
  }}
  aria-label={isOpen ? "Close FreshBuddy" : "Open FreshBuddy"}
>
  {isOpen ? (
    <X size={27} />
  ) : (
    <>
      <span className="freshbuddy-fruit">🍓</span>
      <MessageCircle className="freshbuddy-chat-icon" size={21} />
      <span className="freshbuddy-pulse" />
    </>
  )}
</button>

    </div>
  );
}
