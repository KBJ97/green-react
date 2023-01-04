import { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../modules/currentUser";

// css 파일들고옴
import '../css/loginForm.css'

const LoginForm = () => {
  // 리덕스의 리듀서를 사용하기위한 디스패치
  const dispatch = useDispatch();

  // 페이지를 이동하기위한 navigate();
  const navigate = useNavigate();

  // 이메일과 비밀번호를 가져올 state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // 이메일로 회원가입하기위한 함수
  const emailCreate = () => {
    // getAuth는 파이어베이스앱에서 인증 부분을 받아오는 함수
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 회원가입성공
        const user = userCredential.user;
        console.log(user);
        dispatch(userLogin(user))
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        if ( errorCode == "auth/email-already-in-use") {
          alert("이미 사용하고 있는 이메일입니다")
        }
        else if ( errorCode=="auth/weak-password") {
          alert("비밀번호를 6자리 이상으로 작성하세요");
        }
    });
  }
  
  // 이메일과 비밀번호로 로그인하기
  const emailLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        dispatch(userLogin(user));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        if (errorCode =="auth/wrong-password" ) {
          alert("잘못된 비밀번호입니다")
        } else if (errorCode == "auth/user-not-found" ) {
          alert("없는 이메일입니다")
        }
      });
  }

  //Form의 onSubmit에 연결할 함수
  // Form의 경우에는 새로고침으로 값이 사라질 수 있어
  // preventDefault()를 통해서 막아주어야한다
  const onsubmit = (e) => {
    e.preventDefault();
    emailLogin();
  }

  // 구글로 로그인하기 (팝업)
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        dispatch(userLogin(user));
        navigate('/');

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode,errorMessage)
      });
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <Button variant="link" onClick={emailCreate} className='create_button'>아래의 정보로 회원가입</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={1}></Col>
          <Col xs={10} >
            <Form onSubmit={onsubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
              </Form.Group>
              <div className="my_center"> 
                <Button variant="primary" type="submit">로그인</Button>
                <hr />
                <p className="hint_text"> 소셜아이디로 로그인</p>
                <Button variant="outline-danger" onClick={googleLogin}>구글로 로그인</Button>
              </div>
            </Form>


          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
