import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Main from './pages/Main'
import Orla from './pages/Orla'
import Header from './layout/Header'
// import LoadingScreen from './components/LoadingScreen'
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'

function App() {
    // const [loading, setLoading] = useState(true)

    // const finishLoading = () => {
    //     setLoading(false)
    // }

    // gsap.registerPlugin(useGSAP)

    return (
        <div className="flex min-h-screen flex-col">
            {/* {loading && <LoadingScreen finishLoading={finishLoading} />} */}

            <div className="bg-primary sticky top-0 z-50 w-full">
                <Header />
            </div>

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/generate" element={<Orla />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
