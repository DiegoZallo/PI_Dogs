import SearchBar from '../SearchBar/searchBar';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './nav.modules.css';

const Nav = ({ onSearch, temperaments, setPage }) => {
  const { pathname } = useLocation();
  const [homeImageSrc, setHomeImageSrc] = useState('https://cdn-icons-png.flaticon.com/128/11706/11706652.png');
  const [formImageSrc, setFormImageSrc] = useState('https://cdn-icons-png.flaticon.com/128/9533/9533684.png');


  const handleHomeMouseOver = () => {
    setHomeImageSrc('../public/images/Dogs icons/dog-house.gif');
  };

  const handleHomeMouseOut = () => {
    setHomeImageSrc('https://cdn-icons-png.flaticon.com/128/11706/11706652.png');
  };

  const handleFormMouseOver = () => {
    setFormImageSrc('../public/images/Dogs icons/adding new dog.gif');
  };

  const handleFormMouseOut = () => {
    setFormImageSrc('https://cdn-icons-png.flaticon.com/128/9533/9533684.png');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="gif-icons-container">
            <div className="gif-container" onMouseOver={handleHomeMouseOver} onMouseOut={handleHomeMouseOut}>
                <div className="gif-icon">
                    <Link to="/home">
                        <img id="home-gif-icon" src={homeImageSrc} alt="Home" className="paused" />
                        <div className="text-overlay">Home</div>
                    </Link>
                </div>
            </div>

          {pathname !== '/form' && (
            <div className="gif-container" onMouseOver={handleFormMouseOver} onMouseOut={handleFormMouseOut}>
                <div className="gif-icon">
                    <Link to="/form" className="create-dog-link">
                        <img id="form-gif-icon" src={formImageSrc} alt="Create Dog" className="paused" />
                        <div className="text-overlay">Create Dog</div>
                    </Link>
                </div>
            </div>
          )}
        </div>

        {!pathname.includes('/detail/') && pathname !== '/form' && (
          <SearchBar onSearch={onSearch} temperaments={temperaments} setPage={setPage} />
        )}
      </nav>
    </div>
  );
};

export default Nav;
