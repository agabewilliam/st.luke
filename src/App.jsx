import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './pages/signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AddEmployee from './pages/system/AddEmployee';
import Department from './pages/system/Department';
import Post from './pages/system/Post';
import Recruit from './pages/system/Recruit';
import Report from './pages/system/Report';

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path='/signup' element = {<Signup/>}/>
                <Route path='/' element = {<Login/>}/> 
                <Route path='/home' element = {<Home/>}/>
                <Route path='/add' element = {<AddEmployee/>}/>
                <Route path='/department' element = {<Department/>}/>
                <Route path='/post' element = {<Post/>}/>
                <Route path='/rec' element = {<Recruit/>}/>
                <Route path='/rep' element = {<Report/>}/>
            </Routes>
        </Router>
    )
}
export default App;