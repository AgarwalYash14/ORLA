import { logo } from '../assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')
    const navigate = useNavigate()
    const location = useLocation()

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const scrollToSection = (sectionId: string) => {
        setMobileMenuOpen(false)

        if (location.pathname !== '/') {
            const targetSection = sectionId

            navigate('/', {
                state: { scrollToSection: targetSection },
                replace: true,
            })

            return
        }

        const element = document.getElementById(sectionId)
        if (element) {
            const headerHeight =
                document.querySelector('header')?.clientHeight || 80

            const elementPosition =
                element.getBoundingClientRect().top + window.scrollY

            window.scrollTo({
                top: elementPosition - headerHeight,
                behavior: 'smooth',
            })

            setActiveSection(sectionId)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                'hero',
                'workflow',
                'technology',
                'use-cases',
                'faq',
            ]

            const current = sections
                .map((id) => {
                    const element = document.getElementById(id)
                    if (element) {
                        const rect = element.getBoundingClientRect()
                        const visibleHeight =
                            Math.min(rect.bottom, window.innerHeight) -
                            Math.max(rect.top, 0)
                        const visiblePercentage =
                            visibleHeight / element.clientHeight
                        return {
                            id,
                            visiblePercentage:
                                visiblePercentage > 0 ? visiblePercentage : 0,
                        }
                    }
                    return { id, visiblePercentage: 0 }
                })
                .reduce((prev, current) =>
                    prev.visiblePercentage > current.visiblePercentage
                        ? prev
                        : current
                )

            setActiveSection(current.id)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (
            location.pathname === '/' &&
            location.state &&
            location.state.scrollToSection
        ) {
            const targetSection = location.state.scrollToSection

            setTimeout(() => {
                const element = document.getElementById(targetSection)
                if (element) {
                    const headerHeight =
                        document.querySelector('header')?.clientHeight || 80

                    const elementPosition =
                        element.getBoundingClientRect().top + window.scrollY
                    window.scrollTo({
                        top: elementPosition - headerHeight,
                        behavior: 'smooth',
                    })

                    setActiveSection(targetSection)

                    navigate('/', { replace: true, state: {} })
                }
            }, 100)
        }
    }, [location, navigate])

    const getLinkClass = (sectionId: string) => {
        const isHomeRoute = location.pathname === '/'
        return `nav-link px-2 py-1 ${isHomeRoute && activeSection === sectionId ? 'active-nav-link' : ''}`
    }

    return (
        <header className="relative w-full">
            <div className="relative flex justify-between">
                <div className="hidden md:block">
                    <div className="nav-triangle-wrapper nav-triangle-wrapper-left">
                        <div className="nav-triangle nav-triangle-left"></div>
                    </div>
                </div>
                <div className="border-tertiary flex h-20 w-full items-center justify-between border-b md:w-[calc(100vw-47.6px)]">
                    {/* Logo section */}
                    <div className="flex h-full items-center gap-3 px-4 md:w-1/4 md:px-0">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src={logo}
                                className="h-8 rounded-full md:h-10"
                                alt="ORLA Logo"
                            />
                            <div className="flex flex-col">
                                <h1 className="font-tertiary text-xl leading-[0.9] font-light md:text-2xl">
                                    ORLA
                                </h1>
                                <h1 className="font-secondary text-xl leading-[0.8] uppercase md:text-2xl">
                                    BLUE
                                </h1>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="border-tertiary hidden h-full w-[calc(50%-37px)] items-center justify-center gap-4 border-x-2 text-sm tracking-wider md:flex lg:gap-6">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={getLinkClass('hero')}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('workflow')}
                            className={getLinkClass('workflow')}
                        >
                            How ORLA Works
                        </button>
                        <button
                            onClick={() => scrollToSection('technology')}
                            className={getLinkClass('technology')}
                        >
                            Technology
                        </button>
                        <button
                            onClick={() => scrollToSection('use-cases')}
                            className={getLinkClass('use-cases')}
                        >
                            Use Cases
                        </button>
                        <button
                            onClick={() => scrollToSection('faq')}
                            className={getLinkClass('faq')}
                        >
                            FAQ
                        </button>
                    </div>

                    {/* CTA Section */}
                    <div className="hidden w-1/4 items-center justify-end gap-4 text-sm md:flex lg:gap-8">
                        <Link to="/generate" className="rounded-btn">
                            Start creating
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center pr-4 md:hidden">
                        <button
                            className="text-2xl"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                '✕'
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <div className="v h-[1px] w-8 bg-black" />
                                    <div className="v h-[1px] w-8 bg-black" />
                                    <div className="v h-[1px] w-8 bg-black" />
                                </div>
                            )}
                        </button>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="nav-triangle-wrapper nav-triangle-wrapper-right">
                        <div className="nav-triangle nav-triangle-right"></div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="border-tertiary bg-primary absolute z-50 w-full border-b-2 md:hidden">
                    <div className="mx-auto flex w-min flex-col items-center justify-center gap-4 py-4 text-sm tracking-wider text-nowrap">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={getLinkClass('hero')}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('workflow')}
                            className={getLinkClass('workflow')}
                        >
                            Generate
                        </button>
                        <button
                            onClick={() => scrollToSection('technology')}
                            className={getLinkClass('technology')}
                        >
                            Technology
                        </button>
                        <button
                            onClick={() => scrollToSection('use-cases')}
                            className={getLinkClass('use-cases')}
                        >
                            Use Cases
                        </button>
                        <button
                            onClick={() => scrollToSection('faq')}
                            className={getLinkClass('faq')}
                        >
                            Docs
                        </button>
                    </div>
                    <div className="border-tertiary flex flex-col items-center gap-4 border-t py-4">
                        <Link
                            to="/generate"
                            className="rounded-btn"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Start creating
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
