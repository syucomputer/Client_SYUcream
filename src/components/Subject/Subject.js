import React from "react";
import Nav from "../Nav/Nav";
import SubjectLabel from "./SubjectLabel";
import SubjectTable from "./SubjectTable";

const Subject = () => {
  return (
    <div>
      <Nav />
      <div style={{ marginTop: "50px", marginLeft: "100px", width: "600px" }}>
        <SubjectLabel />
        <div>
          <SubjectTable />
        </div>
      </div>
    </div>
  );
};

export default Subject;
