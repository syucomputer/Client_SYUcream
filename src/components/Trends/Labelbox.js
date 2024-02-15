import { Box } from "@mui/material";
import "./Trends.css";
const labelbox = () => {
  return (
    <Box sx={{ textAlign: "center", marginRight: "200px" }}>
      <label className="labeltitle">
        최신동향 <br />
      </label>
      <label className="labeltxt">
        이 페이지에서는 사용자가 설정한 기간에 대해 <br />
        직무와 기술스택의 순위를 차트로 확인할 수 있습니다. <br />각 직무나
        기술스택을 클릭하면 해당 분야에 대한 상세 설명이 나타나며, <br />이
        정보를 활용하여 현재 시장에서 가장 수요가 많은 기술과 역량을 파악할 수
        있습니다.
      </label>
    </Box>
  );
};

export default labelbox;
