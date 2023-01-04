import '../css/Home.css'

import { useEffect, useMemo } from "react";
import { useState } from "react";
import Slider from "react-slick";
import HomeLink from '../components/HomeLink';


const Home = () => {
  // 시계 출력
  const [time, setTime] = useState(new Date());

  // 시계내용을 출력하는 함수 : return값으로 시간을 돌려줌 - 문자열
  const printClock = () => {
    // 숫자를 문자로 바꿔서, 문자객체에 있는 0을 채우는 메소드 사용
    const hour = String(time.getHours()).padStart(2, "0");
    const second = String(time.getSeconds()).padStart(2, "0");
    const minute = String(time.getMinutes()).padStart(2, "0");
    return `${hour} : ${minute} : ${second}`;
  };

  // 현재 페이지가 실행되었을때, (마운트 되었을 때)
  // setInterval을 이용하여 시간값을 1초마다 바뀌서 출력
  // setInterval은 한번만 작성해주면 된다
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  // 글귀 또는 명언 출력 : 배열 안에 여러 개의 문구를 넣어서 출력
  // 그중에 랜덤으로 하나의 값을 정해서 화면에 출력
  const [words, setWords] = useState([
    { text: "명언 또는 글귀", author: "사람 또는 책 이름" },
    {
      text: "나는 신실하지 않으며, 심지어 이렇게 말하는 이 순간에도 그렇다.",
      author: "쥘 르나르",
    },
    {
      text: "선한 봉사의 씨앗을 뿌려라. 감사의 기억들이 이 씨앗을 자라게 할 것이다.",
      author: "마담 드 스탈",
    },
    {
      text: "과거를 기억 못하는 이들은 과거를 반복하기 마련이다.",
      author: "조지 산타야나",
    },
    {
      text: "무력은 모든 것을 정복하지만, 그 승리는 오래가지 못한다.",
      author: "에이브러햄 링컨",
    },
  ]);

  // 글귀를 랜덤하게 출력하는 함수 작성
  // > 문제 : printWord를 실행 할때마다 randum 값이 바뀐다
  // >> 왜 바뀌는가? : update를 할때마다 printWord 실행
  // >> printWord가 return의 html 안에 있기때문에 계속해서 실행

  // 이 함수를 고정할 수 있는 방법 : useCallback, useMemo
  // return값을 고정 : useMemo - return 값 고정
  // useMemo를 사용했을때, 변수 안에 들어가는 것 = return값
  const printWord = useMemo(() => {
    const randomnum = Math.floor(Math.random() * words.length);
    return words[randomnum];
  }, []);

  // 슬릭 화면 사용
  // 슬릭과 같은 라이브러리를 사용할 때, 관련 내용을 확인
  const settings = {
    arrows : false,
    infinite: true,
    autoplay : true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 슬릭에 출력할 배경이미지 배열
  const [imageList , setImageList] = useState([
    "background_1.jpg",
    "background_2.jpg",
    "background_3.jpg",
  ])


  return (
    <div>
      {/** 슬릭화면 출력 */}
      <div>
        <Slider {...settings}>
          
            {/** sldier는 내용이 커지면 다음 페이지에 넘어간다 
             * 크기를 조절해서 사용*/}
            {/** 이미지를 주소로 바로접근할수 없기 때문에 require로 접근 */}
          {/**
          <div>
            <img style={{width:"100%"}} src={require(`../img/background_1.jpg`)} alt="" />
          </div>
           */}
          {/** map을 사용해서 출력 - 배열 */}
            {
              imageList.map((image)=>( 
                <div>
                <div 
                  style={{
                    width:"100%", 
                    height:"99vh",
                    backgroundImage : 'url('+require("../img/"+image)+')',
                    backgroundSize : "cover"
                  }} >
                  </div>
                </div>
              ))
            }
        </Slider>
      </div>


      <div className="Home_main">
        {/** 현재 시간 출력 */}
        <h1>{printClock()}</h1>
        {/** 배열안에 있는 명언 중 하나 출력 */}
        {/** useMemo를 사용했을 경우,
         * 그 함수의 return값이 변수 안에 들어가게된다.
         * 사용할 때 변수이름으로만 사용 */}
        <p>{printWord.text}</p>
        <p>{printWord.author}</p>
      </div>

      <HomeLink />

    </div>
  );
};

export default Home;
