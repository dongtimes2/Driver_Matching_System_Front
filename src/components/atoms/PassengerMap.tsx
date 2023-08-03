/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "../../constants/map";
import { ICoordinate, PassengerCallStatusType } from "../../types/map";
import passengerIcon1 from "../../assets/img/pointer1.png";
import passengerIcon2 from "../../assets/img/pointer2.png";
import driverIcon from "../../assets/img/driver.png";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  callStatus: PassengerCallStatusType;
  setPassengerCoordinate: React.Dispatch<React.SetStateAction<ICoordinate>>;
  driverCoordinate: ICoordinate;
}

interface IMouseEvent {
  latLng: {
    La: number;
    Ma: number;
  };
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & > div {
    width: 100%;
    height: 100%;
  }
`;

function PassengerMap({
  callStatus,
  setPassengerCoordinate,
  driverCoordinate,
}: Props) {
  const [map, setMap] = useState<any | null>(null);
  const mapScript = useRef<HTMLScriptElement | null>(null);
  const userMarker = useRef<any | null>(null);
  const driverMarker = useRef<any | null>(null);

  useEffect(() => {
    mapScript.current = document.createElement("script");
    mapScript.current.defer = true;
    mapScript.current.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.JAVASCRIPT_KEY}&autoload=false`;
    document.head.appendChild(mapScript.current);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        let latitude = DEFAULT_LATITUDE;
        let longitude = DEFAULT_LONGITUDE;
        let isMapCreated = false;

        const onSuccess = (position: GeolocationPosition) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          setPassengerCoordinate({ latitude, longitude });
          !isMapCreated && createMap();
        };

        const onError = () => {
          !isMapCreated && createMap();
        };

        const createMap = () => {
          isMapCreated = true;
          const position = new window.kakao.maps.LatLng(latitude, longitude);
          const options = {
            center: position,
            level: 3,
          };

          setMap(new window.kakao.maps.Map(container, options));
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
          onError();
        }
      });
    };
    mapScript.current.addEventListener("load", onLoadKakaoMap);
  }, []);

  /**
   * @description
   * click 이벤트 리스너 구현을 위한 부분
   * map 자체가 완전히 생성되지 않은 상황에서 이벤트 리스너를 구현할 경우 오류가 발생했기 때문에
   * map을 state로 만들었으며, 이후 의존성 배열 및 조건문을 통해 map이 생성된 것을 확인한 이후에
   * 로직이 돌아가도록 구현하였음
   *
   * 맨 처음 지도가 로드되었을 때, 지도 중심에서 마커가 생성되도록 하였고, 이후 유저가 지도를 클릭하면
   * 클릭한 위치에 마커가 이동하게끔 하고자 하였음. 이때 isCalled 변수에 의해 effect가 재실행될 때
   * 또 다시 지도의 중심에 마커가 생기는 것을 방지하기 위해 조건문을 추가하여 userMarker 변수가 빈 값일 때만
   * 지도의 중심에 마커가 생성되도록 하였음.
   */

  // passenger 마커 구현부
  useEffect(() => {
    if (!map) return;
    const imageSize = new window.kakao.maps.Size(48, 64);
    const imageOption = { offset: new window.kakao.maps.Point(24, 60) };
    const markerImage = new window.kakao.maps.MarkerImage(
      passengerIcon1,
      imageSize,
      imageOption
    );

    // 유저 마커가 없을 경우 지도 중심에서 최초 생성
    if (!userMarker.current) {
      userMarker.current = new window.kakao.maps.Marker({
        position: map.getCenter(),
        map,
        image: markerImage,
      });
    }

    // let bounds = new window.kakao.maps.LatLngBounds();

    const handleMapClick = (mouseEvent: IMouseEvent) => {
      const latitude = mouseEvent.latLng.Ma;
      const longitude = mouseEvent.latLng.La;
      const position = new window.kakao.maps.LatLng(latitude, longitude);

      // const bounds = new window.kakao.maps.LatLngBounds();

      setPassengerCoordinate({
        latitude,
        longitude,
      });

      userMarker.current.setPosition(position);
      // map.setBounds(bounds);
    };

    if (callStatus === "notRequested") {
      const markerImage = new window.kakao.maps.MarkerImage(
        passengerIcon1,
        imageSize,
        imageOption
      );

      userMarker.current.setImage(markerImage);
      window.kakao.maps.event.addListener(map, "click", handleMapClick);
    } else {
      const markerImage = new window.kakao.maps.MarkerImage(
        passengerIcon2,
        imageSize,
        imageOption
      );

      userMarker.current.setImage(markerImage);
      // bounds.extend(position);
      // map.setBounds(bounds);
    }

    return () => {
      window.kakao.maps.event.removeListener(map, "click", handleMapClick);
    };
  }, [callStatus, map]);

  // driver의 현재 위치 마커 구현부
  useEffect(() => {
    if (!map) return;
    const latitude = driverCoordinate.latitude;
    const longitude = driverCoordinate.longitude;
    const position = new window.kakao.maps.LatLng(latitude, longitude);
    const imageSize = new window.kakao.maps.Size(48, 64);
    const imageOption = { offset: new window.kakao.maps.Point(24, 60) };
    const markerImage = new window.kakao.maps.MarkerImage(
      driverIcon,
      imageSize,
      imageOption
    );

    if (latitude === -1 || longitude === -1) {
      if (driverMarker.current) driverMarker.current.setMap(null);
    } else {
      if (driverMarker.current) {
        driverMarker.current.setPosition(position);
        driverMarker.current.setMap(map);
      } else {
        driverMarker.current = new window.kakao.maps.Marker({
          position,
          map,
          image: markerImage,
        });
      }
    }
  }, [driverCoordinate, map]);

  return (
    <Wrapper>
      <div id="map" />
    </Wrapper>
  );
}

export default PassengerMap;
