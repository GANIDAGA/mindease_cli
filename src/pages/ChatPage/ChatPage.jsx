import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import './ChatPage.css'

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatFrame = useRef(null);

  const fetchMessages = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.get("/chat/messages", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setMessages(response.data);
        scrollToBottom();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);


  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      return; // Do not proceed if newMessage is empty
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `Paciente: ${newMessage}` },
    ]);
    setNewMessage("");
    setIsTyping(true);

    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.post(
          "/chat/messages",
          { text: newMessage },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        const aiMessage = response.data;
        setIsTyping(false);

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiMessage },
        ]);
        scrollToBottom();
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al tratar de enviar el mensaje, por favor, inténtalo de nuevo.");
      setIsTyping(false);
    }
  };



  const handleDeleteMessages = async () => {
    const confirmation = window.confirm(
      "¿Seguro que quieres restablecer el chat? Se eliminará todo su historial de mensajes y MindBot olvidará toda la información proporcionada."
    );

    if (!confirmation) {
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        await axios.delete("/chat/messages", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const firstMessage = {
          text: "MindBot: ¡Hola!, ¿cómo puedo ayudarte hoy?",
        };
        setMessages([firstMessage]);
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al tratar de enviar el mensaje, por favor, inténtelo de nuevo.");
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      fetchMessages();
    }
  }, [fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatFrame.current) {
      chatFrame.current.scrollTop = chatFrame.current.scrollHeight;
    }
  };

  const messageType = (message) => {
    if (message.startsWith("Paciente: ")) {
      return "patient";
    } else if (message.startsWith("MindBot: ")) {
      return "therapist";
    }
  };

  const removePrefix = (message) => {
    return message.replace(/^(Patient: |TherapyAi: )/, "");
  };

  return (
    <div className="me_chatPage">
      <div className="chatPage">
        <div className="chatPage_container">
          <div className="chatPage_form">
            <div id="frame" ref={chatFrame}>
              <p className="chatPage_form_title">MindBot Chat</p>
              <ul id="messages-ul" className="">
                {messages.map((message, index) => {
                  const type = messageType(message.text);
                  return (
                    <div
                      key={index}
                      className=""
                    >
                      <li
                        className=""
                      >
                        {removePrefix(message.text)}
                      </li>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="">
                    <li className="">
                      <div className="">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  </div>
                )}
              </ul>
            </div>
            <div className="chatInput_container">
              <form onSubmit={handleMessageSubmit} className="">
                <div className="input_container_chat">
                  <div className="input_container_enter">
                    <textarea
                      autoFocus
                      type="text"
                      id="message"
                      name="message"
                      className="textarea_container"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleMessageSubmit(e);
                        }
                      }}
                    ></textarea>
                    <button type="submit" className="button_sumbit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#569fec"
                        className="bi bi-send-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                      </svg>
                    </button>
                  </div>
                  <button onClick={handleDeleteMessages} className="button_delete_chat">
                    Eliminar chat
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="chatPage_right">
            <p className="diagnostic_text">
              Gracias a MindBot y su capacidad para registrar y analizar conversaciones anteriores, la inteligencia artificial es capaz de generar un diagnóstico "psicológico" personalizado basado en el comportamiento que has mostrado. Utilizando técnicas avanzadas de procesamiento de lenguaje natural, MindBot examina tu interacción con el sistema para identificar patrones, tendencias y señales relevantes que pueden indicar aspectos psicológicos importantes. De esta manera, podemos brindarte un diagnóstico más preciso y personalizado, ayudándote a comprender mejor tu propio comportamiento y emociones. Nuestro objetivo es proporcionarte información valiosa que te permita tomar decisiones informadas y buscar el apoyo adecuado en tu bienestar emocional
            </p>
            <div className="generate_diagnostic">
              <a href="/profile">
                Genera tu diagnóstico aquí.
              </a>
              <i class='bx bx-right-arrow-alt'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
