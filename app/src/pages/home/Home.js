import React from "react";
import { GuardLayout } from "../../layouts/GuardLayout";
import { HomeView } from "../../views/homeView";
import "./home.css";

const Home = (props) => {
  return (
    <GuardLayout {...props}>
      <HomeView />
    </GuardLayout>
  );
};

Home.defaultProps = {
  guestGuard: false,
  authGuard: true,
};
export default Home;
