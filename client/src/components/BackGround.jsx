import React from 'react'
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { mainColor, basicColor, accentColor} from '../theme';

function BackGround() {
    return (
      <Container>
        <Header>
        </Header>
      </Container>
    )
  }
  export default BackGround
  
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