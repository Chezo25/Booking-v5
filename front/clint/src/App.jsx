import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPg from './pages/IndexPg';
import LoginPg from './pages/LoginPg';
import Layout from './layouts/Layout';
import RegisterPg from './pages/RegisterPg';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/index" element={<IndexPg/>} />
        <Route path="/login" element={<LoginPg/>} />
        <Route path="/register" element={<RegisterPg/>} />
      </Route>
      
    </Routes>


  )
}

export default App
