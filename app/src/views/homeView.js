import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightbar/Rightbar";

export const HomeView = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};
