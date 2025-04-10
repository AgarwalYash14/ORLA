import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import Orla from './pages/Orla'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/orla' element={<Orla />} />
            </Routes>
        </>
    )
}

export default App
