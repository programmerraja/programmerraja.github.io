import FileIcon from "../../images/files.png";
import SpotifyIcon from "../../images/spotify.png";
import TerminalIcon from "../../images/terminal.png";
import VscodeIcon from "../../images/vscode.png";
import "./style.css";

function SideNavBar() {
  return (
    <div className="sidenav">
      <div className="sidenav-img">
        <img src={FileIcon} alt="" />
      </div>
      <div className="sidenav-img">
        <img src={TerminalIcon} alt="" />
      </div>
      <div className="sidenav-img">
        <img src={VscodeIcon} alt="" />
      </div>
      <div className="sidenav-img">
        <img src={SpotifyIcon} alt="" />
      </div>
    </div>
  );
}

export default SideNavBar;
