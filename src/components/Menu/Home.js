const Home = () => {
  return (
    <div>
      <div
        style={{
          margin: "50px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cde7e34c1fe2fe4f6702aae0021f927cf295e4f2c11e7ce6736a7b6476c55c47?"
            className="aspect-[0.68] object-contain object-center w-full fill-yellow-400 overflow-hidden max-w-[28px]"
            alt=""
          />
        </div>
        <h1
          style={{
            fontSize: "40px",
            marginLeft: "20px",
            textDecoration: "underline",
            textDecorationColor: "#C7A4E3",
            textDecorationThickness: "5px",
          }}
        >
          삼육대학교 컴퓨터공학부 여러분 환영합니다!
        </h1>
      </div>
      <div style={{ margin: "100px", fontSize: "20px" }}>
        <h3>SYU_CREAM</h3>
        <p style={{ textIndent: "1em" }}>
          저희는 구직 사이트의 API를 이용하여 최신 기술동향 및 맞춤형 직무
          추천을 받을 수 있는 사이트입니다. 직무, 언어, 프레임워크를 선택하여
          확인하실 수 있습니다. 직무 추천을 통해 나온 직무에 대한 로드맵을
          chatGPT를 통해 받을 수 있습니다.
        </p>
        <p style={{ textIndent: "1em" }}>
          또한 자신의 학교에서 들은 수강 과목을 통해 다음 학기에 들을 수 있는
          수강 과목에 대해서 추천받을 수 있고, 추가로 어떤 공부를 해야하는 지에
          대해서 알 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Home;
