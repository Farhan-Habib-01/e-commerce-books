import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const MyFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-700 bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Footer Links */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          
          {/* Company */}
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h2>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Help Center
            </h2>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact-us"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/support"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h2>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/licensing"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Licensing
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-conditions"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Download */}
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Download
            </h2>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  iOS
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Android
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  Windows
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  macOS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 border-t border-gray-700 py-6 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-400">
              © {currentYear}{' '}
              <Link
                to="/"
                className="font-semibold text-white transition-colors hover:text-gray-300"
              >
                Books Store
              </Link>
              . All Rights Reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-lg p-2.5 text-gray-400 transition-all duration-200 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <BsFacebook className="h-5 w-5" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="rounded-lg p-2.5 text-gray-400 transition-all duration-200 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <BsInstagram className="h-5 w-5" />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="rounded-lg p-2.5 text-gray-400 transition-all duration-200 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <BsTwitter className="h-5 w-5" />
            </a>

            <a
              href="#"
              aria-label="GitHub"
              className="rounded-lg p-2.5 text-gray-400 transition-all duration-200 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <BsGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;