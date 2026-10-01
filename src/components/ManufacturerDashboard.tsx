import React, { useState } from 'react';
import { Pool } from '../types';
import { CurrencyCode, formatCurrency } from '../utils/currency';
import { 
  Building2, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Factory, 
  Cpu, 
  Check, 
  AlertCircle, 
  Plus, 
  FileText, 
  Truck, 
  RotateCw, 
  Recycle, 
  Sparkles,
  ChevronRight,
  LogOut,
  Sliders,
  Percent,
  Zap,
  Globe
} from 'lucide-react';

interface PooledOrder {
  id: string;
  poolId: string;
  materialSpec: string;
  totalQuantity: string;
  contributingBrands: string;
  escrowStatus: string;
  escrowAmount: string;
  deliveryDate: string;
  status: 'pending' | 'accepted' | 'in_production';
  loomAssigned?: string;
}

interface OffPeakSlot {
  id: string;
  loomType: string;
  materialSpec: string;
  discountedMoq: string;
  dateRange: string;
  discountRate: string;
}

interface ManufacturerDashboardProps {
  currency?: CurrencyCode;
  pool402?: Pool;
  onBackToLanding: () => void;
  onSwitchToBuyer: () => void;
  onLogout?: () => void;
}

export const ManufacturerDashboard: React.FC<ManufacturerDashboardProps> = ({
  currency = 'USD',
  pool402,
  onBackToLanding,
  onSwitchToBuyer,
  onLogout
}) => {
  // Loom #04 state
  const committedUnits = pool402?.committedUnits ?? 700;
  const targetUnits = pool402?.targetUnits ?? 1000;
  const unitsNeeded = Math.max(0, targetUnits - committedUnits);
  const [loom04Authorized, setLoom04Authorized] = useState<boolean>(false);

  // State for capacity utilization & downtime hours
  const [capacityUtilization, setCapacityUtilization] = useState<number>(82);
  const [downtimeHoursSaved, setDowntimeHoursSaved] = useState<number>(120);
  const [escrowHeld, setEscrowHeld] = useState<number>(45000);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Orders table state
  const [orders, setOrders] = useState<PooledOrder[]>([
    {
      id: 'po-1',
      poolId: 'Pool #402',
      materialSpec: '200 GSM Organic Linen (French Navy Dye)',
      totalQuantity: '1,000 / 1,000 Units',
      contributingBrands: 'Velvet & Vine (200), Aura Athleisure (300), Urban Loom (500)',
      escrowStatus: 'Escrow 100% Funded',
      escrowAmount: '$14,500.00',
      deliveryDate: 'Oct 15, 2026',
      status: 'pending',
      loomAssigned: 'Loom #04 (Dornier Rapier)'
    },
    {
      id: 'po-2',
      poolId: 'Pool #408',
      materialSpec: '14oz Raw Selvedge Denim (Natural Indigo)',
      totalQuantity: '1,500 / 1,500 Units',
      contributingBrands: 'Forge & Thread (500), Riveted Co. (450), Indigo Nomad (550)',
      escrowStatus: 'Escrow 100% Funded',
      escrowAmount: '$29,700.00',
      deliveryDate: 'Nov 02, 2026',
      status: 'in_production',
      loomAssigned: 'Loom #01 (Vintage Shuttle)'
    },
    {
      id: 'po-3',
      poolId: 'Pool #419',
      materialSpec: '280 GSM TENCEL French Terry (Ecru Natural)',
      totalQuantity: '1,200 / 1,200 Units',
      contributingBrands: 'Haven Loungewear (450), Maison Minimal (500), Velvet & Vine (250)',
      escrowStatus: 'Escrow 100% Funded',
      escrowAmount: '$15,360.00',
      deliveryDate: 'Nov 18, 2026',
      status: 'pending',
      loomAssigned: 'Loom #07 (Mayer Circular Knit)'
    },
    {
      id: 'po-4',
      poolId: 'Pool #425',
      materialSpec: 'YKK Natulon Recycled Fasteners (#5 Coil)',
      totalQuantity: '5,000 / 5,000 Units',
      contributingBrands: 'Alpen Outerwear (2,000), Rainwear Collective (1,500), Drift Technical (1,500)',
      escrowStatus: 'Escrow 100% Funded',
      escrowAmount: '$9,250.00',
      deliveryDate: 'Nov 24, 2026',
      status: 'pending',
      loomAssigned: 'Finishing Line #02'
    }
  ]);

  // Off-Peak Capacity Form State
  const [loomType, setLoomType] = useState('Dornier High-Speed Rapier Looms');
  const [materialSpec, setMaterialSpec] = useState('100% GOTS Certified French Flax / Linen');
  const [discountedMoq, setDiscountedMoq] = useState('800 units');
  const [startDate, setStartDate] = useState('2026-10-20');
  const [endDate, setEndDate] = useState('2026-11-05');
  const [activeOffPeakSlots, setActiveOffPeakSlots] = useState<OffPeakSlot[]>([
    {
      id: 'slot-1',
      loomType: 'Picanol OmniPlus-i Airjet Looms',
      materialSpec: '120 GSM Organic Cotton Batiste / Poplin',
      discountedMoq: '750 units (Standard: 1,500)',
      dateRange: 'Oct 24 - Nov 06',
      discountRate: '18% Off-Peak Rebate'
    }
  ]);

  // Handle Accept Purchase Order
  const handleAcceptPo = (orderId: string, poolId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'accepted'
        };
      }
      return order;
    }));

    setCapacityUtilization(prev => Math.min(96, prev + 4));
    setDowntimeHoursSaved(prev => prev + 36);
    setSuccessToast(`Purchase Order ${poolId} accepted! Apex Loom #04 allocated for bulk weaving. Escrow payout milestone 1 authorized.`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  // Handle Publish Off-Peak Production Slot
  const handlePublishSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: OffPeakSlot = {
      id: String(Date.now()),
      loomType,
      materialSpec,
      discountedMoq: `${discountedMoq} (Discounted)`,
      dateRange: `${startDate} to ${endDate}`,
      discountRate: '15% Downtime Incentive'
    };

    setActiveOffPeakSlots([newSlot, ...activeOffPeakSlots]);
    setSuccessToast(`Off-Peak Slot published! 400+ brands notified of discount MOQ window (${startDate} - ${endDate}).`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const openPoCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 border border-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{successToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  <Factory className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1">
                    Apex Textile Mills
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    Guimarães Facility · ISO 9001 & GOTS Certified
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onSwitchToBuyer}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium cursor-pointer transition-colors"
              >
                Switch to Buyer Portal (Velvet & Vine)
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-white">Apex Mill Partner</span>
                <span className="text-slate-500">·</span>
                <span className="font-mono text-emerald-400 text-[11px]">Direct Loom Access</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Banner: Factory Downtime Monetization */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 rounded-2xl border border-slate-800 p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/90 text-emerald-400 text-xs font-semibold border border-emerald-800">
                <Cpu className="w-3.5 h-3.5" />
                Factory Downtime Monetization Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">Loom Facility #PT-402</span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Manufacturer & Factory Management Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Fill off-peak machine schedules with 100% pre-funded, escrow-guaranteed pooled purchase orders from vetted boutique labels.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#off-peak-form"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Idle Loom Window</span>
            </a>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* LOOM #04 DEDICATED AGGREGATION & ESCROW CONTROL PANEL */}
        {/* ===================================================================== */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm">
                #04
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg text-white">
                    Apex Dornier High-Speed Rapier Loom #04
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    Assigned to Pool #402
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  200 GSM Organic Linen · French Navy Dye (#FN-289) · GOTS Certified
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border ${
                loom04Authorized
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                  : (unitsNeeded === 0
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                      : 'bg-amber-950/70 text-amber-300 border-amber-500/60 shadow-amber-950/30 animate-pulse')
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>
                  {loom04Authorized 
                    ? 'Loom Run Authorized (Weaving Active)' 
                    : (unitsNeeded === 0 
                        ? '100% Filled (Ready for Authorization)' 
                        : `Loom #04 Status: Pending ${unitsNeeded.toLocaleString()} units`)}
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Target MOQ</span>
              <div className="font-mono text-2xl font-bold text-white">
                {targetUnits.toLocaleString()} units
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {committedUnits.toLocaleString()} units pooled ({Math.round((committedUnits/targetUnits)*100)}%)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Escrow Locked</span>
              <div className="font-mono text-2xl font-bold text-emerald-400">
                {formatCurrency(10150, currency)}
              </div>
              <span className="text-[11px] text-emerald-400/80 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Guaranteed in FDIC Trust Account
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs text-slate-400 block font-medium">Production Action</span>
              <button
                type="button"
                onClick={() => {
                  setLoom04Authorized(true);
                  setSuccessToast("Loom #04 production run authorized! 1,000 units queued for rapier weaving at Guimarães facility.");
                  setTimeout(() => setSuccessToast(null), 5000);
                }}
                disabled={loom04Authorized}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  loom04Authorized
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{loom04Authorized ? 'Mill Run Authorized ✓' : 'Authorize Mill Run Upon 100% Fill'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 1. FACTORY OVERVIEW PANEL (4 Core Metrics) */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Metric 1: Machine Capacity Utilization (82%) */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-slate-400">Machine Capacity Utilization</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Percent className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400">
              {capacityUtilization}%
            </div>
            <p className="text-[11px] text-slate-400">
              Target: 85% · 18 of 22 rapier looms active
            </p>
          </div>

          {/* Metric 2: Open Aggregate POs (4) */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-slate-400">Open Aggregate POs</span>
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FileText className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-white">4</div>
            <p className="text-[11px] text-slate-400">
              Pools #402, #408, #419, and #425 ready
            </p>
          </div>

          {/* Metric 3: Guaranteed Escrow Funds Held ($45,000) */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-slate-400">Guaranteed Escrow Funds Held</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400">
              ${escrowHeld.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400">
              100% pre-funded in FDIC escrow trust
            </p>
          </div>

          {/* Metric 4: Downtime Hours Saved (120 hrs) */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-slate-400">Downtime Hours Saved</span>
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-amber-300">
              {downtimeHoursSaved} hrs
            </div>
            <p className="text-[11px] text-slate-400">
              Equivalent to $18,400 idle overhead recovered
            </p>
          </div>

        </div>

        {/* ===================================================================== */}
        {/* 2. PENDING POOLED ORDERS TABLE */}
        {/* ===================================================================== */}
        <section className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <h2 className="font-display font-bold text-xl text-white">
                Pending Pooled Purchase Orders
              </h2>
              <p className="text-xs text-slate-400">
                Buyer demand pools that reached 100% MOQ and funded escrow. Ready for loom queue approval.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              {openPoCount} POs Requiring Action
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Pool ID</th>
                  <th className="py-3 px-4">Material Spec</th>
                  <th className="py-3 px-4">Total Pooled Quantity</th>
                  <th className="py-3 px-4">Contributing Brands</th>
                  <th className="py-3 px-4">Escrow Status</th>
                  <th className="py-3 px-4">Target Delivery Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {orders.map((order) => {
                  const isAccepted = order.status === 'accepted';
                  const isInProd = order.status === 'in_production';

                  return (
                    <tr key={order.id} className="hover:bg-slate-900/50 transition-colors">
                      
                      {/* Pool ID */}
                      <td className="py-4 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                        {order.poolId}
                      </td>

                      {/* Material Spec */}
                      <td className="py-4 px-4">
                        <strong className="text-white block font-semibold">{order.materialSpec}</strong>
                        <span className="text-[11px] text-slate-400">{order.loomAssigned}</span>
                      </td>

                      {/* Total Pooled Quantity */}
                      <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                        {order.totalQuantity}
                      </td>

                      {/* Contributing Brands */}
                      <td className="py-4 px-4 text-slate-300 text-[11px] max-w-xs">
                        {order.contributingBrands}
                      </td>

                      {/* Escrow Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-semibold border border-emerald-800 text-[11px]">
                          <ShieldCheck className="w-3 h-3" />
                          {order.escrowStatus}
                        </span>
                        <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                          {order.escrowAmount} secured
                        </span>
                      </td>

                      {/* Target Delivery Date */}
                      <td className="py-4 px-4 font-mono text-slate-300 whitespace-nowrap">
                        {order.deliveryDate}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        {isAccepted ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-xs">
                            <Check className="w-3.5 h-3.5" />
                            PO Accepted
                          </span>
                        ) : isInProd ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-300 font-bold border border-indigo-800 text-xs">
                            <RotateCw className="w-3.5 h-3.5 animate-spin" />
                            Weaving Active
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAcceptPo(order.id, order.poolId)}
                            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
                          >
                            <span>Accept Purchase Order</span>
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2-Column Grid: Form & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================================================================== */}
          {/* 3. "LIST OFF-PEAK CAPACITY" FORM */}
          {/* ===================================================================== */}
          <section id="off-peak-form" className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-7 space-y-6 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 text-xs font-semibold mb-2 border border-indigo-800">
                <Clock className="w-3.5 h-3.5" />
                <span>Monetize Idle Loom Capacity</span>
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                List Off-Peak Production Slot
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Post upcoming idle weaving windows at a discounted MOQ to attract syndicated brand demand before loom changeovers.
              </p>
            </div>

            <form onSubmit={handlePublishSlot} className="space-y-4 text-xs">
              
              {/* Select Machinery / Loom Type */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">
                  Select Machinery / Loom Type *
                </label>
                <select
                  value={loomType}
                  onChange={(e) => setLoomType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Dornier High-Speed Rapier Looms">Dornier High-Speed Rapier Looms (Best for Fine Linen & Twills)</option>
                  <option value="Picanol OmniPlus-i Airjet Looms">Picanol OmniPlus-i Airjet Looms (High-Speed Shirting & Voile)</option>
                  <option value="Vintage Draper Shuttle Looms">Vintage Draper Shuttle Looms (Red-line Selvedge Denim)</option>
                  <option value="Mayer & Cie Electronic Jacquard Knitters">Mayer & Cie Electronic Jacquard Knitters (Jersey & Fleece)</option>
                </select>
              </div>

              {/* Available Material / Raw Input Specifications */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 block">
                  Available Material / Raw Input Specifications *
                </label>
                <input
                  type="text"
                  required
                  value={materialSpec}
                  onChange={(e) => setMaterialSpec(e.target.value)}
                  placeholder="e.g. 100% GOTS Certified French Flax / Linen or ECONYL Recycled Poly"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500">
                  Pre-stocked yarn count or raw fiber ready at Guimarães mill warehouse.
                </span>
              </div>

              {/* Discounted Minimum MOQ Threshold (e.g., 800 units instead of 1,200) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 block">
                    Discounted Minimum MOQ Threshold *
                  </label>
                  <input
                    type="text"
                    required
                    value={discountedMoq}
                    onChange={(e) => setDiscountedMoq(e.target.value)}
                    placeholder="e.g. 800 units (instead of 1,200)"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <span className="text-[11px] text-slate-500">
                    Lower entry barrier to accelerate consortium formation.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 block">
                    Discount Rate Applied
                  </label>
                  <input
                    type="text"
                    disabled
                    value="15% Off-Peak Factory Incentive"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-mono"
                  />
                  <span className="text-[11px] text-slate-500">
                    Subsidized by machine idle cost elimination.
                  </span>
                </div>
              </div>

              {/* Available Production Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 block">Production Window Start</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 block">Production Window End</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              {/* CTA Button: "Publish Off-Peak Production Slot" */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer pt-2"
              >
                <Cpu className="w-4 h-4" />
                <span>Publish Off-Peak Production Slot</span>
              </button>

            </form>

            {/* Currently Active Off-Peak Slots Feed */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Active Off-Peak Slots Open on Marketplace ({activeOffPeakSlots.length})
              </span>

              {activeOffPeakSlots.map((slot) => (
                <div key={slot.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white">{slot.loomType}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {slot.discountRate}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{slot.materialSpec}</p>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>MOQ: {slot.discountedMoq}</span>
                    <span>Window: {slot.dateRange}</span>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* ===================================================================== */}
          {/* 4. MATERIAL YIELD & WASTE REDUCTION ANALYTICS WIDGET */}
          {/* ===================================================================== */}
          <section className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-7 space-y-6 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-800">
                <Recycle className="w-3.5 h-3.5" />
                <span>Zero-Waste Production Intelligence</span>
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                Material Yield & Waste Reduction
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing scrap utilization, Pantone standardization, and carbon emission offsets across syndicated batches.
              </p>
            </div>

            {/* Visual Analytics Cards */}
            <div className="space-y-4">
              
              {/* Metric 1: Recycled Scrap Utilization */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Recycled Scrap Utilization</span>
                  <span className="font-mono font-bold text-emerald-400">91.4% Standardized</span>
                </div>
                {/* Progress bar visual */}
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91.4%' }}></div>
                </div>
                <p className="text-[11px] text-slate-400">
                  8.6% selvedge trimmings recovered & converted into composite insulation felt.
                </p>
              </div>

              {/* Metric 2: Material Standardization Rate */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Single-Dye Batch Consistency</span>
                  <span className="font-mono font-bold text-indigo-400">99.2% Color Match</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '99.2%' }}></div>
                </div>
                <p className="text-[11px] text-slate-400">
                  By dyeing 1,000 meters in a single continuous jet vessel, water consumption drops by 44%.
                </p>
              </div>

              {/* Metric 3: Carbon Offset Summary */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Consortium Sustainability Metrics</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono">Downtime Power Saved</span>
                    <p className="text-lg font-bold font-mono text-emerald-400">-34% kWh</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono">Dead Fabric Eliminated</span>
                    <p className="text-lg font-bold font-mono text-white">0 kg Waste</p>
                  </div>
                </div>
              </div>

              {/* Factory Certification Badge Strip */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  OEKO-TEX STeP Certified
                </span>
                <span className="font-mono text-slate-500">Audit #EU-PT-940</span>
              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};
