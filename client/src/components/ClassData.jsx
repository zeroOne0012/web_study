import React from 'react';
import Loading from './Loading';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TableBody } from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchData = async () => {
  return axios.get('/api/get/classData')
  .then(res=>{
    if (res.status!==200) throw new Error('Networkresponse error');
    return res.data;
  })
  .catch(err=>console.error('Error fetching data:', err));
};

const ClassData = () => {
  const {data} = useQuery(["classData"], fetchData);
  
  let level = ""; // CLASS 데이터 추가 시 사용
  let URL = ""; 
  let title = ""; 
  let detail = ""; 

  const handleSubmit = async e => { // CLASS 데이터 추가 시 사용
    e.preventDefault();
    if (level==="" || URL==="") {alert("필수 항목을 모두 입력해주세요."); return;}
    
    await axios.post('/api/post/classData', {
      level: level,
      title: title,
      detail: detail,
      URL: URL
    })
    .then(res=>{
      fetchData(); // 컴포넌트 새로고침
    })
    .catch(err=> console.error('Error: ', err));
  };



  
  // DB CLASS TABLE 쉽게 확인하는 용도의 임시 컴포넌트
  function JsonTest(props){
      return(
        <form onSubmit={handleSubmit}>

        <Paper>
          <Table style = {{backgroundColor: " #00001234"}}>
  
            <TableHead>
              <TableRow>
                <TableCell>primary key</TableCell>
                <TableCell>level(1~3:초급~고급)</TableCell>
                <TableCell>title</TableCell>
                <TableCell>detail</TableCell>
                <TableCell>URL(학습 자료 영상 유튜브 URL id)</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {props.data.map(d=>(
                <TableRow id = {d.id}>
                  <TableCell>{d.id}</TableCell>
                  <TableCell>{d.level}</TableCell>
                  <TableCell>{d.title}</TableCell>
                  <TableCell>{d.detail}</TableCell>
                  <TableCell>{d.URL}</TableCell>
                </TableRow>
              ))}
              {/* 데이터 추가 */}
              <TableRow>
                <TableCell>
                  id: 자동할당
                </TableCell>
                <TableCell>
                  <input 
                    type="text"
                    placeholder='난이도'
                    onChange={(e) => level=(e.target.value)}
                  ></input>
                </TableCell>
                <TableCell>
                  <input 
                    type="text"
                    placeholder='주제'
                    onChange={(e) => title=(e.target.value)}
                  ></input>
                </TableCell>
                <TableCell>
                  <input 
                    type="text"
                    placeholder='내용'
                    onChange={(e) => detail=(e.target.value)}
                  ></input>
                </TableCell>
                <TableCell>
                  <input 
                    type="text"
                    placeholder='URL'
                    onChange={(e) => URL=(e.target.value)}
                  ></input>
                  <button type="submit">CLASS tuple 추가</button>
                </TableCell>
              </TableRow>
            </TableBody>
  
          </Table>      

          
              
        </Paper> 
        </form>

      )
  }
  return (
    <>
      <h3>CLASS DB 확인</h3>
      {data ? <JsonTest data = {data}></JsonTest> : <Loading/>}
    </>
  );
};

export default ClassData;
