import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Board = () => {
    
  const boardList = useSelector((state) => state.board);
  // navigate를 사용하기위해 useNavigate사용
  const navigate = useNavigate();
  
  // 게시물의 이름을 클릭했을때 실행될 함수
  const toBoardPage = (id) => {
    // 임의의 값을 넣으면 그 값으로 고정되기에
    // boardId 값을 받아와서 사용
    navigate('/board/'+id);
  }

  return (
  <div>
    <Table striped>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {boardList.map((board)=>(
            <tr>
                <td>{board.boardId}</td>
                <td onClick={()=>{toBoardPage(board.boardId)}}>{board.title}</td>
                <td>{board.userEmail}</td>
                <td>{board.view}</td>
            </tr>
        ))}
      </tbody>
    </Table>
  </div>);
};

export default Board;
