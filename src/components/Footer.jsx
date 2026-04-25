import "./styles/Footer.css";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-col">
          <h2 className="logo">Food and Drinks</h2>
          <p>
            Elevating dining experiences through exceptional cuisine, warm
            hospitality, and memorable moments.
          </p>

          <div className="socials">
            <span>f</span>
            <span>in</span>
            <span>x</span>
          </div>
        </div>

        {/* QUICK LINKS */}
        {/* <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>Our Menu</li>
            <li>Reservations</li>
            <li>Our Story</li>
            <li>Private Events</li>
            <li>Gift Cards</li>
            <li>Careers</li>
          </ul>
        </div> */}

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact</h3>
          <ul className="contact">
            <li>
              <MapPinIcon className="icon" />
              123 Culinary Avenue, Downtown, City 10001
            </li>
            <li>
              <PhoneIcon className="icon" />
              (555) 123-4567
            </li>
            <li>
              <EnvelopeIcon className="icon" />
              khactien9d@forkandflame.com
            </li>
          </ul>
        </div>

        {/* HOURS */}
        <div className="footer-col">
          <h3>Hours</h3>
          <ul className="hours">
            <li>
              <span>Monday - Thursday</span>
              <span>5:00 PM - 10:00 PM</span>
            </li>
            <li>
              <span>Friday - Saturday</span>
              <span>5:00 PM - 11:00 PM</span>
            </li>
            <li>
              <span>Sunday</span>
              <span>5:00 PM - 9:00 PM</span>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}