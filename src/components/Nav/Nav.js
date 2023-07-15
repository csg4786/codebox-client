import React , {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Swal from 'sweetalert2'
import './nav.css';


const Nav = () => {

  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const logout=()=>{
    Swal.fire({
        title: 'Do you really want to Logout?',
        confirmButtonColor: '#4aaffd',
        showCancelButton: true,
        confirmButtonText: 'Logout',
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          localStorage.removeItem("user");
          Swal.fire('Logged Out!', '', 'success')
          navigate("/login");
        }
    });
  }

  const Menu = () =>{
    return (
      <>
        <p><Link to="/">Home</Link></p>
        <p><Link to="/user/submissions">All Submissions</Link></p>
        <p><Link to="/user/profile">Profile</Link></p>
    </>)
  }

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          {/* <img src={logo} alt="logo" /> */}
          <h1><Link to="/">CodeBox</Link></h1>
        </div>
        <div className="navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="navbar-sign">
        <button type="button" onClick={logout}>Logout</button>
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="black"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="black"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
              <div className="navbar-menu_container-links-sign">
                <button type="button" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;