export interface ICoordinate {
  latitude: number;
  longitude: number;
}
export type DriverCallStatusType = "notSelected" | "selecting" | "selected";
export type PassengerCallStatusType =
  | "notRequested"
  | "requesting"
  | "accepted";
