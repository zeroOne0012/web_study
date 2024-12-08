import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Logo from '../images/Logo.png';
import { mainColor, basicColor} from '../theme';
import { useNavigate } from 'react-router-dom';

function LoginButton(props){
    // const navigate = useNavigate();
    const [cookie, , removeCookie] = useCookies(['authToken', 'id']);
    // const [tokenCookies, setTokenCookie, removeTokenCookie] = useCookies('token');
    // const [isLoading, setIsLoading] = setState(false);

    const Logout = () => {
        removeCookie('id');
        removeCookie('authToken');
        window.location.reload(); //bad
        // navigate('/'); 
    };

    if (cookie.authToken){ //logined
        return(
            <>
            <Menu>
                환영합니다! {cookie.id}님
            </Menu>
            <Menu onClick={Logout} style={{cursor:"pointer"}}>
                로그아웃
            </Menu>
            </>     
        );
    }
    else{
        return(
            <>
            <Menu>
                <Link to="/register" style={{ textDecoration: "none"}}> 회원가입</Link>
            </Menu>
            <Menu>
                <Link to="/login" style={{ textDecoration: "none"}}> 로그인</Link>
            </Menu>
            </>
        );
    }
}

function Toolbar(props){
    const location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/register") return null;
    return (
        <>
        <Menu style={{backgroundColor: location.pathname === "/select-level" ? mainColor : basicColor}}>
            <Link to="/select-level" style={{ textDecoration: "none"}}>
                단계 학습
            </Link>
        </Menu>
        
        <Menu style={{ backgroundColor: location.pathname === "/search" ? mainColor : basicColor}}>
            <Link to="/search" style={{ textDecoration: "none"}}>
                단어 검색
            </Link>
        </Menu>

        <Menu style={{backgroundColor: location.pathname === "/mypage" ? mainColor : basicColor}}>
            <Link to="/mypage" style={{ textDecoration: "none"}}>
                마이페이지
            </Link>
        </Menu>
        <LoginButton/>
        </>
    )
}


function Header(props) {

    return (
        <Container  className="Header">
            <Link to="/" >
                <img src={Logo} alt="logo_image"/>
            </Link>
            
            <Toolbar/>
        
        </Container>
    );
}

export default Header;

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    background: #FFFFFF;
    margin:0;
`;

const Menu = styled.div`
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding:0.6rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin:0;
`;

