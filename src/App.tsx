/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { FeaturedPoolCard } from './components/FeaturedPoolCard';
import { SavingsCalculator } from './components/SavingsCalculator';
import { PoolsDirectory } from './components/PoolsDirectory';
import { TrustAndEscrow } from './components/TrustAndEscrow';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';
import { Dashboard } from './components/Dashboard';
import { ManufacturerDashboard } from './components/ManufacturerDashboard';
import { SocSecurityWidget } from './components/SocSecurityWidget';
import { SecurityAlertModal } from './components/SecurityAlertModal';
import { deceptionSecurity, SecurityIncident } from './security/deceptionSecurity';
import { INITIAL_POOLS, PRODUCT_CATEGORIES } from './data/pools';
import { Pool, CurrentUser, UserRole } from './types';
import { CurrencyCode } from './utils/currency';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [pools, setPools] = useState<Pool[]>(INITIAL_POOLS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 1. Dual-Role Authentication & Global Session State
  // Default: null (unauthenticated public visitor)
  // When Brand: { role: 'brand', name: 'Velvet & Vine', id: '#VV-84920', verified: true }
  // When Mill: { role: 'manufacturer', name: 'Apex Textile Mills', cert: 'ISO 9001', verified: true }
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

  // 2. Global Currency Exchange Switcher (USD, EUR, GBP, INR)
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');

  // Intercept notice for unauthenticated pledge attempts
  const [interceptNotice, setInterceptNotice] = useState<string | null>(null);
  const [authInitialRole, setAuthInitialRole] = useState<UserRole>('brand');

  // Cybersecurity Deception Layer State
  const [securityIncident, setSecurityIncident] = useState<SecurityIncident | null>(null);

  useEffect(() => {
    const unsub = deceptionSecurity.subscribeAlert((incident) => {
      setSecurityIncident(incident);
    });
    return unsub;
  }, []);

  // Modal states
  const [activeModal, setActiveModal] = useState<'auth' | 'commit' | 'swatch' | 'policy' | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [modalPool, setModalPool] = useState<Pool | null>(null);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'manufacturer' | 'contact'>('privacy');

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Pool #402 accessor
  const pool402 = pools.find(p => p.id === 'pool-402') || pools[0];

  // Actions
  const handleOpenAuth = (mode: 'login' | 'register' | 'manufacturer') => {
    setInterceptNotice(null);
    if (mode === 'manufacturer') {
      setAuthInitialRole('manufacturer');
      setAuthMode('login');
    } else {
      setAuthInitialRole('brand');
      setAuthMode(mode);
    }
    setActiveModal('auth');
  };

  // Mandatory Route Guard: Check authentication before opening pledge escrow modal
  const handleOpenCommit = (poolId: string) => {
    if (!currentUser) {
      // 1. Intercept action & set notice
      setInterceptNotice("Please sign in as a Brand to commit units.");
      setAuthInitialRole('brand');
      setAuthMode('login');
      // 2. Display security toast notification
      showToast("Please sign in as a Brand to commit units.");
      // 3. Automatically open the #login-modal popup
      setActiveModal('auth');
      return;
    }

    if (currentUser.role !== 'brand') {
      showToast("You are signed in as a Textile Mill. Please switch to an Apparel Brand account to commit escrow units.");
      return;
    }

    const targetPool = pools.find(p => p.id === poolId) || pool402;
    setModalPool(targetPool);
    setActiveModal('commit');
  };

  const handleOpenSwatch = (pool: Pool) => {
    setModalPool(pool);
    setActiveModal('swatch');
  };

  const handleOpenPolicy = (type: 'privacy' | 'terms' | 'manufacturer' | 'contact') => {
    if (type === 'manufacturer') {
      handleOpenAuth('manufacturer');
      return;
    }
    setPolicyType(type);
    setActiveModal('policy');
  };

  // Login handler
  const handleLoginSuccess = (user: NonNullable<CurrentUser>) => {
    setCurrentUser(user);
    setInterceptNotice(null);
    if (user.role === 'brand') {
      showToast(`Signed in: Welcome back, ${user.name} (Verified Buyer).`);
    } else {
      showToast(`Signed in: Welcome, ${user.name} (Mill Admin).`);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    showToast("Signed out successfully. Public sourcing marketplace active.");
  };

  // 4. Dynamic Escrow Pledge Execution (Pool #402)
  const handleCommitUnitsSuccess = (brandName: string, units: number) => {
    const target = modalPool || pool402;
    if (!target) return;

    // 1. Close modal cleanly without reload or redirect
    setActiveModal(null);

    setPools(prevPools => 
      prevPools.map(pool => {
        if (pool.id === target.id) {
          // 2. Dynamically increment total progress from e.g. 700 to 850 / 1,000 units (70% -> 85%)
          const newCommitted = Math.min(pool.targetUnits, pool.committedUnits + units);
          const reached = newCommitted >= pool.targetUnits;
          
          // Check if Velvet & Vine already exists in participants
          const existingParticipantIndex = pool.participants.findIndex(
            p => p.name.toLowerCase().includes('velvet') || p.name.toLowerCase() === brandName.toLowerCase()
          );

          let updatedParticipants = [...pool.participants];
          if (existingParticipantIndex >= 0) {
            // Update existing Velvet & Vine pledge units
            const existing = updatedParticipants[existingParticipantIndex];
            updatedParticipants[existingParticipantIndex] = {
              ...existing,
              units: existing.units + units,
              timestamp: 'Just now (Escrow Confirmed)'
            };
          } else {
            // Add Velvet & Vine's updated commitment card to the Active Participating Brands row
            updatedParticipants.unshift({
              name: brandName,
              units: units,
              location: 'Melbourne, AU',
              avatarInitials: 'VV',
              avatarBg: 'bg-emerald-600',
              timestamp: 'Just now (Escrow Confirmed)'
            });
          }

          return {
            ...pool,
            committedUnits: newCommitted,
            pipelineStatus: reached ? 'MOQ Reached' : pool.pipelineStatus,
            participants: updatedParticipants
          };
        }
        return pool;
      })
    );

    showToast(`Escrow commitment confirmed: ${brandName} pledged ${units} units to Pool #${target.poolNumber}.`);
  };

  const handleCategorySelect = (catId: string | null) => {
    setSelectedCategory(catId);
    setTimeout(() => {
      const elem = document.getElementById('active-pools');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleJumpToPool402 = () => {
    setTimeout(() => {
      const elem = document.getElementById('featured-pool');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleJumpToCalculator = () => {
    setTimeout(() => {
      const elem = document.getElementById('savings-calculator');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleJumpToPools = () => {
    setTimeout(() => {
      const elem = document.getElementById('active-pools');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl border border-emerald-500/80 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Primary Application Navigation Bar */}
      <Navbar 
        currentUser={currentUser}
        onLogout={handleLogout}
        currency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenAuth={handleOpenAuth}
        onSelectCategory={handleCategorySelect}
        onOpenCalculator={handleJumpToCalculator}
        onExplorePools={handleJumpToPools}
      />

      {/* ===================================================================== */}
      {/* 2. VIEW SWITCHING / DOM ROUTING ENGINE */}
      {/* ===================================================================== */}

      {/* CONTAINER 1: #view-public (Public Landing Page, Category Filters, Pool #402 Preview) */}
      <div id="view-public" className={currentUser === null ? "block" : "hidden"}>
        <main className="flex-grow">
          {/* SOC Security Widget */}
          <div className="bg-slate-900 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
              <SocSecurityWidget />
            </div>
          </div>

          {/* Hero Section */}
          <Hero 
            onExplorePools={handleJumpToPools}
            onOpenCalculator={handleJumpToCalculator}
            onJumpToPool402={handleJumpToPool402}
          />

          {/* Problem vs. Solution */}
          <ProblemSolution />

          {/* Featured Active Pool Card (Live Demand Coalition Card) */}
          <FeaturedPoolCard 
            pool={pool402}
            currency={currentCurrency}
            onCommitUnits={handleOpenCommit}
            onRequestSwatch={handleOpenSwatch}
          />

          {/* Interactive Savings Calculator */}
          <SavingsCalculator 
            currency={currentCurrency}
            onExplorePools={handleJumpToPools}
            onOpenRegister={() => handleOpenAuth('register')}
          />

          {/* Active Pools Directory with Category & GSM Filters */}
          <PoolsDirectory 
            pools={pools}
            selectedCategory={selectedCategory}
            currency={currentCurrency}
            onSelectCategory={setSelectedCategory}
            onCommitUnits={handleOpenCommit}
            onRequestSwatch={handleOpenSwatch}
          />

          {/* Trust, Escrow & Audited Mills */}
          <TrustAndEscrow />
        </main>

        {/* Footer */}
        <Footer 
          onOpenPolicy={handleOpenPolicy}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* CONTAINER 2: #view-brand-dashboard (Authenticated Velvet & Vine Portal) */}
      <div id="view-brand-dashboard" className={currentUser?.role === 'brand' ? "block" : "hidden"}>
        <Dashboard
          user={{
            email: currentUser?.email || 'elena@velvetandvine.com',
            brandName: currentUser?.name || 'Velvet & Vine',
            role: 'brand_buyer'
          }}
          pools={pools}
          currency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
          onBackToLanding={handleLogout}
          onLogout={handleLogout}
          onJoinMorePools={handleJumpToPools}
          onCommitUnits={handleOpenCommit}
          onRequestSwatch={handleOpenSwatch}
          onSwitchToManufacturer={() => {
            setCurrentUser({
              role: 'manufacturer',
              name: 'Apex Textile Mills',
              cert: 'ISO 9001',
              email: 'sourcing@apextextiles.pt',
              verified: true
            });
            showToast("Switched to Apex Textile Mills (Mill Admin) Console.");
          }}
        />
      </div>

      {/* CONTAINER 3: #view-factory-console (Authenticated Apex Textile Mills Portal) */}
      <div id="view-factory-console" className={currentUser?.role === 'manufacturer' ? "block" : "hidden"}>
        <ManufacturerDashboard
          currency={currentCurrency}
          pool402={pool402}
          onBackToLanding={handleLogout}
          onLogout={handleLogout}
          onSwitchToBuyer={() => {
            setCurrentUser({
              role: 'brand',
              name: 'Velvet & Vine',
              id: '#VV-84920',
              email: 'elena@velvetandvine.com',
              verified: true
            });
            showToast("Switched to Velvet & Vine (Brand Buyer) Dashboard.");
          }}
        />
      </div>

      {/* Interactive Dual-Role Modals */}
      <Modals 
        activeModal={activeModal}
        authMode={authMode}
        selectedPool={modalPool}
        policyType={policyType}
        currentUser={currentUser}
        currency={currentCurrency}
        interceptNotice={interceptNotice}
        initialRole={authInitialRole}
        onClose={() => {
          setActiveModal(null);
          setInterceptNotice(null);
        }}
        onCommitUnitsSuccess={handleCommitUnitsSuccess}
        onLoginSuccess={handleLoginSuccess}
        onSwitchAuthMode={(mode) => setAuthMode(mode)}
      />

      {/* Cybersecurity Deception Incident Modal */}
      <SecurityAlertModal 
        incident={securityIncident} 
        onClose={() => setSecurityIncident(null)} 
      />

    </div>
  );
}
