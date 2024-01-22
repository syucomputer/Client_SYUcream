import React, { useEffect, useState } from "react";
import styled from "styled-components";
import data from './TrendsData.json';

const Table = styled.table`
  border-collapse: collapse;

  thead tr {
    background-color: #f2f2f2; /* 헤더의 배경색을 연한 회색으로 설정 */
  }

  thead tr,
  tbody tr {
    border-bottom: 1px solid #f2f2f2; /* 테두리 색상을 연한 회색으로 설정 */
  }
`;

const TableContainer = styled.div`
  max-height: 130px;
  overflow-y: auto;
`;

const TrendsTable = () => {
  const [trendsData, setTrendsData] = useState([]);

  
  useEffect(() => {
    setTrendsData(data.result.trends);
  }, []); // 의존성 배열 제거

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>순위</th>
            <th>직무명</th>
            <th>공고수</th>
          </tr>
        </thead>
        <tbody>
          {trendsData.map((trend) => (
            <tr key={trend.rank}>
              <td>{trend.rank}</td>
              <td>{trend.jobTitle}</td>
              <td>{trend.postCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TrendsTable;
