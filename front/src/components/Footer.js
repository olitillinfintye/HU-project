import React from 'react';
import "../styles/Footer.css";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div class="footer-main">
            <div class="container-foot">
                <div class="row">
                    <div class="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><Link to="#" >about us</Link> </li>
                            <li><Link to="#" >our services</Link> </li>
                            <li><Link to="#" >privacy policy</Link> </li>
                            <li><Link to="#" >affiliate program</Link> </li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><Link to="#" >FAQ</Link> </li>
                            <li><Link to="#" >Telegram-Bot</Link> </li>
                            <li><Link to="#" >returns</Link> </li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Department</h4>
                        <ul>
                            <li><Link to="#">Computer Science</Link></li>
                            <li><Link to="#">Communication</Link></li>
                            <li><Link to="#">Power</Link></li>
                            <li><Link to="#">Mechanical</Link></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>follow us</h4>
                        <div class="social-links">
                            <Link to="#"><i class="fab fa-facebook-f"></i></Link>
                            <Link to="#"><i class="fab fa-twitter"></i></Link>
                            <Link to="#"><i class="fab fa-instagram"></i></Link>
                            <Link to="#"><i class="fab fa-linkedin-in"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;