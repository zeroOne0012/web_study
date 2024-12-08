import styled from 'styled-components';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie'; 

function Login(){
    const navigate = useNavigate(); // history: 구버전
    const [id, setId] = useState("");
    const [pswd, setPswd] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [, setCookie] = useCookies(['authToken', 'id']);

    const mutation = useMutation(data => axios.post('/api/post/login', data)); // 로그인용 useMutation
    
    const handleSubmit = async e => {
        e.preventDefault(); // 새로고침 방지

        if (id==="" || pswd==="") {alert("아이디와 비밀번호를 입력해주세요."); return;}
        try {
            const res = await mutation.mutateAsync({ id, pswd });
            if(res.status === 204) alert("아이디와 비밀번호를 확인해주세요.");
            else if (res.status !== 200) throw new Error('Network response error');
            else if (res.data.token) {
                const time = 3600*1000; //1시간
                const expiration = new Date(Date.now() + time);
                setCookie('authToken', res.data.token, expiration);
                setCookie('id', id, expiration);
                navigate('/');
                window.location.reload(); //bad
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };
        // // 로컬 스토리지 이용한 회원가입 데이터로 로그인
        // const userDataString = localStorage.getItem(id);

        // if (!userDataString) {
        //     alert("존재하지 않는 ID입니다.");
        //     return;
        // }
        // // userDataString ---파싱---> js 객체
        // const userData = JSON.parse(userDataString);

        // if (pswd === userData.pswd){ // 로그인 성공
        //     setCookie('id', id)
        //     navigate('/'); // 홈으로 이동
        // }
        // else{
        //     alert("비밀번호를 확인해주세요.");
        // }

    return (
        <div>
            <div>로그인 페이지</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label>ID </Label>
                    <input 
                        type="text"
                        placeholder="ID"
                        onChange={(e) => setId(e.target.value)}
                    ></input>
                </div>

                <div>
                    <Label>PSWD </Label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="PSWD"
                        onChange={(e) => setPswd(e.target.value)}
                    ></input>
                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        비밀번호 표시
                    </label>
                </div>


                <button type="submit">로그인</button>
                <Link to="/register">
                    <button>회원가입</button>
                </Link>
            </form>
        </div>
    );
}

export default Login;

const Label = styled.label`
    display: inline-block;
    width: 70px;
`;