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

// DB USER TABLE 쉽게 확인하는 용도의 임시 컴포넌트
function JsonTest(props){
    return(
      <Paper>
        <Table style = {{backgroundColor: " #00001234"}}>

          <TableHead>
            <TableRow>
              <TableCell>아이디</TableCell>
              <TableCell>비밀번호(해싱)</TableCell>
              <TableCell>이름</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.data.map(d=>(
              <TableRow id = {d.id}>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.pswd}</TableCell>
                <TableCell>{d.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>      
      </Paper> 

    )
}
const fetchData = async () => {

    return axios.get('/api/get/userData')
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Network response error');
      }
      return response.data
    })
    .catch(error => {
      console.error('Error fetching data:', error.message);
    });

};
const UserData = () => {
  const { data, isLoading, isError, error } = useQuery('userData', fetchData);  
  
  return (
    <>
      <h3>USER DB 확인</h3>
      {data ? <JsonTest data = {data}/> : <Loading/>}
    </>
  );
};

export default UserData;
