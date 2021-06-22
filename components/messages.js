import { useState, useEffect } from "react";
import Image from "next/image";
import { connect } from "react-redux";

import {
  sendMessage,
  getMessages,
  getRooms,
  joinRoom,
} from "../actions/socketMessages";
import MessageBullet from "./messageBullet";
import MessageBubble from "./messageBubble";
import styles from "../styles/Message.module.css";

function Messages(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const id = "60b3bc8c8566ad20c4ae7aa7";

  const sendMessageHandler = () => {
    props.sendMessage(id, newMessage, selectedChat);
    setMessages([...messages, { sender: "ADEA", msg: newMessage }]);
    setNewMessage("");
  };

  const handleSelectedChat = (selected) => {
    if (!isVisible) {
      setIsVisible(true);
      setSelectedChat(selected._id);
      props.joinRoom(selected._id, id);
      props.getMessages(selected._id).then((data) => setMessages(data));
    } else if (isVisible && selected._id !== selectedChat) {
      setSelectedChat(selected._id);
      props.joinRoom(selected._id, id);
      props.getMessages(selected._id).then((data) => setMessages(data));
    } else {
      setIsVisible(false);
      setSelectedChat("");
    }
  };

  const getAvatar = (room) => {};

  useEffect(() => {
    if (selectedChat)
      props.getMessages(selectedChat).then((data) => setMessages(data));
    props.getRooms(id).then((data) => setRooms(data));
  }, [messages]);

  return (
    <>
      {isVisible && (
        <div className={styles.chat}>
          <hr className={styles.line} />
          <div className={styles.messagesContainer}>
            {messages &&
              messages.map((message, index) => {
                return (
                  <MessageBubble key={index} item={message} user={"ADEA"} />
                );
              })}
          </div>
          <input
            className={styles.input}
            placeholder="Message..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            className={styles.sendButton}
            type="submit"
            onClick={sendMessageHandler}
          >
            <Image src="/send2.svg" width="20px" height="20px" />
          </button>
        </div>
      )}
      <div className={styles.messageBullets}>
        <button
          className={styles.addMessage}
          onClick={() => {
            // props.joinRoom(selectedChat, id);
          }}
        >
          <Image src="/edit.svg" height="20px" width="20px" />
        </button>
        {rooms &&
          rooms.map((room, index) => {
            getAvatar(room);
            return (
              <MessageBullet
                key={index}
                room={room}
                uri={""}
                onSelect={() => handleSelectedChat(room)}
              />
            );
          })}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  rooms: state.rooms,
});

const mapDispatchToProps = {
  sendMessage,
  getMessages,
  getRooms,
  joinRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
