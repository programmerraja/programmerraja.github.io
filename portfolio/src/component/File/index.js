import { useState } from "react";
import Emoji from "../../images/emoji.png";
import MySelf from "../../images/me.jpeg";
import Klenty from "../../images/klenty.jpeg";
import ChefAtHome from "../../images/chefathome.jpeg";

import HTML from "../../images/html.png";
import CSS from "../../images/css.png";
import javascript from "../../images/javascript.png";
import bootstrap from "../../images/bootstrap.png";
import jquery from "../../images/jquery.png";
import react from "../../images/react.png";
import nodejs from "../../images/nodejs.png";
import expressjs from "../../images/expressjs.png";
import python from "../../images/python.png";
import c from "../../images/c.svg";
import java from "../../images/java.svg";
import cplus from "../../images/c++.svg";

import mysql from "../../images/mysql.svg";
import mongodb from "../../images/mongodb.svg";
import firebase from "../../images/firebase.png";

import "./style.css";

function File() {
  const [page, setPage] = useState("ABOUT");

  function onClick(pageName) {
    setPage(pageName);
  }

  return (
    <>
      <div className="container">
        <div className="fileContainerWrapper">
          <div className="fileSideContainer">
            <ol>
              <li onClick={() => onClick("ABOUT")}>About Me</li>
              <li onClick={() => onClick("EXPEREINCE")}>Expereince</li>
              <li onClick={() => onClick("SKILLS")}>Skills</li>
              <li onClick={() => onClick("PROJECTS")}>Projects</li>
              {/* <li onClick={() => onClick("ABOUT")}>Blogs</li> */}
            </ol>
          </div>
          <div className="fileContent">
            <Content page={page} />
          </div>
        </div>
      </div>
    </>
  );
}

function Content({ page }) {
  if (page === "ABOUT") {
    return <AboutMe></AboutMe>;
  }
  if (page === "SKILLS") {
    return <Skills></Skills>;
  }
  if (page === "EXPEREINCE") {
    return <Expereince></Expereince>;
  }
  if (page === "PROJECTS") {
    return <Projects></Projects>;
  }
}

function AboutMe() {
  return (
    <>
      <div class="aboutMeContent">
        <img src={MySelf} alt="" height={90} width={90} />
        <div>
          <p>
            Hi <img class="emoji" alt="wave" src={Emoji} height={15} /> I'm{" "}
            <span class="name ">K.Boopathi</span>
            <br></br>
            <small style={{ color: "#fec938" }}>
              {"<"}Full Stack Developer/{">"}
            </small>
          </p>
        </div>
        <div class="">
          <small>
            `Programmer with curious to learn different technology and develop
            cool product from that `
          </small>
        </div>
      </div>
    </>
  );
}

function Expereince() {
  return (
    <>
      <div class="expereinceContent">
        <div class="companyWrapper">
          <div class="companyLogo">
            <img src={Klenty} alt="klenty" />
          </div>
          <div class="companyDescription">
            <p>Full Stack Developer</p>
            <small>March 2022 - Present </small>
          </div>
        </div>
        <div class="companyWrapper">
          <div class="companyLogo">
            <img src={ChefAtHome} alt="chefathome" />
          </div>
          <div class="companyDescription">
            <p>Full Stack Developer</p>
            <small>May 2021 - Sep 2021 </small>
          </div>
        </div>
      </div>
    </>
  );
}

function Skills() {
  return (
    <>
      <div class="skills__container">
        <div class="skill html skill_programming">
          <img class="skill_image" src={HTML} alt="html" />
        </div>
        <div class="skill skill_programming css">
          <img class="skill_image" src={CSS} alt="html" />
        </div>
        <div class="skill skill_programming js">
          <img class="skill_image" src={javascript} alt="html" />
        </div>

        <div class="skill skill_programming bootstrap">
          <img class="skill_image" src={bootstrap} alt="html" />
        </div>
        <div class="skill skill_programming jquery">
          <img class="skill_image" src={jquery} alt="html" />
        </div>
        <div class="skill skill_programming  react">
          <img class="skill_image" src={react} alt="html" />
        </div>
        <div class="skill skill_programming nodejs">
          <img class="skill_image" src={nodejs} alt="html" />
        </div>
        <div class="skill skill_programming expressjs">
          <img class="skill_image" src={expressjs} alt="html" />
        </div>

        <div class="skill skill_programming python">
          <img class="skill_image" src={python} alt="html" />
        </div>
        <div class="skill skill_programming java">
          <img class="skill_image" src={java} alt="html" />
        </div>
        <div class="skill skill_programming c ">
          <img class="skill_image" src={c} alt="html" />
        </div>
        <div class="skill skill_programming c++">
          <img class="skill_image" src={cplus} alt="html" />
        </div>
        <div class="skill skill_database mongodb">
          <img class="skill_image" src={mongodb} alt="html" />
        </div>
        <div class="skill skill_database mysql">
          <img class="skill_image" src={mysql} alt="html" />
        </div>
        <div class="skill Firebase skill_database">
          <img class="skill_image" src={firebase} alt="html" />
        </div>
      </div>
    </>
  );
}

function Projects() {
  return (
    <>
      <p>Projects </p>
    </>
  );
}
export default File;
