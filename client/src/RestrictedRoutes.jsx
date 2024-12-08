import React from "react";
import {Navigate} from "react-router-dom";

const RestrictedRoutes = ({authenticated, component, redirectPath}) => {
  return (
    authenticated ? component : <Navigate to={redirectPath}/> 
  );
}

export default RestrictedRoutes;

// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import Loading from './components/Loading';

// const RestrictedRoutes = ({ authenticated, component: Component, redirectPath }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     if (authenticated !== null) {
//       setLoaded(true);
//     }
//   }, [authenticated]);

//   if (!loaded) {
//     return <Loading/>; // 로딩 중이므로 아무것도 렌더링하지 않음
//   }

//   return authenticated ? <Component /> : <Navigate to={redirectPath} />;
// };

// export default RestrictedRoutes;