import * as api from "../api/index";

import io from "socket.io-client";
let socket = io("http://localhost:4000");

export const joinRoom = (userId, centerId) => async (dispatch) => {
  socket.emit("join", { userId, centerId }, (error) => {
    if (error) {
      console.log(error);
    }
    console.log("joined to ", centerId);
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

export const getMessages = (room) => async (dispatch) => {
  try {
    const { data } = await api.getMessages(room);

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
