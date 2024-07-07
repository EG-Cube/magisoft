import React from "react";
import "./App.css";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import CentreSection from "./components/CentreSection";
import RightSide from "./components/RightSide";

const App = () => {

  const userName = "Aparna Sajanbabu";

  return (
    <div className="App">
      <TopNav />
      <div className="main-content">
        <Sidebar userName={userName}/>
        <CentreSection />
        <RightSide />
      </div>
    </div>
  );
};

export default App;
