import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Videos from "../videos/videos";
import Vocab from "../vocab/vocab";
import "./learn.css";

const Learn = () => {
  const [currentTab, setCurrentTab] = useState("Vocabulary");

  return (
    <div>
      <Tabs
        activeKey={currentTab}
        onSelect={(t) => setCurrentTab(t)}
        className="learn-tabs"
      >
        <Tab eventKey="Vocabulary" title="Vocabulary" tabClassName="learn-tab">
          <Vocab />
        </Tab>
        <Tab eventKey="Videos" title="Videos" tabClassName="learn-tab">
          <Videos />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Learn;
