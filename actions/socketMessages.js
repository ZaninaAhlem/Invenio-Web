import * as api from "../api/index";

import io from "socket.io-client";
let socket = io("http://localhost:4000");

export const joinRoom = (roomId, centerId) => async (dispatch) => {
  let userId = "";
  socket.emit("join", { roomId, userId, centerId }, (error) => {
    if (error) {
      console.log(error);
    }
    console.log("joined to ", roomId);
  });
};

export const sendMessage = (id, message, room) => async (dispatch) => {
  socket.emit("sendMessage", { id, message, room }, (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("message sent");
  });
};

export const getMessages = (id) => async (dispatch) => {
  try {
    const { data } = await api.getMessages(id);

    dispatch({ type: "GET-MESSAGES", payload: data });
    return data;
  } catch (error) {
    // console.log(error);
  }
};

export const getRooms = (id) => async (dispatch) => {
  try {
    const { data } = await api.getRooms(id);

    dispatch({ type: "GET-ROOMS", payload: data });
    return data;
  } catch (error) {
    // console.log(error);
  }
};
