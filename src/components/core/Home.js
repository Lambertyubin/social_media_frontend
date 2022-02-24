import Topbar from "../social/topbar/Topbar";
import Sidebar from "../social/sidebar/Sidebar";
import Feed from "../social/feed/Feed";
import Rightbar from "../social/rightbar/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
