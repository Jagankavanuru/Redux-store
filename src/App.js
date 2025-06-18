import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserHome from './components/userDetails/UserHome';
import SellerHome from './components/sellerDetails/SellerHome';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/userhome' element={<UserHome/>}/>
        <Route path='/sellerhome' element={<SellerHome/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
