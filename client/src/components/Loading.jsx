import { CircularProgress } from '@mui/material';
import React, {useState, useEffect} from 'react'

function Loading() { // 로딩 아이콘
    const [completed, setCompleted] = useState(0);

    useEffect(()=>{
        const timer = setInterval(
            setCompleted(prevCompleted => (prevCompleted >= 100? 0: prevCompleted+1))
        , 20);
        return () => clearInterval(timer)
    }, []);

    return (
        <CircularProgress varient = 'determinate' value = {completed}/>
    )
}

export default Loading