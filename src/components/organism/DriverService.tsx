import { styled } from "styled-components";
import { useEffect, useRef, useState } from "react";
import DriverMap from "../atoms/DriverMap";
import BottomFixedButton from "../molecule/BottomFixedButton";
import {
  sendAcceptCall,
  sendConnectSocket,
  sendDisconnectSocket,
  sendDriverCallback,
  sendDriverCoordinate,
  socket,
} from "../../api/map";
import { ICall } from "../../types/api";
import { DriverCallStatusType, ICoordinate } from "../../types/map";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  SENDING_INTERVAL,
} from "../../constants/map";
import { getDriverButtonText } from "../../utils/buttonText";
import useInterval from "../../hooks/useInterval";

interface Props {
  userName: string;
}

const Wrapper = styled.div`
  height: 100%;
`;

function DriverService({ userName }: Props) {
  const coordinate = useRef<ICoordinate>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });
  const [buttonStatus, setButtonStatus] =
    useState<DriverCallStatusType>("notSelected");
  const [callList, setCallList] = useState<ICall[]>([]);
  const [selectedCall, setSelectedCall] = useState<ICall | null>(null);
  const { setIntervalStatus } = useInterval(
    () =>
      sendDriverCoordinate({
        latitude: coordinate.current.latitude,
        longitude: coordinate.current.longitude,
      }),
    SENDING_INTERVAL
  );

  const onUpdateCoordinate = ({ latitude, longitude }: ICoordinate) => {
    coordinate.current = { latitude, longitude };
  };

  const handleButtonClick = () => {
    if (selectedCall && buttonStatus === "selecting") {
      setButtonStatus("selected");
      sendAcceptCall(selectedCall);
      setIntervalStatus("start");
    }
  };

  // 선택한 요청을 다른 driver가 먼저 매칭시켰을 경우,
  // 이를 실시간으로 반영하고 해당 요청을 수락하지 않도록 막는 구현부
  useEffect(() => {
    if (!selectedCall) return;
    if (!callList.find((call) => call.uuid === selectedCall.uuid)) {
      setButtonStatus("notSelected");
      setSelectedCall(null);
    }
  }, [callList, selectedCall]);

  useEffect(() => {
    if (selectedCall) {
      setButtonStatus("selecting");
    } else {
      setButtonStatus("notSelected");
    }
  }, [selectedCall]);

  useEffect(() => {
    sendConnectSocket({ name: userName, type: "driver" });

    socket.on("responseCallList", (data: ICall[]) => {
      setCallList(data);
    });
    socket.on("responseRequestDriverCoordinate", () => {
      sendDriverCoordinate({
        latitude: coordinate.current.latitude,
        longitude: coordinate.current.longitude,
      });
    });
    socket.on("responseDisconnectMatching", () => {
      setIntervalStatus("stop");
      sendDriverCallback();
      setSelectedCall(null);
    });

    return () => {
      sendDisconnectSocket("driver");
      socket.removeAllListeners();
    };
  }, [setIntervalStatus, userName]);

  return (
    <Wrapper>
      <DriverMap
        callList={callList}
        setSelectedCall={setSelectedCall}
        onUpdateCoordinate={onUpdateCoordinate}
      />
      <BottomFixedButton
        buttonText={getDriverButtonText(buttonStatus)}
        mode={buttonStatus === "selecting" ? "light" : "dark"}
        onClick={handleButtonClick}
      />
    </Wrapper>
  );
}

export default DriverService;
