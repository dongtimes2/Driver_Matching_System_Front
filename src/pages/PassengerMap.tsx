// import Map from "../components/atoms/Map";
import Header from "../components/molecule/Header";
import PassengerService from "../components/organism/PassengerService";
import Layout from "../styles/Layout";

function PassengerMap() {
  return (
    <Layout>
      <Header showRightArea />
      <PassengerService />
    </Layout>
  );
}

export default PassengerMap;
