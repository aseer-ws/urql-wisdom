import { useMutation, useQuery, useSubscription } from "urql";
import classNames from "classnames";
import {
  addMessageMutationDocument,
  messagesQueryDocument,
  newMessageSubscriptionDocument,
} from "../schema";
import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import useBaseStore from "../store";

const ChatPage = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const name = useBaseStore((state) => state.name);

  // QUERY - useQuery

  const [{ data, fetching }] = useQuery({
    query: messagesQueryDocument,
    variables: { params: { limit: 10, offset: 0 } },
  });

  // MUTATION - useMutation

  const [{ fetching: submitting }, addMessage] = useMutation(
    addMessageMutationDocument
  );

  // SUBSCRIPTION - useSubscription

  const [{ data: newMessageData }] = useSubscription({
    query: newMessageSubscriptionDocument,
  });

  useEffect(() => {
    scrollToBottom();
  }, [newMessageData]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const handleAddMesageFormSubmit: React.FormEventHandler<
    HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const res = await addMessage({ text });
      if (res.data?.addMessage._id) {
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setText(e.target.value);

  if (fetching) return <div>loading...</div>;

  return (
    <>
      <h3>{name}</h3>
      <div className="chat-box" ref={chatBoxRef}>
        <ul className="messages">
          {data?.messages.map((message) => (
            <li
              className={classNames("message", { self: name === message.name })}
              key={message._id}
            >
              <b className="message-user">{message.name}</b>
              <br />
              <span className="message-text">{message.text}</span>
            </li>
          ))}
        </ul>
        <form className="chat-form" onSubmit={handleAddMesageFormSubmit}>
          <input
            className="chat-input"
            type="text"
            value={text}
            onChange={handleTextChange}
          />
          <button
            className="chat-form-submit"
            type="submit"
            disabled={submitting}
          >
            send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPage;
