import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const { auth } = usePuterStore();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <span className="navbar-logo-mark">R</span>
                <p className="text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>
            <div className="flex flex-row items-center gap-6">
                {auth.isAuthenticated && (
                    <>
                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>
                        <button
                            onClick={() => auth.signOut()}
                            className="nav-link cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </>
                )}
                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;