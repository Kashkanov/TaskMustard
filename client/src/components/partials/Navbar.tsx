import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-regular-svg-icons";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 flex justify-end z-30 w-full h-20 bg-white navbar py-5 text-lg shadow-lg">
                <button className="flex items-center justify-center w-1/12 h-full border-secondary-100 border-x-1">
                    <FontAwesomeIcon icon={faBell}/>
                </button>
                <button className="flex items-center justify-center w-1/12 h-full border-secondary-100 border-x-1">
                    <FontAwesomeIcon icon={faGear}/>
                </button>
        </nav>
    )
}

export default Navbar;