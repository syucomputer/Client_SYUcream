import React, { useState } from "react";
import Button from "../Button/Button";
import "./Course.css"

const Course = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);

    const handlerPull =  () => {
        setLoading(true);

        // 3초 동안 로딩 시뮬레이션
        setTimeout(() => {
            setLoading(false);
            setComplete(true);
        }, 3000);
    };

    const handlerNext = () => {

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>수강과목 확인</h2>
            {loading ? (
                <div>
                    <div className="spinner"></div>
                    <div>
                        사이트 이용을 위한 수강과목을 불러오는 중입니다...
                    </div>
                </div>
            ) : complete ? (
                <div className="successMessage">
                    데이터 불러오기가 완료되었습니다.
                    <Button label="다음으로" className="" onClick={handlerNext} />
                </div>
            ) : (
                    <div>
                        사이트 이용을 위한 수강과목을 불러와주세요! <br/>
                        해당 정보는 강좌추천, 로드맵 추천 등 사이트 이용에 이용됩니다.
                        <Button label="불러오기" className="ButtonPull" onClick={handlerPull} />
                    </div>
                )
            }
        </div>
    );
};

export default Course;
