import React, { useState, useRef, useEffect } from 'react';
import { PRODUCT_CATEGORIES } from '../data/pools';
import { CurrencyCode, CURRENCIES } from '../utils/currency';
import { CurrentUser } from '../types';
import { 
  ChevronDown, 
  Layers, 
  ArrowRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Globe, 
  LogOut, 
  User,
  Factory
} from 'lucide-react';

interface NavbarProps {
  currentUser: CurrentUser;
  onLogout: () => void;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onOpenAuth: (mode: 'login' | 'register' | 'manufacturer') => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenCalculator: () => void;
  onExplorePools: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout,
  currency,
  onCurrencyChange,
  onOpenAuth,
  onSelectCategory,
  onOpenCalculator,
  onExplorePools
}) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Sub-badge */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                  MOQ Match
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </span>
                <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                  B2B Group Sourcing Platform
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links & Dropdown */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {/* 10 Product Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                  categoriesOpen ? 'text-white bg-slate-800' : 'text-slate-300 hover:text-white'
                }`}
                aria-expanded={categoriesOpen}
              >
                <span>Product Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown Menu for 10 Product Categories */}
              {categoriesOpen && (
                <div className="absolute top-full left-0 w-[540px] mt-2 p-4 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 grid grid-cols-2 gap-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                  <div className="col-span-2 pb-2 mb-1 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono uppercase font-bold tracking-wider text-emerald-400">10 Core Sourcing Categories</span>
                    <span>Consolidated Mill MOQs</span>
                  </div>
                  
                  {PRODUCT_CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors text-left group cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-800 group-hover:bg-emerald-500/20 text-[11px] font-mono font-bold text-slate-400 group-hover:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                            {cat.name}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 ml-1">
                            {cat.avgSavings}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a 
              href="#problem-solution" 
              className="text-slate-300 hover:text-white transition-colors py-2"
            >
              How It Works
            </a>
            
            <a 
              href="#featured-pool" 
              className="text-slate-300 hover:text-white transition-colors py-2 flex items-center gap-1.5"
            >
              <span>Active Pools</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </a>

            <button 
              onClick={onOpenCalculator}
              className="text-slate-300 hover:text-white transition-colors py-2 cursor-pointer flex items-center gap-1"
            >
              Savings Calculator
            </button>

            <a 
              href="#escrow-security" 
              className="text-slate-300 hover:text-white transition-colors py-2"
            >
              Escrow Protection
            </a>
          </nav>

          {/* Right Action Icons: Global Currency Switcher + User Profile / Auth State */}
          <div className="flex items-center gap-3">
            
            {/* Global Currency Exchange Switcher (USD / EUR / GBP / INR) */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-transparent text-xs font-mono font-bold text-emerald-400 focus:outline-none cursor-pointer"
                aria-label="Select global currency"
              >
                <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
                <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
                <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
                <option value="INR" className="bg-slate-900 text-white">INR (₹)</option>
              </select>
            </div>

            {/* If Authenticated: Display Role Badge [Log Out] */}
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                {currentUser.role === 'brand' ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-bold text-white">{currentUser.name}</span>
                    <span className="text-emerald-400 font-mono text-[11px]">(Verified Buyer)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/70 border border-indigo-500/40 text-xs">
                    <Factory className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-bold text-white">{currentUser.name}</span>
                    <span className="text-indigo-300 font-mono text-[11px]">(Mill Admin)</span>
                  </div>
                )}

                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-red-400 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/60 cursor-pointer flex items-center gap-1"
                  title="Sign out of current session"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              /* If Unauthenticated: Log In & Get Started */
              <div className="hidden sm:flex items-center gap-2.5">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer border border-slate-700/60"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-lg shadow-md shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all cursor-pointer flex items-center gap-1.5 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}

            {/* Mobile menu hamburger button */}
            <div className="lg:hidden flex items-center gap-2">
              {!currentUser && (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="sm:hidden px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 rounded-md"
                >
                  Log In
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col gap-2 text-sm">
            <a 
              href="#problem-solution" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              How It Works
            </a>
            <a 
              href="#featured-pool" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Active Pools (Pool #402)
            </a>
            <button 
              onClick={() => { onOpenCalculator(); setMobileMenuOpen(false); }}
              className="px-3 py-2 text-left text-slate-200 hover:bg-slate-800 rounded-lg"
            >
              Savings Calculator
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
