import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import SelectChapter from './pages/SelectChapter';
import SelectLevel from "./pages/SelectLevel";
import Study from "./pages/Study";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Mypage from "./pages/Mypage";
import Search from './pages/Search';
import RestrictedRoutes from './RestrictedRoutes';
import { useCookies } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function App() {
  const [ cookie ] = useCookies(['id']);
  return (
    <QueryClientProvider client={queryClient}> 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/search/" element={<RestrictedRoutes authenticated={!!cookie.id} component={<Search />} redirectPath="/login"/>}/>
          <Route path="/select-level/" element={<RestrictedRoutes authenticated={!!cookie.id} component={<SelectLevel />} redirectPath="/login"/>}/>
          <Route path="/study/*" element={<RestrictedRoutes authenticated={!!cookie.id} component={<Study />} redirectPath="/login"/>}/>
          <Route path="/select-chapter/*" element={<RestrictedRoutes authenticated={!!cookie.id} component={<SelectChapter />} redirectPath="/login"/>}/>
          <Route path="/mypage/" element={<RestrictedRoutes authenticated={!!cookie.id} component={<Mypage />} redirectPath="/login" />}/>
          <Route path="/login/" element={<RestrictedRoutes authenticated={!cookie.id} component={<Login />} redirectPath="/" />}/>
          <Route path="/register/" element={<RestrictedRoutes authenticated={!cookie.id} component={<Register />} redirectPath="/" />}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;