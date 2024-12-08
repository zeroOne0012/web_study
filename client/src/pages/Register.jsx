import styled from 'styled-components';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query';

function Register(){
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [availableId, setAvailableId] = useState(false);
    const [id, setId] = useState("");
    const [pswd, setPswd] = useState("");
    const [name, setName] = useState("");
    const mutation = useMutation(data => axios.post('/api/post/userData', data)); // 회원가입용 useMutation
    const [checkedId, setCheckedId] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        if (id==="" || pswd==="" || name==="") {alert("필수 항목을 모두 입력해주세요."); return;}
        if (availableId === false || id!==checkedId) {alert("아이디 중복 검사를 해주세요."); return;}
        try{
            await mutation.mutateAsync({id,pswd,name});
            alert('회원가입이 완료되었습니다.');
            navigate('/'); // 홈으로 이동
        }catch(err){
            console.error('Error: ', err);
        }
    };

    
    const checkId = async () => {
        if (id==="") {
            alert("아이디를 입력해주세요.");
            return;
        }
        const url = '/api/post/checkId';
        try {
            const res = await axios.post(url, {id});
            if (res.data.user_count === 1) {
                alert("중복된 아이디 입니다.");
                setAvailableId(false);
            } else if (res.data.user_count === 0) {
                alert('사용 가능한 아이디 입니다.');
                setCheckedId(id);
                setAvailableId(true);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return(
        <div>
            <div>회원가입 페이지</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label>ID </Label>
                    <input 
                        type="text"
                        placeholder="ID"
                        onChange={(e) => setId(e.target.value)}
                    ></input>
                    <button type="button" onClick = {checkId}>아이디 중복 검사</button>
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

                <div>
                    <Label>이름 </Label>
                    <input
                        type="text"
                        placeholder="이름"
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Register;

const Label = styled.label`
    display: inline-block;
    width: 70px;
`;