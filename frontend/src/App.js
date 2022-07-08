import {Routes, Route, NavLink ,BrowserRouter as Router} from 'react-router-dom'; 
import Frontend from './pages/Frontend';

function App() {
  return (
    <Router>
      <div className="container">
            <header className="d-flex py-3">
              <ul className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-green-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <li className="nav-item"><NavLink to="/frontend" className="nav-link">Home</NavLink></li>
              </ul>
            </header>
        </div>

        <div className="album py-5 bg-light">
          <div className="container">
           <Routes>
            <Route path='/frontend' element={<Frontend />} />
           </Routes>
        </div>
      </div>
   </Router>
  );
}

export default App;