import { Link } from 'react-router-dom'
import { logo } from '../assets'
import { BsTwitterX, BsGithub, BsDiscord, BsLinkedin } from 'react-icons/bs'

export default function Footer() {
    return (
        <footer className="ring-tertiary ring">
            <div className="z-40 flex justify-between">
                <div className="border-tertiary w-[4%] border-r" />
                <div className="w-[92%]">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        {/* Logo and Description */}
                        <div className="border-tertiary flex flex-col justify-between border-b p-8 md:border-r md:border-b-0">
                            <div>
                                <div className="mb-6 flex items-center gap-2">
                                    <img
                                        src={logo}
                                        alt="ORLA Logo"
                                        className="h-10 rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="font-tertiary text-xl leading-[0.9] font-light">
                                            ORLA
                                        </h2>
                                        <h2 className="font-secondary text-xl leading-[0.8] uppercase">
                                            BLUE
                                        </h2>
                                    </div>
                                </div>
                                <p className="mb-6 text-sm text-gray-600">
                                    Transform your ideas into 3D reality with
                                    our AI-powered text-to-3D platform. Create,
                                    customize, and export 3D models in seconds.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="text-xl text-gray-600 hover:text-black"
                                >
                                    <BsTwitterX />
                                </a>
                                <a
                                    href="#"
                                    className="text-xl text-gray-600 hover:text-black"
                                >
                                    <BsGithub />
                                </a>
                                <a
                                    href="#"
                                    className="text-xl text-gray-600 hover:text-black"
                                >
                                    <BsDiscord />
                                </a>
                                <a
                                    href="#"
                                    className="text-xl text-gray-600 hover:text-black"
                                >
                                    <BsLinkedin />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="border-tertiary border-b p-8 md:border-r md:border-b-0">
                            <h3 className="font-secondary mb-4 text-xl">
                                QUICK LINKS
                            </h3>
                            <ul className="flex flex-col gap-3 text-sm">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/generate"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Generate
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/technology"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Technology
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/use-cases"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Use Cases
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/docs"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Documentation
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="border-tertiary border-b p-8 md:border-r md:border-b-0">
                            <h3 className="font-secondary mb-4 text-xl">
                                RESOURCES
                            </h3>
                            <ul className="flex flex-col gap-3 text-sm">
                                <li>
                                    <Link
                                        to="/faq"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/tutorials"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Tutorials
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/blog"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/pricing"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/support"
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Support
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="border-tertiary p-8">
                            <h3 className="font-secondary mb-4 text-xl">
                                SUBSCRIBE
                            </h3>
                            <p className="mb-4 text-sm text-gray-600">
                                Stay updated with the latest features and
                                releases.
                            </p>
                            <form className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="ring-tertiary border-tertiary w-full rounded border bg-white p-2 text-sm outline-none focus:ring-1"
                                />
                                <button
                                    className="rounded-btn text-sm"
                                    type="submit"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-tertiary border-t p-6">
                        <div className="flex flex-col justify-between gap-4 text-xs text-gray-500 md:flex-row">
                            <div>
                                © {new Date().getFullYear()} ORLA BLUE. All
                                rights reserved.
                            </div>
                            <div className="flex gap-6">
                                <Link
                                    to="/privacy"
                                    className="hover:text-black"
                                >
                                    Privacy Policy
                                </Link>
                                <Link to="/terms" className="hover:text-black">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-tertiary w-[4%] border-l" />
            </div>
        </footer>
    )
}
