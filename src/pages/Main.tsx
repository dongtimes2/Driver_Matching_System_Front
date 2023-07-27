import Header from "../components/molecule/Header";
import MainTitle from "../components/organism/MainTitle";
import Layout from "../styles/Layout";

function Main() {
  return (
    <Layout>
      <Header showRightArea={false} />
      <MainTitle />
    </Layout>
  );
}

export default Main;
