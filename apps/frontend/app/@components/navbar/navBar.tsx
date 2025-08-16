"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faUserGroup, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const activeStyle = {
        color: "#eef1ee",
        padding: "1px 20px",
        borderRadius: "8px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid #ee9906",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    };

    return (
        <nav className="relative text-[#7b838d]">
            <div className="w-full">
                <div className="flex justify-between items-center bg-[#13191e] p-5 md:px-20">
                    <div className="w-5/10 flex justify-evenly">
                        <Link href="/" style={pathname === '/' ? activeStyle : {}} className="hidden md:flex hover:text-gray-300 items-center gap-2"><FontAwesomeIcon icon={faComments} /> Chats</Link>
                        <Link href="/friend-request" style={pathname === '/friend-request' ? activeStyle : {}} className="hidden md:flex hover:text-gray-300 items-center gap-2"><FontAwesomeIcon icon={faUserGroup} /> Friend Requests</Link>
                    </div>
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold">ChatApp</Link>
                    </div>
                    <div className="w-5/10 flex justify-evenly">
                        <Link href="/profile" style={pathname === '/profile' ? activeStyle : {}} className="hidden md:flex hover:text-gray-300 items-center gap-2"><FontAwesomeIcon icon={faUser} /> Profile</Link>
                        <Link href="add-friend" style={pathname === '/add-friend' ? activeStyle : {}} className="hidden md:flex hover:text-gray-300 items-center gap-2"> <FontAwesomeIcon icon={faUserGroup} />Add Friend</Link>
                        <Link href="#" className="hidden md:flex hover:text-gray-300 items-center gap-2"><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out</Link>
                    </div>
                    {/* Mobile Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                        >
                            {/* Hamburger Icon */}
                            {!isOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                // Close Icon
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="px-4 pb-3 space-y-2 bg-[#13191e] h-screen w-8/12 ms-auto absolute right-0">
                    <div>
                        <Link href="#" className="block hover:text-gray-300">About</Link>
                        <Link href="#" className="block hover:text-gray-300">Services</Link>
                        <Link href="#" className="block hover:text-gray-300">Contact</Link>
                        <Link href="#" className="block hover:text-gray-300">Home</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
