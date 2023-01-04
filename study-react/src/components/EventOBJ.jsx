// 이벤트 객체와 몇 가지 이벤트 확인
// 이벤트 객체 - 자바스크립트의 이벤트 객체

import { useState } from "react";

// 자바스크립트 형태 사용, node로 접근이 가능
const EventOBJ = () => {
    const [onMouse, setOnMouse] = useState(false)
    return ( 
        <div>
            <h1>envetOBJ 컴포넌트입니다</h1>
            <p onMouseEnter={
                (e)=>{
                    // 이벤트가 발생했을때, 컴포넌트의 값을 수정하는 함수나 state사용
                    // 관련 기능을 작성할수 있는 자바스크립트 작성가능
                    setOnMouse(true);
                    
                    // 이벤트 객체를 통해서 DOM 값을 가져올수 있다
                    console.log("target", e.target);
                    console.log("currentTarget",e.currentTarget);
                    // 이벤트 객체를 통해서 가져온 DOM 값을 자바스크립트에서 사용한 
                    // 방식으로 수정할수 있다
                    e.target.style.color = 'red';

                    // 이벤트 객체를 통해서 자바스크립트 형식으로 값을 가져오기
                    // 노드로 접근하는 법 : http://www.tcpschool.com/javascript/js_dom_nodeAccess
                    console.log(e.currentTarget.firstElementChild.innerHTML);
                }
            } 
             /**리액트에서 스타일을 바꿀때 사용한 방식 */ 
             // style 속성에 객체형태로 값을 넣을 수 있다
             // 값을 수정하기위해 state의 값에 따라서 수정할수 있다
             // >> state중심으로 화면이 업데이트 > 데이터 중심으로 화면구성
            style={ onMouse ? {color:"red"} : {} }
            > 
                <span style={{fontWeight:"bold"}}>마우스</span>를 위로 올리세요:{onMouse? "올라갔습니다" : "아직 올라가지 않았습니다"}
            </p>
        </div>
    );
}
 
export default EventOBJ;