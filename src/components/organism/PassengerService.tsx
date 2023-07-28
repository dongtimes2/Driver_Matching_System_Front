import styled from "styled-components";
import { useState } from "react";
import Map from "../atoms/Map";
import BottomFixedButton from "../molecule/BottomFixedButton";
import { ICoordinate } from "../../types/map";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "../../constants/map";

const Wrapper = styled.div``;

function PassengerService() {
  const [isCalled, setIsCalled] = useState(false);
  const [coordinate, setCoordinate] = useState<ICoordinate>({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });

  const handleButtonClick = () => {
    setIsCalled((prev) => !prev);
  };

  return (
    <Wrapper>
      <Map setCoordinate={setCoordinate} />
      <BottomFixedButton
        buttonText={isCalled ? "호출취소" : "호출하기"}
        mode={isCalled ? "dark" : "light"}
        onClick={handleButtonClick}
      />
    </Wrapper>
  );
}

export default PassengerService;
