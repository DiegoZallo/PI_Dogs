import SearchBar from "../SearchBar/searchBar";
import { Link, useLocation } from "react-router-dom";

const Nav = ({onSearch, temperaments})=>{
    const {pathname} = useLocation();

    return (
    <div>
        <nav className="navbar">
            <Link to="/home">
                <button>Home</button>
            </Link>
            <Link to="/form">
                <button>Create Dog</button>
            </Link>
            {(!pathname.includes("/detail/")) &&
                <SearchBar onSearch={onSearch} temperaments={temperaments}/>
            }

        </nav>
    </div>
    )
}

export default Nav