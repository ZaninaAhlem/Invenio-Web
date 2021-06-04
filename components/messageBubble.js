import styles from "../styles/Message.module.css";

export default function MessageBubble(props) {
  const item = props.item;
  const user = props.user;

  return (
    <div
      className={
        item.sender === user
          ? styles.message_bubble_outgoing
          : styles.mesage_bubble_incoming
      }
    >
      <p>{item.msg}</p>
    </div>
  );
}
