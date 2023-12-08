import "./style.css";

function Terminal() {
  return (
    <>
      <div className="container">
        <div className="menu">
          <div className="buttons-flex">
            <div className="button red"></div>
            <div className="button yellow"></div>
            <div className="button green"></div>
          </div>
          <div className="title">
            <a
              href="https://github.com/programmerraja"
              target="_blank"
              rel="noreferrer"
            >
              <h1>
                <i className="fab fa-github"></i> github.com/programmerraja
              </h1>
            </a>
          </div>
        </div>
        <div id="app"></div>
      </div>
    </>
  );
}

export default Terminal;
