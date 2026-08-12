"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelStar } from './PixelIcons';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Showreel', href: '/showreel' },
  { name: 'Bio', href: '/bio' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Services', href: '/services' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll to add background blur/shadow when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop & Mobile Header Bar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-2 z-50 relative outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded">
            <PixelStar className="w-6 h-6 text-pink-400 group-hover:rotate-180 transition-transform duration-500" color="currentColor" />
            <span className="font-[family-name:var(--font-pixel)] text-lg text-slate-100 tracking-wider">
              NANO<span className="text-pink-400">NC4</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`relative font-mono text-sm uppercase tracking-widest transition-colors outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded px-2 py-1 ${
                    isActive ? 'text-pink-400' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-400"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Mobile Toggle */}
          <div className="flex items-center gap-4 z-50 relative">
            
            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 -mr-2 outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#f472b6" } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current block transition-colors"
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-4/5 h-0.5 bg-current block"
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: -8, width: "100%", backgroundColor: "#f472b6" } : { rotate: 0, y: 0, width: "100%" }}
                  className="h-0.5 bg-current block transition-colors"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { delay: 0.2, duration: 0.2 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl lg:hidden pt-24 pb-10 px-6 flex flex-col justify-between h-screen overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mt-10">
              {links.map((link, i) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block font-[family-name:var(--font-pixel)] text-3xl tracking-widest uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg p-2 ${
                        isActive ? 'text-pink-400 translate-x-4' : 'text-slate-400 hover:text-slate-100'
                      }`}
                      style={{ transition: 'all 0.3s ease' }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 text-center font-mono text-xs text-slate-600 uppercase tracking-widest"
            >
              Nanonc4 © {new Date().getFullYear()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
