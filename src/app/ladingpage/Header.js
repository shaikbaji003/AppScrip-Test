'use client';
import '@/styles/landingpage/landingpage.css';
import Image from 'next/image';
import Icon from '@/Images/landingpage/icon.png';
import Search from '@/Images/landingpage/search-normal.png';
import Heart from '@/Images/landingpage/heart.png';
import ShoppingBag from '@/Images/landingpage/shopping-bag.png';
import Profile from '@/Images/landingpage/profile.png';
import { useEffect, useState } from 'react';
import '@/styles/Typography.css';
import { Inter } from 'next/font/google';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const roboto=Roboto({
    weight:'400',
    subsets:['latin'],
    display:'swap'
})
function Header()
{
    let[language,setLanguage]=useState('ENG');
    let[navbarshow,setNavbarShow]=useState(false);
    useEffect(()=>{
        if(navbarshow){
            document.body.style.overflow='hidden';
        }
        else{
            document.body.style.overflow='auto';
        }
    },[navbarshow])
    return (
        <>
            <header>
                <nav className="landingpage-navbar flex">
                    <div className="flex items-baseline">
                    <FontAwesomeIcon icon={faBars} style={{color: "#080808",width:'20px',height:'20px',marginRight:'8px'}} className='toggler-icon'  onClick={()=>{setNavbarShow(true)}}/>
                    <Image src={Icon} width={36} height={36} alt='logo' className='icon'/>
                    </div>
                    <h6 className={"logo-title "+inter.className}>LOGO</h6>
                    <div className='flex navbar-language-imgs-box'>
                        <Image src={Search} width={24} height={24} alt='img' className='icon'/>
                        <Image src={Heart} width={24} height={24} alt='img' className='icon'/>
                        <Image src={ShoppingBag} width={24} height={24} alt='img' className='icon'/>
                        <Image src={Profile} width={24} height={24} alt='img' className='icon profile-icon'/>
                        <div className="flex language-container">
                            <span className="language-txt">ENG</span>
                            <FontAwesomeIcon icon={faChevronDown} style={{color: "black",width:'16px',marginLeft:'8px'}}  />
                        </div>
                    </div>
                </nav>
                <div className="">
                    <div className={navbarshow?"flex navbar-link-container show":"flex navbar-link-container"}>
                        <div className="">  
                            <FontAwesomeIcon icon={faXmark} style={{color: "#080808",width:'25px',height:'25px'}} className='x-icon' onClick={()=>{setNavbarShow(false)}}/>
                        </div>
                        <Link href='/' className='common-links custom-black-text navbar-links'>SHOP</Link>
                        <Link href='/' className='common-links custom-black-text navbar-links'>SKILLS</Link>
                        <Link href='/' className='common-links custom-black-text navbar-links'>STORIES</Link>
                        <Link href='/' className='common-links custom-black-text navbar-links'>ABOUT</Link>
                        <Link href='/' className='common-links custom-black-text navbar-links'>CONTACT US</Link>

                    </div>
                </div>

                <div className={"center-title-container flex "+roboto.className}>
                    
                    <h1 className="h1-heading custom-black-text">DISCOVER OUR PRODUCTS</h1>
                    <p className="paragraph custom-black-text heading-para text-center">Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.</p>
                </div>
            </header>
        </>
    )
}

export default Header;