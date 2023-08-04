import { useLocation } from "react-router-dom";
import Layout from "../styles/Layout";
import Header from "../components/molecule/Header";
import DriverService from "../components/organism/DriverService";

function Driver() {
  const location = useLocation();
  const { name }: { name: string } = location.state;

  return (
    <Layout>
      <Header userName={name} showRightArea />
      <DriverService />
    </Layout>
  );
}

export default Driver;
