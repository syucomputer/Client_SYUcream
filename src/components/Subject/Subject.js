import React from "react";
import Nav from "../Nav/Nav";
import SubjectLabel from "./SubjectLabel";
import SubjectTable from "./SubjectTable";
import SubjectKeyword from "./SubjectKeyword";

const Subject = () => {
  return (
    <div style={{ width: "100%" }}>
      <Nav />
      <div style={{
          margin: "30px",
          width: "100%",
          display: 'flex',
          overflow: 'hidden'
        }}
      >
        <div style={{ flex: 3, margin: "20px" }}>
            <SubjectLabel />
            <SubjectTable />
        </div>
          <div style={{ flex: 1, margin: "35px 20px 20px 20px" }}>
              <SubjectKeyword />
          </div>
      </div>
    </div>
  );
};

export default Subject;
