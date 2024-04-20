import Button from "../../../Button/Button";
import "./Roadmap.css"

const Roadmap = ({ setManage }) => {
    return (
        <div>
            <div>
                <select>
                    <option value="1230">20201930_서버_개발자_1230</option>
                    <option value="0103">2021101423_게임_클라이언트_개발자_0103</option>
                    <option value="0214">202110423_네트워크_엔지니어_0214</option>
                    <option value="0225">2021101423_클라우드_개발자_0225</option>
                </select>
                <Button label="로드맵 관리" className="" onClick={setManage}/>
            </div>
            <div className="all-contatiner">
                <div>
                    <h1>네트워크 엔지니어</h1>
                    <div>'네트워크 엔지니어'는 ~~~~~~~~~~~~~~</div>
                </div>
                <div className="roadmap-container">
                    <div className="Line">
                        <div className="add-container">
                            필요한 공부 및 기술
                        </div>
                    </div>
                    <ol className="content-box">
                        <li>기초 지식 : 과학 및 정보 기술의 기본적인 이해</li>
                        <li>네트워킹 지식 :</li>
                        <li>운영 체제 :</li>
                        <li>하드웨어 지식 :</li>
                        <li>보안 지식 :</li>
                        <li>문제 해결 능력 :</li>
                        <li>인증 :</li>
                    </ol>
                </div>
                <div className="roadmap-container">
                    <div className="Line">
                        <div className="add-container">
                            3개월 학습계획
                        </div>
                    </div>
                    <ol className="content-box">
                        <li>기초 지식 : 과학 및 정보 기술의 기본적인 이해</li>
                        <li>네트워킹 지식 :</li>
                        <li>운영 체제 :</li>
                        <li>하드웨어 지식 :</li>
                        <li>보안 지식 :</li>
                        <li>문제 해결 능력 :</li>
                        <li>인증 :</li>
                    </ol>
                </div>
                <div className="roadmap-container">
                    <div className="Line">
                        <div className="add-container">
                            추가적으로 도움이 되는 프로젝트
                        </div>
                    </div>
                    <ul className="content-box">
                        <li>홈 네트워크 설정 : 과학 및 정보 기술의 기본적인 이해</li>
                        <li>가상화 프로젝트 :</li>
                        <li>보안 구현 프로젝트 :</li>
                        <li>오픈 소스 프로젝트 참여 :</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Roadmap;