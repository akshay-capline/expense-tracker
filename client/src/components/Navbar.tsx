import { useNavigate } from "react-router-dom";
import { USER_ID } from "../config/localStorageKeys";

const Navbar = () => {
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem(USER_ID, "");
        navigate("/login");
    }


    return (<>
    <nav className="w-full bg-gray-100 flex justify-between px-3 py-1.5 shadow-md">
        <div className="w-full">
        <h2 className="text-lg/8 font-bold tracking-tight ">
          Expense Tracker
        </h2>
      </div>
        <button onClick={logout} className="bg-gray-300 font-semibold py-1.5 px-3 rounded-md cursor-pointer hover:bg-gray-400">
            Logout
        </button>
    </nav>
    </>)
};


export default Navbar;