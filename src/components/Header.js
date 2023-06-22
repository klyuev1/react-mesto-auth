import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({email, link, text, OnOut}) {
  const location = useLocation();

  const [mobileEmail, setMobileEmail] = React.useState(false);
  const [mobileLink, setMobileLink] = React.useState(false);

  function handleBurgerClick() {
    setMobileEmail(true);
    setMobileLink(true);
  }

  return (
    <header className="header">

      {location.pathname === "/" && <p className={`header__email_mobile  ${mobileEmail ? 'header_mobile_opened' : ''}`}>{email}</p>}
      <Link className={`header__link_mobile  ${mobileLink ? 'header_mobile_opened' : ''}`} to={link} type="button" onClick={OnOut}>{text}</Link>
      
      <div className="header__main">
        <div className="header__logo"></div>
        <div className="header__box">
          {location.pathname === "/" && <p className="header__email">{email}</p>}
          <Link className="header__link" to={link} type="button" onClick={OnOut}>{text}</Link>
        </div>

        {location.pathname === "/" && <button className='header__burger' type='button' onClick={handleBurgerClick}/>}
      </div>
      
    </header>
  );
}

export default Header;

// Не знаю, как сделать тогл, помогите, пожалуйста!