import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Download, 
  FileText, 
  Scissors, 
  Plus, 
  LogOut, 
  Building2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  DollarSign,
  Search,
  Filter,
  TrendingDown,
  TrendingUp,
  X,
  Bell,
  Sliders,
  Check,
  Percent,
  Calendar,
  Layers3,
  HelpCircle,
  Package,
  Factory,
  Globe,
  ArrowUpDown,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Pool } from '../types';
import { CurrencyCode, CURRENCIES, formatCurrency } from '../utils/currency';

interface DashboardProps {
  user: {
    email: string;
    brandName: string;
    role: string;
  };
  pools: Pool[];
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onBackToLanding: () => void;
  onLogout: () => void;
  onJoinMorePools: () => void;
  onSwitchToManufacturer?: () => void;
  onCommitUnits?: (poolId: string) => void;
  onRequestSwatch?: (pool: Pool) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: 'syndicate' | 'production' | 'escrow';
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  pools,
  currency,
  onCurrencyChange,
  onBackToLanding,
  onLogout,
  onJoinMorePools,
  onSwitchToManufacturer,
  onCommitUnits,
  onRequestSwatch
}) => {
  // Navigation & View states
  const [activeTab, setActiveTab] = useState<'pools' | 'calculator' | 'escrow'>('pools');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGsm, setSelectedGsm] = useState<'all' | 'light' | 'medium' | 'heavy'>('all');
  const [selectedFabricType, setSelectedFabricType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'highest-fill' | 'closing-soonest' | 'lowest-price'>('highest-fill');

  // Helper to extract or fallback GSM
  const getGsm = (pool: Pool): number => {
    if (pool.gsm) return pool.gsm;
    const match = pool.specs?.weight?.match(/(\d+)\s*GSM/i);
    if (match) return parseInt(match[1], 10);
    if (pool.specs?.weight?.toLowerCase().includes('14 oz')) return 475;
    return 200;
  };

  // Helper to get fabric classification
  const getFabricType = (pool: Pool): string => {
    const f = (pool.fabricType || '').toLowerCase();
    const t = (pool.title || '').toLowerCase();
    const c = (pool.specs?.composition || '').toLowerCase();

    if (f.includes('linen') || t.includes('linen') || c.includes('linen') || c.includes('flax')) return 'linen';
    if (f.includes('cotton') || t.includes('cotton') || c.includes('cotton')) return 'cotton';
    if (f.includes('denim') || t.includes('denim')) return 'denim';
    if (f.includes('silk') || t.includes('silk') || c.includes('silk')) return 'silk';
    if (f.includes('wool') || t.includes('wool') || c.includes('merino')) return 'wool';
    if (f.includes('synthetic') || f.includes('poly') || f.includes('tencel') || f.includes('bamboo') || 
        t.includes('poly') || t.includes('tencel') || t.includes('bamboo') || c.includes('spandex')) return 'synthetics';
    return 'other';
  };

  // Filter & Live Search Engine
  const filterAndSortPools = (poolList: Pool[]): Pool[] => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = poolList.filter((pool) => {
      // 1. Live Search Input: fabric title, supplier, or colorway code
      const textMatches = !query || 
        pool.title.toLowerCase().includes(query) ||
        pool.supplier.toLowerCase().includes(query) ||
        pool.supplierLocation.toLowerCase().includes(query) ||
        (pool.colorCode && pool.colorCode.toLowerCase().includes(query)) ||
        (pool.specs?.dyeMethod && pool.specs.dyeMethod.toLowerCase().includes(query)) ||
        (pool.specs?.composition && pool.specs.composition.toLowerCase().includes(query));

      // 2. GSM Dropdown: Options for "All Weights", "Light (< 150 GSM)", "Medium (150 - 250 GSM)", "Heavy (> 250 GSM)"
      const gsm = getGsm(pool);
      let gsmMatches = true;
      if (selectedGsm === 'light') {
        gsmMatches = gsm < 150;
      } else if (selectedGsm === 'medium') {
        gsmMatches = gsm >= 150 && gsm <= 250;
      } else if (selectedGsm === 'heavy') {
        gsmMatches = gsm > 250;
      }

      // 3. Fabric Type Dropdown: Options for "All Types", "Linen", "Cotton", "Denim", "Silk", "Synthetics", "Wool"
      let fabricMatches = true;
      if (selectedFabricType !== 'all') {
        const poolFabric = getFabricType(pool);
        fabricMatches = poolFabric === selectedFabricType;
      }

      return textMatches && gsmMatches && fabricMatches;
    });

    // 4. Sorting Dropdown: "Highest % Filled", "Closing Soonest", "Lowest Wholesale Price"
    return filtered.sort((a, b) => {
      if (sortBy === 'highest-fill') {
        const fillA = a.committedUnits / a.targetUnits;
        const fillB = b.committedUnits / b.targetUnits;
        return fillB - fillA;
      }
      if (sortBy === 'closing-soonest') {
        return a.daysRemaining - b.daysRemaining;
      }
      if (sortBy === 'lowest-price') {
        return a.unitPrice - b.unitPrice;
      }
      return 0;
    });
  };

  const filteredPools = filterAndSortPools(pools);

  // Claim Units state for Pool #402
  const [claimedPool402, setClaimedPool402] = useState<number>(700);
  const [hasClaimedRemaining, setHasClaimedRemaining] = useState<boolean>(false);
  const [claimToast, setClaimToast] = useState<string | null>(null);

  // 3. Interactive ROI & Cost-Saving Calculator state
  const [desiredUnits, setDesiredUnits] = useState<number>(200);
  const [smallBatchPrice, setSmallBatchPrice] = useState<number>(35);
  const [pooledBulkVolume, setPooledBulkVolume] = useState<number>(1000);
  const [bulkRate, setBulkRate] = useState<number>(15);

  // Calculations
  const standaloneCapital = pooledBulkVolume * smallBatchPrice; // forced 1000-unit standalone buy
  const pooledCapital = desiredUnits * bulkRate; // 200 units * $15 = $3,000
  const capitalSaved = Math.max(0, standaloneCapital - pooledCapital);
  const savingsPct = Math.round((capitalSaved / standaloneCapital) * 100);

  // Real-Time Notification Drawer State
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Aura Athleisure joined Pool #402 (+300 units)',
      desc: 'Vancouver athletic label pledged 300 units of 200 GSM French Navy Linen.',
      time: '12m ago',
      unread: true,
      type: 'syndicate'
    },
    {
      id: 'n2',
      title: 'Apex Textile Mills confirmed production schedule',
      desc: 'Looms #04 and #05 in Guimarães scheduled for bulk rapier weaving on Monday.',
      time: '2h ago',
      unread: true,
      type: 'production'
    },
    {
      id: 'n3',
      title: 'Milestone Escrow Hold Authorized',
      desc: 'Deposit secured in FDIC trust account pending physical lab-dip strike-off approval.',
      time: '1d ago',
      unread: false,
      type: 'escrow'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Handle Claiming Remaining Units
  const handleClaimRemaining = () => {
    if (hasClaimedRemaining) return;
    setClaimedPool402(1000);
    setHasClaimedRemaining(true);
    setClaimToast("Congratulations! Velvet & Vine claimed remaining 300 units. Pool #402 is now 100% MOQ REACHED!");
    setTimeout(() => setClaimToast(null), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Alert */}
      {claimToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 border border-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{claimToast}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 1. TOP HEADER & NAVIGATION */}
      {/* ===================================================================== */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Brand Lockup & Landing Back Link */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-md hover:bg-slate-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Landing Page</span>
              </button>

              <div className="h-5 w-px bg-slate-800"></div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1">
                    MOQ Match
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    Apparel Demand Syndicate
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Icons: Currency Switcher, Notification Drawer, User Chip, Logout */}
            <div className="flex items-center gap-3">
              
              {/* Currency Selector Dropdown (USD, EUR, GBP, INR) */}
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                  className="bg-transparent text-xs font-mono font-bold text-emerald-400 focus:outline-none cursor-pointer"
                  aria-label="Select currency"
                >
                  <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
                  <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
                  <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
                  <option value="INR" className="bg-slate-900 text-white">INR (₹)</option>
                </select>
              </div>

              {/* Notification Bell with Badge */}
              <button
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                aria-label="Open notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center font-mono">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Switch to Manufacturer Dashboard */}
              {onSwitchToManufacturer && (
                <button
                  onClick={onSwitchToManufacturer}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-medium cursor-pointer transition-colors"
                >
                  <Factory className="w-3.5 h-3.5" />
                  <span>Apex Mills Console</span>
                </button>
              )}

              {/* Brand Verified Chip */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-white">{user.brandName}</span>
                <span className="text-slate-500">·</span>
                <span className="font-mono text-emerald-400 text-[11px]">Verified Buyer</span>
              </div>

              {/* Sign Out */}
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors text-xs cursor-pointer flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. DASHBOARD BODY & OVERVIEW METRICS */}
      {/* ===================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Welcome Bar with Verification Badge */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 rounded-2xl border border-slate-800 p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-1.5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/90 text-emerald-400 text-xs font-semibold border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Boutique Label
              </span>
              <span className="text-xs text-slate-400 font-mono">Member ID: #VV-84920</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Welcome back, Velvet & Vine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Your seasonal collection demand is pooled with 2 peer brands. Milestone Escrow is holding {formatCurrency(2900, currency)} with zero open-market overstock.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => setActiveTab('calculator')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>ROI Calculator</span>
            </button>
            <button
              onClick={onJoinMorePools}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Browse All Pools</span>
            </button>
          </div>
        </div>

        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1: Active Pools */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-slate-400">Active Pools</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Layers3 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-white">2</div>
            <p className="text-[11px] text-slate-400">
              Pool #402 (Linen) & Pool #419 (TENCEL)
            </p>
          </div>

          {/* Stat 2: Total Capital Saved */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-slate-400">Total Capital Saved</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400">
              {formatCurrency(12000, currency)}
            </div>
            <p className="text-[11px] text-slate-400">
              Compared to small-batch jobber markup
            </p>
          </div>

          {/* Stat 3: Unsold Inventory Risk Reduction */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-slate-400">Unsold Inventory Risk Reduction</span>
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Percent className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-indigo-400">80%</div>
            <p className="text-[11px] text-slate-400">
              Only purchasing exact planned run (200 units)
            </p>
          </div>

          {/* Stat 4: Pending Match Status */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-slate-400">Pending Match Status</span>
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-amber-300 truncate">
              {hasClaimedRemaining ? 'Pool #402 (100% MOQ Reached)' : 'Pool #402 (70% Complete)'}
            </div>
            <p className="text-[11px] text-slate-400">
              {hasClaimedRemaining ? 'Apex Mill confirmed bulk run' : '300 units remaining · 4 days left'}
            </p>
          </div>

        </div>

        {/* Tab Controls for View Switching */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pools')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pools' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Active Pools Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'calculator' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive ROI & Cost Calculator</span>
          </button>
        </div>

        {/* ===================================================================== */}
        {/* TAB 1: ACTIVE POOLS & DEMAND MATCHING DIRECTORY */}
        {/* ===================================================================== */}
        {activeTab === 'pools' && (
          <div className="space-y-10">
            
            {/* ----------------------------------------------------------------- */}
            {/* SECTION 1: MY ACTIVE CONSORTIUMS (Velvet & Vine Commitments)      */}
            {/* ----------------------------------------------------------------- */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Velvet &amp; Vine Active Commitments</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    My Active Consortiums
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your active escrow-backed yarn allocations, mill production milestones, and syndicate co-buyers.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 bg-slate-950 border border-emerald-800/60 px-3 py-1.5 rounded-xl font-bold">
                    1 Active Demand Batch
                  </span>
                </div>
              </div>

              {/* MAIN DYNAMIC POOL CARD #402 */}
              <div className="bg-slate-950 rounded-2xl border-2 border-emerald-500/80 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-md border border-emerald-500/40">
                        Pool #402
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        92% Compatibility Match
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Color Code: #FN-289
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white pt-1">
                      200 GSM Organic Linen | French Navy Dye
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Supplier: <strong className="text-slate-200">Apex Textile Mills</strong> (ISO 9001 Certified · Guimarães, Portugal)</span>
                    </p>
                  </div>

                  <div className="lg:text-right shrink-0 bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400">Target Deadline</span>
                    <div className="text-sm font-bold font-mono text-white flex items-center lg:justify-end gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Closes in 4 Days (Oct 4)</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono">
                      {formatCurrency(14.50, currency)}/yard wholesale
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Status */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">Consortium Demand Progress:</span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {claimedPool402.toLocaleString()} / 1,000 units ({Math.round((claimedPool402 / 1000) * 100)}%)
                      </span>
                    </div>
                    <span className="text-slate-400 text-xs font-mono">
                      {hasClaimedRemaining ? '0 units left (FULL)' : '300 units remaining'}
                    </span>
                  </div>

                  <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.round((claimedPool402 / 1000) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Active Participants Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold">Your Pledge</span>
                    <p className="font-bold text-white mt-0.5">Velvet &amp; Vine</p>
                    <p className="font-mono text-emerald-400 font-semibold">
                      {hasClaimedRemaining ? '500 units' : '200 units'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Syndicate Partner</span>
                    <p className="font-bold text-white mt-0.5">Aura Athleisure</p>
                    <p className="font-mono text-slate-300">300 units</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Syndicate Partner</span>
                    <p className="font-bold text-white mt-0.5">Urban Loom</p>
                    <p className="font-mono text-slate-300">200 units</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Remaining Buffer</span>
                    <p className="font-bold text-amber-300">
                      {hasClaimedRemaining ? '0 units (Locked)' : '300 units'}
                    </p>
                    <p className="text-[10px] text-slate-500">Apex Loom #04 allocated</p>
                  </div>
                </div>

                {/* Interactive Claim / Join Waitlist Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Escrow secured by Stripe Treasury. 100% refundable if lab-dip does not match #FN-289.</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {onCommitUnits && (
                      <button
                        onClick={() => onCommitUnits('pool-402')}
                        className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4 text-emerald-400" />
                        <span>Pledge More Units</span>
                      </button>
                    )}
                    <button
                      onClick={handleClaimRemaining}
                      disabled={hasClaimedRemaining}
                      className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                        hasClaimedRemaining
                          ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/60'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {hasClaimedRemaining 
                          ? 'All 300 Units Claimed (MOQ Reached)' 
                          : 'Claim Remaining 300 Units / Lock Loom'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* SECTION 2: MARKETPLACE POOL DIRECTORY (8+ Live Demand Pools)     */}
            {/* ----------------------------------------------------------------- */}
            <div className="space-y-6 pt-4">
              
              {/* Directory Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-slate-700 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live B2B Demand Pools</span>
                    <span className="text-slate-500">·</span>
                    <span>Tier-1 Mills</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Marketplace Pool Directory
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                    Search and filter active textile demand syndicates across global mills. Join open batch runs to access wholesale rates with low capsule-size minimums.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 font-semibold">
                    {filteredPools.length} Active {filteredPools.length === 1 ? 'Pool' : 'Pools'} Found
                  </span>
                </div>
              </div>

              {/* Working Filter & Live Search Bar Engine */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xl">
                
                {/* 1. Live Search Input */}
                <div className="relative flex-grow max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search fabric title, mill, or colorway code (e.g. #FN-289)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  
                  {/* 2. GSM Filter Dropdown */}
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-300">
                    <span className="text-slate-400 font-medium">GSM:</span>
                    <select
                      id="gsm-filter"
                      value={selectedGsm}
                      onChange={(e) => setSelectedGsm(e.target.value as any)}
                      className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="all" className="bg-slate-900 text-white">All Weights</option>
                      <option value="light" className="bg-slate-900 text-white">Light (&lt; 150 GSM)</option>
                      <option value="medium" className="bg-slate-900 text-white">Medium (150 - 250 GSM)</option>
                      <option value="heavy" className="bg-slate-900 text-white">Heavy (&gt; 250 GSM)</option>
                    </select>
                  </div>

                  {/* 3. Fabric Type Filter Dropdown */}
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-300">
                    <span className="text-slate-400 font-medium">Fabric:</span>
                    <select
                      id="fabric-filter"
                      value={selectedFabricType}
                      onChange={(e) => setSelectedFabricType(e.target.value)}
                      className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="all" className="bg-slate-900 text-white">All Types</option>
                      <option value="linen" className="bg-slate-900 text-white">Linen</option>
                      <option value="cotton" className="bg-slate-900 text-white">Cotton</option>
                      <option value="denim" className="bg-slate-900 text-white">Denim</option>
                      <option value="silk" className="bg-slate-900 text-white">Silk</option>
                      <option value="synthetics" className="bg-slate-900 text-white">Synthetics</option>
                      <option value="wool" className="bg-slate-900 text-white">Wool</option>
                    </select>
                  </div>

                  {/* 4. Sorting Dropdown */}
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-300">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-400 font-medium">Sort:</span>
                    <select
                      id="sort-filter"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="highest-fill" className="bg-slate-900 text-white">Highest % Filled</option>
                      <option value="closing-soonest" className="bg-slate-900 text-white">Closing Soonest</option>
                      <option value="lowest-price" className="bg-slate-900 text-white">Lowest Wholesale Price</option>
                    </select>
                  </div>

                  {/* Reset Filters button if any active */}
                  {(searchQuery || selectedGsm !== 'all' || selectedFabricType !== 'all' || sortBy !== 'highest-fill') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedGsm('all');
                        setSelectedFabricType('all');
                        setSortBy('highest-fill');
                      }}
                      className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
                      title="Reset filters"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

              {/* Dynamic Catalog Cards / Empty State via renderPools */}
              {(() => {
                const renderPools = (filteredList: Pool[]) => {
                  if (filteredList.length === 0) {
                    return (
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                          <Search className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white">
                            No active pooling consortiums found matching your criteria.
                          </h4>
                          <p className="text-xs text-slate-400 max-w-md mx-auto">
                            Try adjusting your search query, changing the GSM weight range, or resetting fabric filters to browse the complete textile catalog.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedGsm('all');
                            setSelectedFabricType('all');
                            setSortBy('highest-fill');
                          }}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reset All Filters</span>
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredList.map((pool) => {
                        const progressPct = Math.round((pool.committedUnits / pool.targetUnits) * 100);
                        const gsmVal = getGsm(pool);
                        const unitsRemaining = Math.max(0, pool.targetUnits - pool.committedUnits);

                        return (
                          <div 
                            key={pool.id}
                            className="bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden flex flex-col justify-between group shadow-lg"
                          >
                            <div className="p-6 space-y-4">
                              {/* Header: Pool Number, Match Score, Colorway Code */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold bg-slate-900 text-emerald-400 px-2.5 py-1 rounded-md border border-slate-800">
                                    Pool #{pool.poolNumber}
                                  </span>
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                                    <Sparkles className="w-3 h-3" />
                                    {pool.matchScore || '92% Match'}
                                  </span>
                                </div>
                                <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                                  {pool.colorCode || '#FN-289'}
                                </span>
                              </div>

                              {/* Fabric Title & Mill Location */}
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                                  {pool.title}
                                </h4>
                                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1.5">
                                  <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                  <span className="truncate">{pool.supplier} · {pool.supplierLocation}</span>
                                </p>
                              </div>

                              {/* Badges: GSM, Days Remaining, Certification */}
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
                                  {gsmVal} GSM
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-300 font-mono text-[11px] flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-amber-400" />
                                  <span>{pool.daysRemaining} days left</span>
                                </span>
                                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[11px] truncate max-w-[140px]">
                                  {pool.certification}
                                </span>
                              </div>

                              {/* Real-Time Demand Progress Bar */}
                              <div className="space-y-1.5 pt-2 border-t border-slate-900">
                                <div className="flex justify-between text-xs font-medium">
                                  <span className="text-slate-400">Demand Aggregation:</span>
                                  <span className="font-mono font-bold text-emerald-400">
                                    {pool.committedUnits.toLocaleString()} / {pool.targetUnits.toLocaleString()} ({progressPct}%)
                                  </span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                                  <div 
                                    className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, progressPct)}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-500">
                                  <span>{unitsRemaining > 0 ? `${unitsRemaining.toLocaleString()} units to trigger run` : 'MOQ Reached'}</span>
                                  <span className="font-mono text-slate-400">{pool.specs?.origin || 'Audited Mill'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Card Footer: Pricing & Action Buttons */}
                            <div className="p-4 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between gap-3">
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase font-mono block">Wholesale Rate</span>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-lg font-bold font-mono text-white">
                                    {formatCurrency(pool.unitPrice, currency)}
                                  </span>
                                  <span className="text-xs text-slate-400">/yd</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {onRequestSwatch && (
                                  <button
                                    onClick={() => onRequestSwatch(pool)}
                                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                                    title="Request Swatch Fabric Sample"
                                  >
                                    <Scissors className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    if (onCommitUnits) {
                                      onCommitUnits(pool.id);
                                    }
                                  }}
                                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-950/40 transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  <span>Join Pool</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                };

                return renderPools(filteredPools);
              })()}

            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* 3. INTERACTIVE COST-SAVING & ROI CALCULATOR WIDGET */}
        {/* ===================================================================== */}
        {activeTab === 'calculator' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 space-y-8 shadow-xl">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-800">
                <Sliders className="w-3.5 h-3.5" />
                <span>Working Capital & Inventory Risk Simulator</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Velvet & Vine Capital Savings & ROI Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Simulate how pooled purchasing protects your cash flow against high manufacturer minimums.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: 4 Interactive Sliders */}
              <div className="lg:col-span-7 space-y-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                
                {/* Slider 1: Desired Order Volume (Default: 200 units) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-200">
                      1. Desired Order Volume (Capsule Size)
                    </label>
                    <span className="font-mono text-sm font-bold text-emerald-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {desiredUnits} units
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={desiredUnits}
                    onChange={(e) => setDesiredUnits(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>50 units</span>
                    <span>200 (Default)</span>
                    <span>500 units</span>
                  </div>
                </div>

                {/* Slider 2: Standalone Small-Batch Unit Price (Default: $35/unit) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-200">
                      2. Standalone Small-Batch Unit Price (Jobber/Middleman)
                    </label>
                    <span className="font-mono text-sm font-bold text-red-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {formatCurrency(smallBatchPrice, currency)} / unit
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="70"
                    step="1"
                    value={smallBatchPrice}
                    onChange={(e) => setSmallBatchPrice(Number(e.target.value))}
                    className="w-full accent-red-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>$15</span>
                    <span>$35 (Default)</span>
                    <span>$70</span>
                  </div>
                </div>

                {/* Slider 3: Pooled Bulk Volume (Default: 1,000 units) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-200">
                      3. Pooled Bulk Volume (Consortium MOQ Target)
                    </label>
                    <span className="font-mono text-sm font-bold text-indigo-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {pooledBulkVolume.toLocaleString()} units
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={pooledBulkVolume}
                    onChange={(e) => setPooledBulkVolume(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>500 units</span>
                    <span>1,000 (Default)</span>
                    <span>3,000 units</span>
                  </div>
                </div>

                {/* Slider 4: Manufacturer Bulk Rate (Default: $15/unit) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-200">
                      4. Manufacturer Direct Bulk Rate
                    </label>
                    <span className="font-mono text-sm font-bold text-emerald-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {formatCurrency(bulkRate, currency)} / unit
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="30"
                    step="1"
                    value={bulkRate}
                    onChange={(e) => setBulkRate(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>$8/unit</span>
                    <span>$15 (Default)</span>
                    <span>$30/unit</span>
                  </div>
                </div>

              </div>

              {/* Right: Real-time Output Display & Predictive Inventory Forecast */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Real-time Output Card */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                    Real-Time Financial Comparison
                  </span>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-red-950/40 border border-red-800/60">
                      <div>
                        <p className="font-bold text-red-200">Standalone Upfront Capital</p>
                        <p className="text-[11px] text-red-400">(Forced {pooledBulkVolume.toLocaleString()}-unit buy)</p>
                      </div>
                      <span className="font-mono text-base font-bold text-red-400">
                        {formatCurrency(standaloneCapital, currency)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                      <div>
                        <p className="font-bold text-emerald-200">MOQ Match Pooled Capital</p>
                        <p className="text-[11px] text-emerald-400">(Pay for exact {desiredUnits} units)</p>
                      </div>
                      <span className="font-mono text-base font-bold text-emerald-400">
                        {formatCurrency(pooledCapital, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Big Capital Saved Output */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                    <span className="text-xs text-slate-400 font-medium">Working Capital Preserved</span>
                    <div className="text-3xl font-display font-bold text-emerald-400 font-mono">
                      {formatCurrency(capitalSaved, currency)}
                    </div>
                    <span className="text-xs text-emerald-300 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {savingsPct}% Cash Flow Risk Reduction
                    </span>
                  </div>
                </div>

                {/* Velocity & Re-Order Forecast */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Inventory Velocity & Re-Order Projection</span>
                  </div>
                  <p className="text-xs text-slate-100 font-medium leading-relaxed">
                    Estimated Q3 Re-Order Need: 250 units based on historical sales velocity.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Velvet & Vine's sell-through curve indicates 200 units will exhaust by August 18. Consolidating the next French Navy Linen batch trigger by July 10 preserves continuous retail inventory.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* Real-Time Notification Panel (Slide-out Drawer) */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setNotificationsOpen(false)}
          ></div>

          {/* Slide-out Drawer */}
          <div className="relative w-full max-w-sm bg-slate-950 border-l border-slate-800 h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-sm text-white">Syndicate Alerts</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-slate-400 hover:text-emerald-400 cursor-pointer"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Alert Items List */}
              <div className="space-y-3">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${
                      item.unread
                        ? 'bg-slate-900 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-950 border-slate-800/80 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-white leading-tight">
                        {item.title}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
              Real-time WebSocket event feed · Verified by Escrow Core
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
