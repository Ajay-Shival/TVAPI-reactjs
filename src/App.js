import Home from './pages/Home';
import Details from './pages/Details'
import './App.css';

import { Route,Routes,BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div >
    <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/details/:id' element={<Details/>}/>
   
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
