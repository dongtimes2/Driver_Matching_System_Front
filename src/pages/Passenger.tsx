import { useLocation } from "react-router-dom";
import Header from "../components/molecule/Header";
import Layout from "../styles/Layout";
import PassengerService from "../components/organism/PassengerService";

function Passenger() {
  const location = useLocation();
  const { name }: { name: string } = location.state;

  return (
    <Layout>
      <Header userName={name} showRightArea />
      <PassengerService />
    </Layout>
  );
}

export default Passenger;
