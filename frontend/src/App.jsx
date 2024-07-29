import {   BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import { Button } from './components/ui/button'
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import { UserPage } from './Pages/UserPage';
import ErrorPage from './Pages/ErrorPage';

function App() {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === true;
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<AdminLogin /> } />
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/' element={ <UserPage /> } />
          <Route path='*' element={<ErrorPage />} />
        </Routes>

      </Router>
       
     

    </>
  )
}

export default App
