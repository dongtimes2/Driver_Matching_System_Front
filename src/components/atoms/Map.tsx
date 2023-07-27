import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BOTTOM_PADDING, TOP_PADDING } from "../../constants/layout";

declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

const { kakao } = window;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${TOP_PADDING}rem - ${BOTTOM_PADDING}rem);

  & > div {
    width: 100%;
    height: 100%;
  }
`;

function Map() {
  const map = useRef<unknown>(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    map.current = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <Wrapper>
      <div id="map" />
    </Wrapper>
  );
}

export default Map;
