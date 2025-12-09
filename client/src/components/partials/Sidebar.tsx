import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGun, faHouse, faListCheck} from "@fortawesome/free-solid-svg-icons";
import type {IconDefinition} from "@fortawesome/fontawesome-svg-core";

const Sidebar = () => {

    const linkGroup: linkObj[] = [
        {
            id: 0,
            text: "Dashboard",
            href: "/",
            icon: faHouse
        },
        {
            id: 1,
            text: "Plan",
            href: "/plan",
            icon: faListCheck,
        },
        {
            id: 2,
            text: "End it bozo 😂",
            href: '/dead',
            icon: faGun
        }
    ]

    return (
        <div className="fixed top-0 left-0 flex flex-col bg-primary-200 w-50 h-screen z-40 px-5 py-7">
            <div className="flex flex-col items-center w-full h-2/12">
                <img
                    className="w-4/6 h-4/6 object-contain"
                    src="/icons/concentrate.png"
                    alt="logo"
                />
                <h2 className="logo-font text-2xl">Task App</h2>
            </div>
            <div className="flex flex-col justify-start items-start text-base w-full h-11/12 py-5 gap-3">
                {linkGroup.map((link: linkObj) => (
                    <Link
                        key={link.id}
                        to={link.href}
                    >
                        <FontAwesomeIcon icon={link.icon} />&nbsp;{link.text}
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default Sidebar;

interface linkObj {
    id: number,
    text: string,
    href: string,
    icon: IconDefinition
}
