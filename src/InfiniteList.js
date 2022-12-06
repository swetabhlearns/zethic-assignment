import React, { useState } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import Sidebar from "./Sidebar";

const InfiniteList = ({ info }) => {
  const [individualInfo, setIndividualInfo] = useState({});
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <div>
      {showSideBar ? (
        <List
          width={600}
          height={600}
          rowHeight={50}
          rowCount={info.length}
          rowRenderer={({ key, index, style, parent }) => {
            const person = info[index];
            return (
              <div
                key={index}
                style={style}
                onClick={() => {
                  setIndividualInfo(person);
                  setShowSideBar(!showSideBar);
                }}
              >
                <h2> {person.name} </h2>
              </div>
            );
          }}
        />
      ) : (
        <Sidebar
          individualInfo={individualInfo}
          setShowSideBar={setShowSideBar}
          showSideBar={showSideBar}
        />
      )}
    </div>
  );
};

export default InfiniteList;
