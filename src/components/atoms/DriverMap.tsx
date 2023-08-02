/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "../../constants/map";
import { styled } from "styled-components";
import { ICall } from "../../types/api";
import { ICoordinate } from "../../types/map";

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

          if (isMapCreated) {
            onUpdateCoordinate({ latitude, longitude });
          } else {
            createMap();
          }
        };

        const onError = () => {
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

  useEffect(() => {
    if (!map) return;

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
        });
        const infowindow = new window.kakao.maps.InfoWindow({
          position,
          content: call.passengerName,
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
