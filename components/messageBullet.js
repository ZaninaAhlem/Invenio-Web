import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import styles from "../styles/Message.module.css";
import { getUser } from "../actions/auth";

export default function MessageBullet({ room, onSelect }) {
  const dispatch = useDispatch();
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    dispatch(getUser(room.userId)).then((data) => setUserAvatar(data.avatar));
  });

  return (
    <button className={styles.messageBullet} onClick={() => onSelect()}>
      {userAvatar && (
        <img
          src={`http://localhost:3080/upload/${userAvatar}.png`}
          width="40"
          height="40"
        />
      )}
    </button>
  );
}
