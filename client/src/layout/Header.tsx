import { logo } from '../assets'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
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
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/generate"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                        >
                            Generate
                        </NavLink>
                        <NavLink
                            to="/how-it-works"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                        >
                            How ORLA works
                        </NavLink>
                        <NavLink
                            to="/technology"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                        >
                            Technology
                        </NavLink>
                        {/* <NavLink
                            to="/community"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                        >
                            Community
                        </NavLink> */}
                        <NavLink
                            to="/docs"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                        >
                            Docs
                        </NavLink>
                    </div>

                    {/* CTA Section */}
                    <div className="hidden w-1/4 items-center justify-end gap-4 text-sm md:flex lg:gap-8">
                        <Link to="/generate" className="rounded-btn">
                            Get started
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
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/generate"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Generate
                        </NavLink>
                        <NavLink
                            to="/how-it-works"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            How ORLA works
                        </NavLink>
                        <NavLink
                            to="/technology"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Technology
                        </NavLink>
                        <NavLink
                            to="/community"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Community
                        </NavLink>
                        <NavLink
                            to="/docs"
                            className={({ isActive }) =>
                                `nav-link px-2 py-1 ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Docs
                        </NavLink>
                    </div>
                    <div className="border-tertiary flex flex-col items-center gap-4 border-t py-4">
                        {/* <Link
                            to="/login"
                            className="nav-link py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login
                        </Link> */}
                        <Link
                            to="/signup"
                            className="rounded-btn"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
