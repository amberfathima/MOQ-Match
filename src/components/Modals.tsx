import React, { useState, useEffect } from 'react';
import { Pool, CurrentUser, UserRole } from '../types';
import { deceptionSecurity } from '../security/deceptionSecurity';
import { CurrencyCode, formatCurrency } from '../utils/currency';
import { 
  X, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  Mail, 
  FileText, 
  Send,
  AlertCircle,
  Sparkles,
  Factory,
  Sparkle
} from 'lucide-react';

interface ModalsProps {
  activeModal: 'auth' | 'commit' | 'swatch' | 'policy' | null;
  authMode: 'login' | 'register';
  selectedPool: Pool | null;
  policyType: 'privacy' | 'terms' | 'manufacturer' | 'contact';
  currentUser: CurrentUser;
  currency: CurrencyCode;
  interceptNotice?: string | null;
  initialRole?: UserRole;
  onClose: () => void;
  onCommitUnitsSuccess: (brandName: string, units: number) => void;
  onLoginSuccess: (user: NonNullable<CurrentUser>) => void;
  onSwitchAuthMode: (mode: 'login' | 'register') => void;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  authMode,
  selectedPool,
  policyType,
  currentUser,
  currency,
  interceptNotice,
  initialRole = 'brand',
  onClose,
  onCommitUnitsSuccess,
  onLoginSuccess,
  onSwitchAuthMode
}) => {
  // Commit state: default 150 units as specified in user request
  const [commitUnits, setCommitUnits] = useState(150);
  const [commitSuccess, setCommitSuccess] = useState(false);

  // Swatch state
  const [swatchName, setSwatchName] = useState('Elena Vance (Velvet & Vine)');
  const [swatchEmail, setSwatchEmail] = useState('elena@velvetandvine.com');
  const [swatchAddress, setSwatchAddress] = useState('42 Flinder Lane, Melbourne VIC 3000');
  const [swatchSuccess, setSwatchSuccess] = useState(false);

  // Role Tab state in Auth Modal: 'brand' vs 'manufacturer'
  const [roleTab, setRoleTab] = useState<UserRole>(initialRole);

  // Auth form inputs
  const [authEmail, setAuthEmail] = useState('elena@velvetandvine.com');
  const [authPass, setAuthPass] = useState('••••••••••••');
  const [authBrand, setAuthBrand] = useState('Velvet & Vine');
  const [authSubmitted, setAuthSubmitted] = useState(false);

  // Keep role tab in sync if initialRole changes
  useEffect(() => {
    if (initialRole) {
      setRoleTab(initialRole);
      if (initialRole === 'brand') {
        setAuthBrand('Velvet & Vine');
        setAuthEmail('elena@velvetandvine.com');
      } else {
        setAuthBrand('Apex Textile Mills');
        setAuthEmail('sourcing@apextextiles.pt');
      }
    }
  }, [initialRole, activeModal]);

  const handleRoleToggle = (newRole: UserRole) => {
    setRoleTab(newRole);
    if (newRole === 'brand') {
      setAuthBrand('Velvet & Vine');
      setAuthEmail('elena@velvetandvine.com');
    } else {
      setAuthBrand('Apex Textile Mills');
      setAuthEmail('sourcing@apextextiles.pt');
    }
  };

  // Quick Demo Fill Handlers
  const handleQuickSignInBrand = () => {
    setRoleTab('brand');
    setAuthBrand('Velvet & Vine');
    setAuthEmail('elena@velvetandvine.com');
    setAuthSubmitted(true);
    setTimeout(() => {
      setAuthSubmitted(false);
      onLoginSuccess({
        role: 'brand',
        name: 'Velvet & Vine',
        id: '#VV-84920',
        email: 'elena@velvetandvine.com',
        verified: true
      });
      onClose();
    }, 300);
  };

  const handleQuickSignInManufacturer = () => {
    setRoleTab('manufacturer');
    setAuthBrand('Apex Textile Mills');
    setAuthEmail('sourcing@apextextiles.pt');
    setAuthSubmitted(true);
    setTimeout(() => {
      setAuthSubmitted(false);
      onLoginSuccess({
        role: 'manufacturer',
        name: 'Apex Textile Mills',
        cert: 'ISO 9001',
        email: 'sourcing@apextextiles.pt',
        verified: true
      });
      onClose();
    }, 300);
  };

  // Hidden Honeypot Field State (Bot Trap)
  const [honeypotUrl, setHoneypotUrl] = useState('');

  // Contact state
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  if (!activeModal) return null;

  // Handle Commit Submit
  const handleCommitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate Honeypot Bot Trap
    if (!deceptionSecurity.validateHoneypot(honeypotUrl, 'Commit Pool Units Form')) {
      onClose();
      return;
    }

    if (commitUnits <= 0) return;

    // Use locked brand name for authenticated user
    const brandToPledge = (currentUser?.role === 'brand' ? currentUser.name : null) || 'Velvet & Vine';
    onCommitUnitsSuccess(brandToPledge, commitUnits);
    setCommitSuccess(true);

    setTimeout(() => {
      setCommitSuccess(false);
      onClose();
    }, 1200);
  };

  // Handle Swatch Submit
  const handleSwatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deceptionSecurity.validateHoneypot(honeypotUrl, 'Swatch Dispatch Form')) {
      onClose();
      return;
    }
    setSwatchSuccess(true);
    setTimeout(() => {
      setSwatchSuccess(false);
      onClose();
    }, 1500);
  };

  // Handle Auth Submit without page reload
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deceptionSecurity.validateHoneypot(honeypotUrl, 'Buyer Auth Form')) {
      onClose();
      return;
    }

    setAuthSubmitted(true);
    setTimeout(() => {
      setAuthSubmitted(false);
      if (roleTab === 'brand') {
        onLoginSuccess({
          role: 'brand',
          name: authBrand.trim() || 'Velvet & Vine',
          id: '#VV-84920',
          email: authEmail,
          verified: true
        });
      } else {
        onLoginSuccess({
          role: 'manufacturer',
          name: authBrand.trim() || 'Apex Textile Mills',
          cert: 'ISO 9001',
          email: authEmail,
          verified: true
        });
      }
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-800">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              MOQ Match Escrow Protocol
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">

          {/* ================================================================= */}
          {/* 1. COMMIT UNITS PLEDGE MODAL */}
          {/* ================================================================= */}
          {activeModal === 'commit' && selectedPool && (
            commitSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Escrow Commitment Confirmed!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  <strong>{currentUser?.name || 'Velvet & Vine'}</strong> pledged <strong>{commitUnits} units</strong> to Pool #{selectedPool.poolNumber}. The demand progress bar and active syndicate records are updated!
                </p>
              </div>
            ) : (
              <form onSubmit={handleCommitSubmit} className="space-y-5">
                {/* Hidden Honeypot Field (Bot Trap) */}
                <input 
                  type="text" 
                  name="website_url" 
                  className="hp-field" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  value={honeypotUrl} 
                  onChange={(e) => setHoneypotUrl(e.target.value)} 
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }} 
                  aria-hidden="true" 
                />
                
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
                    <Lock className="w-3 h-3" />
                    <span>Escrow Backed Commitment</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Commit Units to Pool #{selectedPool.poolNumber}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedPool.title} · {selectedPool.supplier}
                  </p>
                </div>

                {/* Pool Status snapshot */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tier-1 Wholesale Price:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {formatCurrency(selectedPool.unitPrice, currency)}/yd
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Units remaining to hit MOQ:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {Math.max(0, selectedPool.targetUnits - selectedPool.committedUnits)} units
                    </span>
                  </div>
                </div>

                {/* LOCKED AUTHENTICATED BUYER BADGE (Manual text input removed per security requirements) */}
                <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                      Authenticated Sourcing Entity
                    </span>
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{(currentUser?.role === 'brand' ? currentUser.name : null) || 'Velvet & Vine'}</span>
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold border border-emerald-300">
                    Verified Buyer {currentUser?.role === 'brand' ? currentUser.id : '#VV-84920'}
                  </span>
                </div>

                {/* Unit Quantity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Units to Commit *
                    </label>
                    <span className="text-xs font-mono font-bold text-emerald-600">
                      Estimated Cost: {formatCurrency(commitUnits * selectedPool.unitPrice, currency)}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="25"
                    max={Math.max(25, selectedPool.targetUnits - selectedPool.committedUnits)}
                    value={commitUnits}
                    onChange={(e) => setCommitUnits(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500">
                    Milestone escrow authorization holds funds until lab dip approval.
                  </p>
                </div>

                {/* Confirm CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirm Escrow Commitment ({commitUnits} units)</span>
                </button>
              </form>
            )
          )}

          {/* ================================================================= */}
          {/* 2. SWATCH REQUEST MODAL */}
          {/* ================================================================= */}
          {activeModal === 'swatch' && selectedPool && (
            swatchSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Swatch Kit Dispatched!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  A certified 10x10cm physical fabric card of <strong>{selectedPool.title}</strong> has been ordered to your address with complimentary 2-day courier.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSwatchSubmit} className="space-y-4">
                <input 
                  type="text" 
                  name="website_url" 
                  className="hp-field" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  value={honeypotUrl} 
                  onChange={(e) => setHoneypotUrl(e.target.value)} 
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }} 
                  aria-hidden="true" 
                />

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Request Physical Swatch Kit
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Free courier dispatch for Pool #{selectedPool.poolNumber} ({selectedPool.specs.composition})
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Brand & Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={swatchName}
                    onChange={(e) => setSwatchName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={swatchEmail}
                    onChange={(e) => setSwatchEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Studio / Atelier Delivery Address *</label>
                  <input
                    type="text"
                    required
                    value={swatchAddress}
                    onChange={(e) => setSwatchAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Swatch Kit (2-Day Courier)</span>
                </button>
              </form>
            )
          )}

          {/* ================================================================= */}
          {/* 3. AUTH MODAL (LOGIN / REGISTER) */}
          {/* ================================================================= */}
          {activeModal === 'auth' && (
            authSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Authentication Successful
                </h3>
                <p className="text-sm text-slate-600">
                  Welcome back, <strong>{authBrand || 'Velvet & Vine'}</strong>. Your verified session is now active.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} className="space-y-4" id="login-modal">
                <input 
                  type="text" 
                  name="website_url" 
                  className="hp-field" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  value={honeypotUrl} 
                  onChange={(e) => setHoneypotUrl(e.target.value)} 
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }} 
                  aria-hidden="true" 
                />

                {/* Intercept Notice Warning Banner */}
                {interceptNotice && (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-center gap-2.5 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-semibold">{interceptNotice}</span>
                  </div>
                )}

                {/* 1. Dual-Role Toggle Tabs (Role Toggle Tab at the top) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Select Account Role
                  </label>
                  <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleRoleToggle('brand')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        roleTab === 'brand'
                          ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Apparel Brand</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleToggle('manufacturer')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        roleTab === 'manufacturer'
                          ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Factory className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Textile Mill / Factory</span>
                    </button>
                  </div>
                </div>

                {/* Mode Switcher: Sign In vs Register New Account */}
                <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold pt-1">
                  <button
                    type="button"
                    onClick={() => onSwitchAuthMode('login')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      authMode === 'login'
                        ? (roleTab === 'brand' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-indigo-600 text-indigo-700 font-bold')
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => onSwitchAuthMode('register')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      authMode === 'register'
                        ? (roleTab === 'brand' ? 'border-emerald-600 text-emerald-700 font-bold' : 'border-indigo-600 text-indigo-700 font-bold')
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Register New Account
                  </button>
                </div>

                {/* Quick Demo-Fill Buttons for Evaluation */}
                <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Quick Demo Sign-In (Instant Evaluation)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleQuickSignInBrand}
                      className="py-2 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">Sign In as Velvet &amp; Vine (Brand)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickSignInManufacturer}
                      className="py-2 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Factory className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="truncate">Sign In as Apex Textile Mills (Manufacturer)</span>
                    </button>
                  </div>
                </div>

                {/* Form Header Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {authMode === 'login'
                      ? (roleTab === 'brand' ? 'Log in as Apparel Brand' : 'Log in to Manufacturer Portal')
                      : (roleTab === 'brand' ? 'Register New Apparel Label' : 'Register Textile Mill Partner')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {roleTab === 'brand' 
                      ? 'Access group pools, escrow allocations, and collective fabric pricing.' 
                      : 'Monetize factory downtime and manage aggregated loom schedules.'}
                  </p>
                </div>

                {/* Entity Name Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {roleTab === 'brand' ? 'Apparel Brand / Company Name *' : 'Textile Mill / Factory Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={authBrand}
                    onChange={(e) => setAuthBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Password *</label>
                  <input
                    type="password"
                    required
                    value={authPass}
                    onChange={(e) => setAuthPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className={`w-full py-3.5 text-sm font-bold text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    roleTab === 'brand'
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                >
                  <span>
                    {authMode === 'login'
                      ? (roleTab === 'brand' ? 'Sign In as Velvet & Vine (Brand)' : 'Sign In as Apex Textile Mills (Manufacturer)')
                      : (roleTab === 'brand' ? 'Create Verified Brand Account' : 'Register Mill Partner Account')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => onSwitchAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    {authMode === 'login' ? 'Need an account? Switch to registration' : 'Already registered? Switch to sign in'}
                  </button>
                </div>
              </form>
            )
          )}

          {/* ================================================================= */}
          {/* 4. POLICY / INFO MODALS */}
          {/* ================================================================= */}
          {activeModal === 'policy' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 capitalize">
                {policyType === 'privacy' && 'Escrow Privacy Policy'}
                {policyType === 'terms' && 'B2B Sourcing Terms of Service'}
                {policyType === 'manufacturer' && 'Manufacturer Onboarding'}
                {policyType === 'contact' && 'Contact Sourcing Advisory'}
              </h3>
              
              <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed max-h-80 overflow-y-auto pr-1">
                <p>
                  MOQ Match operates under institutional multi-signature escrow protocols. All financial deposits remain isolated in FDIC-insured trust accounts and are only transferred to mills upon physical pre-shipment lab-dip sign-off.
                </p>
                <p>
                  Tier-1 European and international textile mills agree to consolidated bill-of-lading terms, providing individual split-shipment manifests directly to each syndicate member label.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
