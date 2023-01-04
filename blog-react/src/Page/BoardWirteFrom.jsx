import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { modifyBoard } from "../modules/board";

const BoardWriteFrom = () => {
    //navigate를 통해서 값을 보내주고 state에 사용
    const location = useLocation();
    const [board, setBoard] = useState(location.state);

    // 리덕스의 dispatch
    const dispatch = useDispatch();
    // 라우터의 navigate
    const navigate = useNavigate();

    // 값을 수정했을때 board의 내용을 수정하는 함수
    const onChange = (e) => {
        setBoard({...board, [e.target.name]: e.target.value})
    }
    // 수정완료 버튼을 눌렸을 실행하는 함수
    const onModifyBoard = () => {
        dispatch(modifyBoard(board));
        navigate('/board/'+board.boardId);
    }

    return ( 
        <Container>
            <Row>
                <Col xs={1} >
                    {board.boardId}
                </Col>
                <Col>
                    <input
                        name="title" 
                        value={board.title} 
                        onChange={(e)=>{onChange(e)}}>
                    </input>
                </Col>
                <Col>
                    <Button onClick={onModifyBoard}>수정완료</Button>
                </Col>

            </Row>
            <Row>
                <Col>{board.userEmail}</Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <textarea 
                        name="content"
                        onChange={(e)=>{onChange(e)}}>
                        {board.content}
                    </textarea>
                </Col>
            </Row>

        </Container>
     );
}
 
export default BoardWriteFrom;