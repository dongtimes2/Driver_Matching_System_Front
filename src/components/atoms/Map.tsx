/* eslint-disable */
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BOTTOM_PADDING, TOP_PADDING } from "../../constants/layout";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "../../constants/map";
import { ICoordinate } from "../../types/map";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  setCoordinate: React.Dispatch<React.SetStateAction<ICoordinate>>;
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${TOP_PADDING}rem - ${BOTTOM_PADDING}rem);

  & > div {
    width: 100%;
    height: 100%;
  }
`;

function Map({ setCoordinate }: Props) {
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.JAVASCRIPT_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        let latitude = DEFAULT_LATITUDE;
        let longitude = DEFAULT_LONGITUDE;

        const onSuccess = (position: any) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          createMap(latitude, longitude);
        };

        const onError = () => {
          createMap(latitude, longitude);
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
          onError();
        }

        const createMap = (latitude: number, longitude: number) => {
          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3, // 지도의 레벨(확대, 축소 정도)
          };
          const map = new window.kakao.maps.Map(container, options);
          const marker = new window.kakao.maps.Marker({
            position: map.getCenter(),
          });
          marker.setMap(map);
          window.kakao.maps.event.addListener(
            map,
            "click",
            (mouseEvent: any) => {
              const latlng = mouseEvent.latLng;
              marker.setPosition(latlng);
              setCoordinate({ latitude: latlng.La, longitude: latlng.Ma });
            }
          );
        };
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  return (
    <Wrapper>
      <div id="map" />
    </Wrapper>
  );
}

export default Map;
