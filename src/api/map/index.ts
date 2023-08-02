import { io } from "socket.io-client";
import { ICoordinate } from "../../types/map";
import { IUser } from "../../types/accounts";
import { ICall } from "../../types/api";

const SERVER_URL = process.env.SERVER_URL as string;

// common
export const socket = io(SERVER_URL);

export const sendConnectSocket = ({ name, type }: IUser) => {
  socket.emit("sendConnectSocket", { name, type });
};

// paassenger
export const sendPassengerCoordinate = (coordinate: ICoordinate) => {
  socket.emit("sendPassengerCoordinate", coordinate);
};

export const sendCancelCall = (callId: string) => {
  socket.emit("sendCancelCall", callId);
};

export const sendPassengerCallback = (id: string) => {
  socket.emit("sendPassengerCallback", id);
};

export const sendDisconnectMatching = () => {
  socket.emit("sendDisconnectMatching");
};

// driver
export const sendAcceptCall = (call: ICall) => {
  socket.emit("sendAcceptCall", call);
};

export const sendDriverCoordinate = (coordinate: ICoordinate) => {
  socket.emit("sendDriverCoordinate", coordinate);
};

export const sendDriverCallback = () => {
  socket.emit("sendDriverCallback");
};
