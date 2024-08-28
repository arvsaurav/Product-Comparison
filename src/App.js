import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
    return (
        <>
            <Navbar />
            <div className='main-content'>
                <Sidebar />
                <Outlet />
            </div>
        </>
    );
}

export default App;
