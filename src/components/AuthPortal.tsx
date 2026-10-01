import React, { useState } from 'react';
import { 
  Layers, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Building2, 
  Sparkles, 
  ArrowRight,
  Quote,
  Factory,
  Check,
  Loader2
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/pools';

interface AuthPortalProps {
  initialTab?: 'login' | 'register' | 'manufacturer';
  onBackToLanding: () => void;
  onSuccessLogin: (userData: { email: string; brandName: string; role: string }) => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({
  initialTab = 'register',
  onBackToLanding,
  onSuccessLogin
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'manufacturer'>(initialTab);
  
  // Show/Hide password
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Register Form State
  const [regBrandName, setRegBrandName] = useState('');
  const [regBusinessType, setRegBusinessType] = useState('Boutique Apparel');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMaterialCategory, setRegMaterialCategory] = useState(PRODUCT_CATEGORIES[0].name);
  const [regProductionVolume, setRegProductionVolume] = useState('1,000 - 5,000 units');
  const [regAgreeTerms, setRegAgreeTerms] = useState(false);

  // 2. Login Form State
  const [loginEmail, setLoginEmail] = useState('elena@velvetandvine.com');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // 3. Manufacturer Form State
  const [millName, setMillName] = useState('');
  const [millCountry, setMillCountry] = useState('Portugal');
  const [millEmail, setMillEmail] = useState('');
  const [millPassword, setMillPassword] = useState('');
  const [millCertifications, setMillCertifications] = useState('GOTS & OEKO-TEX Standard 100');
  const [millCapacity, setMillCapacity] = useState('50,000 meters/month');
  const [millAgree, setMillAgree] = useState(false);

  // Inline Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Email validator
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle Login Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!loginEmail.trim()) {
      newErrors.loginEmail = 'Work email is required.';
    } else if (!isValidEmail(loginEmail)) {
      newErrors.loginEmail = 'Please provide a valid corporate work email.';
    }

    if (!loginPassword) {
      newErrors.loginPassword = 'Password is required.';
    } else if (loginPassword.length < 6) {
      newErrors.loginPassword = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSuccessMessage('Verified Credentials. Redirecting to Dashboard...');
      
      setTimeout(() => {
        onSuccessLogin({
          email: loginEmail,
          brandName: loginEmail.includes('velvet') ? 'Velvet & Vine' : 'Boutique Label',
          role: 'brand_buyer'
        });
      }, 1200);
    }, 1000);
  };

  // Handle Brand Registration Submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!regBrandName.trim()) {
      newErrors.regBrandName = 'Business name is required.';
    }

    if (!regEmail.trim()) {
      newErrors.regEmail = 'Work email is required.';
    } else if (!isValidEmail(regEmail)) {
      newErrors.regEmail = 'Please enter a valid work email format.';
    }

    if (!regPassword) {
      newErrors.regPassword = 'Password is required.';
    } else if (regPassword.length < 8) {
      newErrors.regPassword = 'Password must be at least 8 characters with numbers/symbols.';
    }

    if (!regAgreeTerms) {
      newErrors.regAgreeTerms = 'You must agree to Escrow Terms & Verified Business Terms.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSuccessMessage(`Account created for ${regBrandName}! Redirecting to Dashboard...`);
      
      setTimeout(() => {
        onSuccessLogin({
          email: regEmail,
          brandName: regBrandName,
          role: 'brand_buyer'
        });
      }, 1200);
    }, 1200);
  };

  // Handle Manufacturer Submission
  const handleManufacturerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!millName.trim()) {
      newErrors.millName = 'Facility or Mill name is required.';
    }
    if (!millEmail.trim() || !isValidEmail(millEmail)) {
      newErrors.millEmail = 'Valid business email is required.';
    }
    if (!millAgree) {
      newErrors.millAgree = 'You must accept the Supplier Quality & Escrow Audit Agreement.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSuccessMessage(`Supplier Application submitted for ${millName}! Redirecting...`);
      
      setTimeout(() => {
        onSuccessLogin({
          email: millEmail,
          brandName: millName,
          role: 'manufacturer_partner'
        });
      }, 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row text-slate-100">
      
      {/* ========================================================================= */}
      {/* LEFT SIDE: Branding, Testimonial Quote, Security Highlights */}
      {/* ========================================================================= */}
      <div className="lg:w-1/2 relative bg-slate-950 p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
        
        {/* Background Ambient Lighting & Texture */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden"
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-[130px]"></div>
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[130px]"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-teal-600/20 rounded-full blur-[120px]"></div>
        </div>

        {/* Top Branding Section */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Landing Page</span>
            </button>

            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-full">
              Sourcing Portal v2.4
            </span>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tight text-white flex items-center gap-1.5">
                  MOQ Match
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                </span>
                <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">
                  B2B Group Sourcing Platform
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mt-4 max-w-md leading-relaxed">
              Consolidate textile purchase orders with peer fashion labels. Hit Tier-1 mill minimums, access volume pricing, and eliminate inventory dead stock.
            </p>
          </div>
        </div>

        {/* Middle: Real Founder Testimonial Card */}
        <div className="relative z-10 my-10 lg:my-0">
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl relative">
            <Quote className="w-8 h-8 text-emerald-400/50 mb-3" />
            <blockquote className="text-base sm:text-lg font-medium text-slate-200 leading-snug">
              "MOQ Match helped Velvet & Vine reduce inventory capital risk by 80%."
            </blockquote>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              We joined Pool #402 for 200 GSM French Navy Linen. Instead of being forced to buy 1,000 meters or take jobber markups, we got direct mill rates through Portuguese rapier looms.
            </p>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  VV
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Elena Vance</h4>
                  <p className="text-[11px] text-slate-400">Founder & Creative Director, Velvet & Vine</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Verified Buyer
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Platform Security Highlights */}
        <div className="relative z-10 space-y-4 pt-6 border-t border-slate-800/80">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Platform Security & Buyer Protection
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Verified Business Badges</strong>
                <span className="text-slate-400 text-[11px]">Strict KYB & credit screening on all brands.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Escrow Payment Protection</strong>
                <span className="text-slate-400 text-[11px]">Funds released only upon lab-dip sign-off.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>© {new Date().getFullYear()} MOQ Match Inc.</span>
            <span>Regulated B2B Trade Escrow</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: Interactive Form Container with Tabbed Navigation */}
      {/* ========================================================================= */}
      <div className="lg:w-1/2 bg-slate-900 p-6 sm:p-10 lg:p-14 flex flex-col justify-center relative overflow-y-auto">
        
        <div className="max-w-md w-full mx-auto space-y-6">
          
          {/* Top Form Header */}
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {activeTab === 'login' && 'Sign in to your brand portal'}
              {activeTab === 'register' && 'Register your apparel brand'}
              {activeTab === 'manufacturer' && 'Manufacturer & Mill onboarding'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {activeTab === 'login' && 'Access your active group pool pledges, escrow status, and split-ship orders.'}
              {activeTab === 'register' && 'Join 400+ vetted boutique labels pooling demand with Tier-1 certified mills.'}
              {activeTab === 'manufacturer' && 'Partner with vetted buyer syndicates. Fill off-peak loom capacity with 100% pre-funded POs.'}
            </p>
          </div>

          {/* Interactive Tabbed Navigation */}
          <div className="grid grid-cols-3 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrors({}); }}
              className={`py-2.5 px-3 rounded-lg transition-all cursor-pointer truncate ${
                activeTab === 'login'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Brand Sign In
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('register'); setErrors({}); }}
              className={`py-2.5 px-3 rounded-lg transition-all cursor-pointer truncate ${
                activeTab === 'register'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register Brand
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('manufacturer'); setErrors({}); }}
              className={`py-2.5 px-3 rounded-lg transition-all cursor-pointer truncate ${
                activeTab === 'manufacturer'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Manufacturer Portal
            </button>
          </div>

          {/* Success Banner */}
          {submitSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 1: BRAND SIGN IN */}
          {/* ===================================================================== */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Work Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Work Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="founder@yourbrand.com"
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                    errors.loginEmail ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-emerald-500'
                  }`}
                />
                {errors.loginEmail && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.loginEmail}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 pr-10 ${
                      errors.loginPassword ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-emerald-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.loginPassword && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.loginPassword}</span>
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-emerald-500 rounded bg-slate-950 border-slate-700"
                  />
                  <span>Remember this device for 30 days</span>
                </label>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating Brand...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-400">
                Don't have a verified brand account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-emerald-400 font-semibold hover:underline cursor-pointer"
                >
                  Register your brand
                </button>
              </div>

            </form>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: BRAND REGISTRATION FORM */}
          {/* ===================================================================== */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Business Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Business Name (e.g., "Velvet & Vine") <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={regBrandName}
                  onChange={(e) => setRegBrandName(e.target.value)}
                  placeholder="Your fashion label or apparel entity"
                  className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                    errors.regBrandName ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-emerald-500'
                  }`}
                />
                {errors.regBrandName && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.regBrandName}</span>
                  </p>
                )}
              </div>

              {/* Business Type Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Business Type
                </label>
                <select
                  value={regBusinessType}
                  onChange={(e) => setRegBusinessType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Boutique Apparel">Boutique Apparel</option>
                  <option value="Eco-Activewear">Eco-Activewear</option>
                  <option value="Kids Clothing">Kids Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Textile Mill / Manufacturer">Textile Mill / Manufacturer</option>
                </select>
              </div>

              {/* Work Email & Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="founder@brand.com"
                    className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                      errors.regEmail ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-emerald-500'
                    }`}
                  />
                  {errors.regEmail && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.regEmail}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                      errors.regPassword ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-emerald-500'
                    }`}
                  />
                  {errors.regPassword && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.regPassword}</p>
                  )}
                </div>
              </div>

              {/* Primary Fabric / Material Requirement (Dropdown with 10 Categories) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Primary Fabric / Material Requirement
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400">10 Material Categories</span>
                </div>
                <select
                  value={regMaterialCategory}
                  onChange={(e) => setRegMaterialCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name} ({cat.avgSavings} avg group savings)
                    </option>
                  ))}
                </select>
              </div>

              {/* Average Annual Production Volume (Units) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Average Annual Production Volume (Units)
                </label>
                <select
                  value={regProductionVolume}
                  onChange={(e) => setRegProductionVolume(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Under 1,000 units (Emerging Capsule)">Under 1,000 units (Emerging Capsule)</option>
                  <option value="1,000 - 5,000 units">1,000 - 5,000 units</option>
                  <option value="5,000 - 20,000 units">5,000 - 20,000 units</option>
                  <option value="20,000 - 50,000 units">20,000 - 50,000 units</option>
                  <option value="50,000+ units">50,000+ units (Scaling Enterprise)</option>
                </select>
              </div>

              {/* Checkbox: Agree to Escrow Terms & Verified Business Terms */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={regAgreeTerms}
                    onChange={(e) => setRegAgreeTerms(e.target.checked)}
                    className="accent-emerald-500 rounded bg-slate-950 border-slate-700 mt-0.5 shrink-0"
                  />
                  <span>
                    I agree to the <span className="text-emerald-400 underline">Escrow Terms</span> & <span className="text-emerald-400 underline">Verified Business Terms</span>. Group pool commitments are only funded upon lab dip and pre-shipment sign-off.
                  </span>
                </label>
                {errors.regAgreeTerms && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.regAgreeTerms}</span>
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering Brand Entity...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account & Start Pooling</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-1 text-center text-xs text-slate-400">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-emerald-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </div>

            </form>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: MANUFACTURER PORTAL */}
          {/* ===================================================================== */}
          {activeTab === 'manufacturer' && (
            <form onSubmit={handleManufacturerSubmit} className="space-y-4">
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <Factory className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Textile Mills & Trim Factories: We consolidate buyer orders into guaranteed, escrow-backed bulk production runs.</span>
              </div>

              {/* Mill Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Mill / Facility Legal Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={millName}
                  onChange={(e) => setMillName(e.target.value)}
                  placeholder="e.g. Apex Textile Mills S.A."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.millName && (
                  <p className="text-xs text-red-400 mt-1">{errors.millName}</p>
                )}
              </div>

              {/* Country & Capacity */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Country / Hub</label>
                  <select
                    value={millCountry}
                    onChange={(e) => setMillCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  >
                    <option value="Portugal">Portugal (Guimarães / Porto)</option>
                    <option value="Italy">Italy (Biella / Como)</option>
                    <option value="Japan">Japan (Kojima / Okayama)</option>
                    <option value="Turkey">Turkey (Izmir / Bursa)</option>
                    <option value="USA">United States (Carolinas)</option>
                    <option value="India">India (Tirupur / Gujarat)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Monthly Capacity</label>
                  <input
                    type="text"
                    value={millCapacity}
                    onChange={(e) => setMillCapacity(e.target.value)}
                    placeholder="e.g. 25,000 meters/mo"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Audited Certifications</label>
                <input
                  type="text"
                  value={millCertifications}
                  onChange={(e) => setMillCertifications(e.target.value)}
                  placeholder="GOTS, OEKO-TEX 100, Bluesign, LWG Gold"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Work Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Supplier Contact Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={millEmail}
                  onChange={(e) => setMillEmail(e.target.value)}
                  placeholder="sales@apextextiles.pt"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.millEmail && (
                  <p className="text-xs text-red-400 mt-1">{errors.millEmail}</p>
                )}
              </div>

              {/* Agree checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={millAgree}
                    onChange={(e) => setMillAgree(e.target.checked)}
                    className="accent-emerald-500 rounded bg-slate-950 border-slate-700 mt-0.5 shrink-0"
                  />
                  <span>
                    I confirm our facility meets ISO/OEKO standards and agree to lab-dip milestone verification protocols.
                  </span>
                </label>
                {errors.millAgree && (
                  <p className="text-xs text-red-400 mt-1">{errors.millAgree}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Mill Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Mill Onboarding Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
