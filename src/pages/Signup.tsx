import Header from "../components/molecule/Header";
import SignupInfo from "../components/organism/SignupInfo";
import Layout from "../styles/Layout";

function Signup() {
  return (
    <Layout>
      <Header showRightArea={false} />
      <SignupInfo />
    </Layout>
  );
}

export default Signup;
