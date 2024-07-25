import {   BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import { Button } from './components/ui/button'
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import { UserPage } from './Pages/UserPage';
import ErrorPage from './Pages/ErrorPage';

function App() {

 
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AdminLogin />} path='/login' />
          <Route element={<AdminDashboard />} path='/dashboard' />
          <Route element={<UserPage />} path='/' />
          <Route element={<ErrorPage/>} path='*' />
        </Routes>

      </Router>
       
     

    </>
  )
}

export default App
