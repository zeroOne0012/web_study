import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';
import { useCookies } from 'react-cookie'; 
import Background from '../components/BackGround';

function Mypage(props){
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [cookie, , removeCookie] = useCookies(['authToken', 'id']);
    axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.authToken}`;
    
    const secession = () => {
        const confirmSecession = window.confirm('정말 탈퇴하시겠습니까?');
        if (confirmSecession) {
            axios.delete(`/api/delete/secession/${cookie.id}`)
            .then(response=>{
                removeCookie('id');
                removeCookie('authToken');
                alert('회원 탈퇴가 완료되었습니다.');
                navigate('/');
            })
            .catch(err=>console.error('Error: ', err));
        }
    };
    useEffect(()=>{
        const getUserData = async ()=>{
            await axios.get(`/api/get/myData/?id=${cookie.id}`)
            .then(res=> setUserData(res.data))
            .catch(err=>console.error("Error: ", err));
        };
        getUserData(); 
    }, []);
    
    return (
        <>
            <Background/>
            <h1>마이페이지</h1>
            {userData ? 
                <>
                <h4>id: {userData.id}</h4>
                <h4>pswd: {userData.pswd}</h4>
                <h4>이름: {userData.name}</h4>  
                </>
            : <Loading/>}
            
            <button onClick={secession}>회원 탈퇴</button>
        </>
    )
}
export default Mypage