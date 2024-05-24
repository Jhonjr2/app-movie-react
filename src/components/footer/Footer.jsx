import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../css/footer.css'
import img from '../../../public/logo_footer.png'

const Footer = ({ currentYear }) => {
  return (
    <div className="footer">
      <div className="info_footer">
        <img src={img} alt="Footer Logo" />
        <h1>&copy; {currentYear} Kubo - Jhon Rangel </h1>
      </div>
      <div className="icon_footer">
        <FontAwesomeIcon className="icon_email" icon={faEnvelope} />
        <h3>rangeljhon55@gmail.com</h3>
      </div>
    </div>
  );
};

export default Footer;
