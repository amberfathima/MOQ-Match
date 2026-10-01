import React, { useState } from 'react';
import { Pool } from '../types';
import { CurrencyCode, formatCurrency } from '../utils/currency';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  TrendingDown, 
  Sparkles, 
  Zap, 
  Check, 
  Layers,
  ArrowRightLeft,
  Building2,
  Lock,
  RotateCcw
} from 'lucide-react';

interface DemandCoalitionCardProps {
  pool?: Pool;
  currency?: CurrencyCode;
  onJoinPool?: () => void;
  className?: string;
}

export const DemandCoalitionCard: React.FC<DemandCoalitionCardProps> = ({ 
  pool,
  currency = 'USD',
  onJoinPool,
  className = ''
}) => {
  // Read dynamic values if pool passed, otherwise defaults
  const committedUnits = pool?.committedUnits ?? 700;
  const targetUnits = pool?.targetUnits ?? 1000;
  const remainingUnits = Math.max(0, targetUnits - committedUnits);
  const reachedPct = Math.min(100, Math.round((committedUnits / targetUnits) * 100));

  const [simulateFull, setSimulateFull] = useState(false);

  const displayCommitted = simulateFull ? targetUnits : committedUnits;
  const displayRemaining = simulateFull ? 0 : remainingUnits;
  const displayPct = simulateFull ? 100 : reachedPct;

  // Velvet & Vine units: find from pool participants if present
  const vvParticipant = pool?.participants.find(p => p.name.toLowerCase().includes('velvet'));
  const vvUnits = vvParticipant ? vvParticipant.units : (simulateFull ? 500 : 200);

  // Financial calculations
  const standalonePrice = 35;
  const bulkPrice = 15;
  const vvSavings = vvUnits * (standalonePrice - bulkPrice);

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      
      {/* Outer Card Container (#131C2E with subtle borders and glowing accents) */}
      <div className="relative rounded-2xl bg-[#131C2E] border border-slate-800 shadow-2xl shadow-black/80 overflow-hidden text-slate-100 p-6 sm:p-8 backdrop-blur-md">
        
        {/* Subtle Ambient Glow inside Card */}
        <div 
          aria-hidden="true" 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"
        ></div>

        {/* =================================================================== */}
        {/* 1. CARD HEADER */}
        {/* =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80 relative z-10">
          
          {/* Left Title: ● REAL-TIME DEMAND COALITION: POOL #402 */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-200 uppercase">
              REAL-TIME DEMAND COALITION: <span className="text-emerald-400">POOL #402</span>
            </h3>
          </div>

          {/* Right Badge: Dynamic % REACHED */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full shadow-sm shadow-emerald-950/50 flex items-center gap-1.5 transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{displayPct}% REACHED ({displayCommitted.toLocaleString()} / {targetUnits.toLocaleString()} UNITS)</span>
            </span>
          </div>

        </div>

        {/* =================================================================== */}
        {/* 2. THREE-COLUMN MAIN ROW */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-stretch relative z-10">
          
          {/* ----------------------------------------------------------------- */}
          {/* LEFT COLUMN: CO-BUYERS POOLING VOLUME */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                CO-BUYERS POOLING VOLUME
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {pool?.participants.length || 3} Verified
              </span>
            </div>

            <div className="space-y-2.5">
              
              {/* Item 1: Highlighted Active User (Velvet & Vine) */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 shadow-md shadow-emerald-950/20 relative overflow-hidden transition-all">
                <div className="flex items-center justify-between">
                  
                  <div className="flex items-center gap-3">
                    {/* Avatar Badge: "VV" (Teal/Green circle) */}
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-bold text-xs shrink-0 shadow-inner">
                      VV
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs sm:text-sm">
                          Velvet & Vine
                        </span>
                        {/* "YOU" tag */}
                        <span className="text-[9px] font-mono font-extrabold bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded font-bold uppercase">
                          YOU
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block">
                        Boutique Linen Label
                      </span>
                    </div>
                  </div>

                  {/* Right Status */}
                  <div className="text-right">
                    <span className="font-mono font-bold text-white text-xs sm:text-sm block">
                      {vvUnits} units
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      Confirmed
                    </span>
                  </div>

                </div>
              </div>

              {/* Item 2: Aura Athleisure */}
              <div className="p-3.5 rounded-xl bg-[#182238]/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between">
                  
                  <div className="flex items-center gap-3">
                    {/* Avatar Badge: "AA" (Dark Indigo circle) */}
                    <div className="w-9 h-9 rounded-full bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
                      AA
                    </div>
                    <div>
                      <span className="font-bold text-slate-200 text-xs sm:text-sm block">
                        Aura Athleisure
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Co-Buyer
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-300 text-xs sm:text-sm">
                      300 units
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Pledged
                    </span>
                  </div>

                </div>
              </div>

              {/* Item 3: Urban Loom */}
              <div className="p-3.5 rounded-xl bg-[#182238]/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between">
                  
                  <div className="flex items-center gap-3">
                    {/* Avatar Badge: "UL" (Gold/Brown circle) */}
                    <div className="w-9 h-9 rounded-full bg-amber-900/30 border border-amber-600/30 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0">
                      UL
                    </div>
                    <div>
                      <span className="font-bold text-slate-200 text-xs sm:text-sm block">
                        Urban Loom
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Co-Buyer
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-300 text-xs sm:text-sm">
                      200 units
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Pledged
                    </span>
                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* ----------------------------------------------------------------- */}
          {/* MIDDLE COLUMN: CENTRAL MOQ MATCH ENGINE NODE */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            
            <div className="relative rounded-2xl bg-[#182238] border border-slate-700/80 p-6 sm:p-7 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 backdrop-blur-md">
              
              {/* Connector Lines Indicator (Desktop Subtle Flow) */}
              <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-px bg-indigo-500/50"></div>
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-px bg-indigo-500/50"></div>

              {/* Center Icon: Purple circular node with converging arrow icon */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white relative z-10">
                  <ArrowRightLeft className="w-6 h-6 text-white stroke-[2.5]" />
                </div>
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping opacity-50 pointer-events-none"></div>
              </div>

              {/* Node Title & Subtitle */}
              <div className="space-y-1">
                <h4 className="font-display font-bold text-lg text-white tracking-tight">
                  MOQ Match Engine
                </h4>
                <p className="text-xs font-mono font-bold text-indigo-300">
                  {displayCommitted.toLocaleString()} Units Grouped
                </p>
                <p className="text-[11px] text-slate-400">
                  Automated Demand Consolidation
                </p>
              </div>

              {/* Highlighted Amber Callout Pill */}
              <button
                onClick={onJoinPool ? onJoinPool : () => setSimulateFull(!simulateFull)}
                className={`w-full py-2.5 px-3 rounded-full text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                  displayRemaining === 0
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 border-amber-500/60 shadow-amber-950/30 animate-pulse'
                }`}
                title={onJoinPool ? "Click to commit escrow funds to pool" : "Click to simulate full loom batch"}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {displayRemaining === 0 
                    ? 'Loom Batch Triggered (100% Full)' 
                    : `${displayRemaining.toLocaleString()} units needed to trigger loom batch`}
                </span>
              </button>

              {/* Action Button: Claim Remaining Units */}
              {onJoinPool && (
                <button
                  onClick={onJoinPool}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Claim Remaining {displayRemaining.toLocaleString()} Units</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}

            </div>

          </div>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT COLUMN: MANUFACTURER TIER SUMMARY CARD */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                MANUFACTURER TIER
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <Building2 className="w-3 h-3" /> Tier-1 Mill
              </span>
            </div>

            <div className="rounded-xl bg-[#182238]/90 border border-slate-800 p-4 space-y-3.5">
              
              <div>
                <h4 className="font-display font-bold text-base text-white">
                  Apex Textile Mills
                </h4>
                <p className="text-xs text-slate-400">
                  Porto, Portugal • ISO 9001
                </p>
              </div>

              {/* Data Table / Grid */}
              <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800/80 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Target MOQ:</span>
                  <span className="font-mono font-bold text-white">1,000 units</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Bulk Price:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {formatCurrency(bulkPrice, currency)} / unit
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Standalone Price:</span>
                  <span className="font-mono font-semibold text-red-400 line-through text-xs">
                    {formatCurrency(standalonePrice, currency)} / unit
                  </span>
                </div>
              </div>

              {/* Bottom Highlight Box: Emerald green checkmark badge */}
              <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center gap-2 shadow-sm">
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="truncate">
                  Velvet & Vine saves {formatCurrency(vvSavings, currency)} on {vvUnits} units
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* 3. BOTTOM STATISTICS METRICS STRIP (4-COLUMN STAT BAR) */}
        {/* =================================================================== */}
        <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left relative z-10">
          
          {/* Stat 1: $1.8M+ | Aggregated Volume */}
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-0.5">
            <div className="font-display text-xl sm:text-2xl font-bold font-mono text-white">
              {formatCurrency(1800000, currency)}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Aggregated Volume
            </div>
          </div>

          {/* Stat 2: 57.1% (Green) | Average Cost Reduction */}
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-0.5">
            <div className="font-display text-xl sm:text-2xl font-bold font-mono text-emerald-400">
              57.1%
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Average Cost Reduction
            </div>
          </div>

          {/* Stat 3: 94.6% | MOQ Threshold Hit Rate */}
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-0.5">
            <div className="font-display text-xl sm:text-2xl font-bold font-mono text-white">
              94.6%
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              MOQ Threshold Hit Rate
            </div>
          </div>

          {/* Stat 4: 100% (Purple) | Escrow Payment Protection */}
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-0.5">
            <div className="font-display text-xl sm:text-2xl font-bold font-mono text-indigo-400">
              100%
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Escrow Payment Protection
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
