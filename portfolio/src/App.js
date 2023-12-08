import SideNavBar from "./component/SideNav";
import Terminal from "./component/Terminal";
import TopNavBar from "./component/TopNavBar";
import File from "./component/File";


import "./App.css";

function App() {
  return (
    <>
      <div className="screenwrapper"></div>
      <TopNavBar />
      <div className="screen">
        <SideNavBar />
        <div className="display">
          {/* <Terminal /> */}
          <File/>
        </div>
      </div>
    </>
  );
}

export default App;
