import Topbar from "../../components/Topbar/Topbar";
import "./MainLayout.scss";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="contentBg"></div>
      <div className="content">
        <Topbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
