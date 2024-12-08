'use client';

import '@/styles/landingpage/landingpage.css';
import { Roboto } from 'next/font/google';
import USA from '@/Images/landingpage/United States of America (US).png';
import Image from 'next/image';
import Insta from '@/Images/landingpage/Insta.png';
import LinkedIn from '@/Images/landingpage/linkedin.png';
import Gpay from '@/Images/landingpage/Gpay.png';
import Mastercard from '@/Images/landingpage/Mastercard.png';
import Paypal from '@/Images/landingpage/Paypal.png';
import Amex from '@/Images/landingpage/Amex.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// Google Font: Roboto configuration
const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

function Footer() {
    // State to manage the open accordion index
    const [accordionIndex, setAccordionIndex] = useState(-1);

    /**
     * Handles toggling the accordion for the footer links
     * @param {number} index - The index of the accordion being toggled
     */
    function handleAccordion(index) {
        setAccordionIndex(index === accordionIndex ? -1 : index);
    }

    return (
        <>
            <footer className={`landing-page-footer ${roboto.className}`}>
                {/* Sign-Up and Contact Us Section */}
                <div className="flex footer-signup-contactus-parent-container">
                    {/* Newsletter Subscription Section */}
                    <div className="sign-up-parent-container">
                        <h6 className="common-links custom-white-text mb-16">BE THE FIRST TO KNOW</h6>
                        <p className="paragraph custom-white-text mb-16">Sign up for updates from mettā muse.</p>
                        <div className="flex footer-input-btn-container">
                            <input type="text" placeholder="Enter your e-mail..." className="footer-input" />
                            <button className="subscribe-btn">SUBSCRIBE</button>
                        </div>
                    </div>

                    {/* Contact Us Section */}
                    <div>
                        <h6 className="common-links custom-white-text mb-16">CONTACT US</h6>
                        <div className="contact-us-details-container mb-24">
                            <p className="small-paragraph custom-white-text">+44 221 133 5360</p>
                            <p className="small-paragraph custom-white-text">customercare@mettamuse.com</p>
                        </div>

                        {/* Currency Selection */}
                        <h6 className="common-links custom-white-text mb-16">CURRENCY</h6>
                        <div className="flex mb-16 currency-container">
                            <Image src={USA} width={24} height={24} alt="img" />
                            <div className="rotated-square"></div>
                            <span className="currency-name common-links custom-white-text">USD</span>
                        </div>
                        <p className="small-paragraph custom-white-text mb-24 transaction-text">
                            Transactions will be completed in Euros and a currency reference is available on hover.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer-center-border"></div>

                {/* Footer Navigation Links and Payment Icons */}
                <div className="footer-bottom-links-grid-container">
                    {/* metta muse Section */}
                    <div>
                        <div className="flex justify-between items-baseline" onClick={() => handleAccordion(0)}>
                            <h6 className="common-links mb-24 custom-white-text">metta muse</h6>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                style={{ color: '#ffffff', width: '16px' }}
                                className={accordionIndex === 0 ? 'arrow-down rotate-180' : 'arrow-down'}
                            />
                        </div>
                        <div
                            className={
                                accordionIndex === 0
                                    ? 'footer-bottom-sublink-container height-visible'
                                    : 'footer-bottom-sublink-container'
                            }
                        >
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">About Us</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Artisans</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Boutiques</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Contact Us</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">EU Compliances Docs</Link>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <div className="flex justify-between items-baseline" onClick={() => handleAccordion(1)}>
                            <h6 className="common-links mb-24 custom-white-text">Quick Links</h6>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                style={{ color: '#ffffff', width: '16px' }}
                                className={accordionIndex === 1 ? 'arrow-down rotate-180' : 'arrow-down'}
                            />
                        </div>
                        <div
                            className={
                                accordionIndex === 1
                                    ? 'footer-bottom-sublink-container height-visible'
                                    : 'footer-bottom-sublink-container'
                            }
                        >
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Orders & Shipping</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Join/Login as a Seller</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Payment & Pricing</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Return & Refunds</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">FAQs</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Privacy Policy</Link>
                            <Link href="/" className="paragraph text-decoration-none custom-white-text">Terms & Conditions</Link>
                        </div>
                    </div>

                    {/* Payment Icons and Social Media */}
                    <div className="payment-icons">
                        <div className="follow-us-container">
                            <div className="flex justify-between items-baseline" onClick={() => handleAccordion(2)}>
                                <h6 className="common-links mb-24 custom-white-text">Follow Us</h6>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    style={{ color: '#ffffff', width: '16px' }}
                                    className={accordionIndex === 2 ? 'arrow-down rotate-180' : 'arrow-down'}
                                />
                            </div>
                            <div
                                className={
                                    accordionIndex === 2
                                        ? 'flex insta-linkedIn-container height-visible'
                                        : 'flex insta-linkedIn-container'
                                }
                            >
                                <Image src={Insta} alt="Insta" width={32} height={32} />
                                <Image src={LinkedIn} alt="LinkedIn" width={32} height={32} />
                            </div>
                        </div>
                        <h6 className="common-links mb-24">metta muse ACCEPTS</h6>
                        <div className="payment-images">
                            <Image src={Gpay} alt="GPay" width={56} height={35} />
                            <Image src={Mastercard} alt="Mastercard" width={56} height={35} />
                            <Image src={Paypal} alt="Paypal" width={56} height={35} />
                            <Image src={Amex} alt="Amex" width={56} height={35} />
                        </div>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="small-paragraph custom-white-text copyright-text text-center">
                    Copyright © 2023 mettamuse. All rights reserved.
                </div>
            </footer>
        </>
    );
}

export default Footer;
