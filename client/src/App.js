import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { OrderProvider } from './context/orderContext';
import { ItemProvider } from './context/itemContext';
import { CustomerProvider } from './context/customerContext';
import MainPage from './components/mainPage';
import Register from './components/register';
import Login from './components/login';
import LogMainPage from './components/logMainPage';
import Customize from './components/customize';
import Cart from './components/cart';
import Profile from './components/profile';


function App() {
  return (
    <div>
      <CustomerProvider>
      <OrderProvider>
      <ItemProvider>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>} />

          <Route path='/register' element={<Register/>} />

          <Route path='/login' element={<Login/>} />

          <Route path='/loggedMainPage' element={<LogMainPage />} />

          <Route path='/customize/:id' element={<Customize />}/>

          <Route path='/cart' element={<Cart />}/>

          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </BrowserRouter>
      </ItemProvider>
      </OrderProvider>
      </CustomerProvider>
    </div>
  )
}

export default App;
