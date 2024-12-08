import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mainColor, basicColor, accentColor} from '../theme';
// import { Button } from '@mui/material';

function LearningContentCard(props){
  const link = "/select-chapter/" + props.level;
  return (
    <Section>
      <Content>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      </Content>
      <Link to={link}><Button>강의 보기</Button></Link>
    </Section>
  )
}

function SelectLevel() {

  return (
    <Container>
      <Header>
        <h1>sign_language</h1>
      </Header>
      <Main>
        <LearningContentCard
          title = "초급 수어 강의"
          description="수어의 기초를 배우고 싶으신 분들을 위한 강좌입니다."
          level = "1"
        />
        <LearningContentCard
          title = "중급 수어 강의"
          description="초급을 마스터한 분들을 위한 중급 강좌입니다."
          level = "2"
        />
        <LearningContentCard
          title = "고급 수어 강의"
          description="수어에 더 깊게 파고들고 싶으신 분들을 위한 고급 강좌입니다."
          level = "3"
        />
      </Main>
    </Container>
  )
}
export default SelectLevel


const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  padding-left: 0px;
  padding-right: 0px;
  background-color: ${mainColor};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  height: 10rem;
  background-color: ${accentColor};
  margin:
`;

const Main = styled.main`
  margin: 0 auto; 
  display: flex;
  align-items: center;
`;

const Section = styled.section`
  border-radius: 1rem;
  text-align: center;
  margin-right: 40px;
  margin-left: 40px;
  background-color: ${basicColor};
  flex: 1 1 30%;
`;
const Content = styled.article`
  border-radius: 1rem;
  text-align: center;
  margin: 30px;
  padding: 20px;
  background-color: ${mainColor};
  flex: 1 1 30%;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-bottom: 30px;
  &:hover {
    background-color: #25E1F5;
  }
`;