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
  const roomId = "60857251426d071bc43d97fe";
  const userId = "6088637ff18a642e34120691";

  const sendMessageHandler = () => {
    props.sendMessage(id, newMessage, roomId);
    setMessages([...messages, { sender: "ADEA", msg: newMessage }]);
    setNewMessage("");
  };

  const handleSelectedChat = (selected) => {
    if (!isVisible) {
      setIsVisible(true);
      setSelectedChat(selected._id);
      props.joinRoom(userId, id);
    } else if (isVisible && selected._id !== selectedChat) {
      setSelectedChat(selected._id);
      props.joinRoom(userId, id);
    } else {
      setIsVisible(false);
      setSelectedChat("");
    }
  };

  const getAvatar = (room) => {};

  useEffect(() => {
    props.getMessages("name").then((data) => setMessages(data));
    props.getRooms(id).then((data) => setRooms(data));
  }, []);

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
        <button className={styles.addMessage}>
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
