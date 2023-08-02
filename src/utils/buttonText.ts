import { DriverCallStatusType } from "../types/map";

export const temp = {};
export const getDriverButtonText = (status: DriverCallStatusType) => {
  switch (status) {
    case "notSelected":
      return "요청을 선택하세요";
    case "selecting":
      return "요청 선택하기";
    case "selected":
      return "요청 선택완료";
    default:
      return "";
  }
};
