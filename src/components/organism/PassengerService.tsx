import styled from "styled-components";
import { useEffect, useState } from "react";
import BottomFixedButton from "../molecule/BottomFixedButton";
import PassengerMap from "../atoms/PassengerMap";
import { ICoordinate, PassengerCallStatusType } from "../../types/map";
import {
  sendCancelCall,
  sendPassengerCoordinate,
  sendConnectSocket,
  socket,
  sendPassengerCallback,
  sendDisconnectMatching,
} from "../../api/map";

const Wrapper = styled.div`
  height: 100%;
`;

function PassengerService() {
  const [callStatus, setCallStatus] =
    useState<PassengerCallStatusType>("notRequested");
  const [callId, setCallId] = useState<string | null>(null);
  const [passengerCoordinate, setPassengerCoordinate] = useState<ICoordinate>({
    latitude: -1,
    longitude: -1,
  });
  const [driverCoordinate, setDriverCoordinate] = useState<ICoordinate>({
    latitude: -1,
    longitude: -1,
  });

  const handleCallButtonClick = () => {
    if (callStatus === "notRequested") {
      sendPassengerCoordinate(passengerCoordinate);
      setCallStatus("requesting");
    } else if (callStatus === "requesting") {
      sendCancelCall(callId as string);
      setCallId(null);
      setCallStatus("notRequested");
    } else {
      setCallStatus("notRequested");
      sendDisconnectMatching();
      setDriverCoordinate({ latitude: -1, longitude: -1 });
    }
  };

  useEffect(() => {
    sendConnectSocket({ name: "test2", type: "passenger" });

    socket.on("responseCallId", (id: string) => {
      setCallId(id);
    });
    socket.on("responseAcceptCall", (id: string) => {
      sendPassengerCallback(id);
      setCallStatus("accepted");
    });
    socket.on("responseDriverCoordinate", (coordinate: ICoordinate) => {
      setDriverCoordinate(coordinate);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return (
    <Wrapper>
      <PassengerMap
        callStatus={callStatus}
        setPassengerCoordinate={setPassengerCoordinate}
        driverCoordinate={driverCoordinate}
      />
      <BottomFixedButton
        buttonText={callStatus === "notRequested" ? "호출하기" : "호출취소"}
        mode={callStatus === "notRequested" ? "light" : "dark"}
        onClick={handleCallButtonClick}
      />
    </Wrapper>
  );
}

export default PassengerService;
