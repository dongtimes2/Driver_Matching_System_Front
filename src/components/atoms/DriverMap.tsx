/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "../../constants/map";
import { styled } from "styled-components";
import { ICall } from "../../types/api";
import { ICoordinate } from "../../types/map";
import driverIcon from "../../assets/img/driver.png";
import passengerIcon from "../../assets/img/pointer2.png";
import { infowindowText } from "../../utils/infowindowText";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  callList: ICall[];
  setSelectedCall: React.Dispatch<React.SetStateAction<ICall | null>>;
  onUpdateCoordinate: (data: ICoordinate) => void;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & > div {
    width: 100%;
    height: 100%;
  }
`;

function DriverMap({ callList, setSelectedCall, onUpdateCoordinate }: Props) {
  const [map, setMap] = useState<any | null>(null);
  const [, setMarkerList] = useState<any>([]);
  const mapScript = useRef<HTMLScriptElement | null>(null);
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
          console.log(latitude, longitude);

          if (isMapCreated) {
            if (driverMarker.current) {
              driverMarker.current.setPosition(
                new window.kakao.maps.LatLng(latitude, longitude)
              );
            }

            onUpdateCoordinate({ latitude, longitude });
          } else {
            createMap();
          }
        };

        const onError = () => {
          console.log("error");
          !isMapCreated && createMap();
        };

        const option = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        const createMap = () => {
          isMapCreated = true;

          const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 6,
          };
          setMap(new window.kakao.maps.Map(container, options));
        };

        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(onSuccess, onError, option);
        } else {
          onError();
        }
      });
    };
    mapScript.current.addEventListener("load", onLoadKakaoMap);
  }, []);

  // driver 마커 구현부
  useEffect(() => {
    if (!map) return;

    const imageSize = new window.kakao.maps.Size(48, 64);
    const imageOption = { offset: new window.kakao.maps.Point(24, 60) };
    const markerImage = new window.kakao.maps.MarkerImage(
      driverIcon,
      imageSize,
      imageOption
    );

    driverMarker.current = new window.kakao.maps.Marker({
      position: map.getCenter(),
      map,
      image: markerImage,
    });
  }, [map]);

  // passenger marker 로직 구현부
  useEffect(() => {
    if (!map) return;

    const imageSize = new window.kakao.maps.Size(32, 48);
    const imageOption = { offset: new window.kakao.maps.Point(16, 45) };
    const markerImage = new window.kakao.maps.MarkerImage(
      passengerIcon,
      imageSize,
      imageOption
    );

    setMarkerList((markerList: any) => {
      markerList.forEach((markerData: any) => {
        markerData.marker.setMap(null);
        markerData.infowindow.close();
      });

      return callList.map((call) => {
        const position = new window.kakao.maps.LatLng(
          call.coordinate.latitude,
          call.coordinate.longitude
        );
        const marker = new window.kakao.maps.Marker({
          position,
          map,
          image: markerImage,
        });
        const infowindow = new window.kakao.maps.InfoWindow({
          position,
          content: infowindowText(call.passengerName),
        });
        infowindow.open(map, marker);

        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedCall(call);
        });

        return { marker, infowindow };
      });
    });
  }, [callList, map]);

  return (
    <Wrapper>
      <div id="map" />
    </Wrapper>
  );
}

export default DriverMap;
