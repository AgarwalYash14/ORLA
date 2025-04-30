import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Main from './pages/Main'
import Orla from './pages/Orla'
import Header from './layout/Header'
import LoadingScreen from './components/LoadingScreen'

function App() {
    // const [loading, setLoading] = useState(true)

    // const finishLoading = () => {
    //     setLoading(false)
    // }

    return (
        <>
            {/* {loading && <LoadingScreen finishLoading={finishLoading} />} */}

            <div className="bg-primary sticky top-0 z-50 w-full">
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/generate" element={<Orla />} />
            </Routes>
        </>
    )
}

export default App
