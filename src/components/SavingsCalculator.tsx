import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  PiggyBank,
  RotateCcw
} from 'lucide-react';
import { CurrencyCode, formatCurrency, CURRENCIES } from '../utils/currency';

interface SavingsCalculatorProps {
  currency?: CurrencyCode;
  onExplorePools: () => void;
  onOpenRegister: () => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  currency = 'USD',
  onExplorePools,
  onOpenRegister
}) => {
  // Brand needs
  const [unitsNeeded, setUnitsNeeded] = useState<number>(200);
  const [millMoq, setMillMoq] = useState<number>(1000);
  const [unitCost, setUnitCost] = useState<number>(15);
  const [jobberCost, setJobberCost] = useState<number>(30);

  // Calculations
  const standaloneCapital = millMoq * unitCost;
  const moqMatchCapital = unitsNeeded * unitCost;
  const capitalSaved = Math.max(0, standaloneCapital - moqMatchCapital);
  const excessUnitsAvoided = Math.max(0, millMoq - unitsNeeded);

  // Jobber comparison: if brand bought small batch from middleman
  const jobberTotal = unitsNeeded * jobberCost;
  const markupSaved = Math.max(0, jobberTotal - moqMatchCapital);

  const curSymbol = CURRENCIES[currency]?.symbol || '$';

  const resetDefaults = () => {
    setUnitsNeeded(200);
    setMillMoq(1000);
    setUnitCost(15);
    setJobberCost(30);
  };

  return (
    <section id="savings-calculator" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive ROI & Working Capital Engine</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            Calculate How Much Working Capital MOQ Match Unlocks
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            See the exact financial difference between standing alone vs pooling demand with vetted boutique labels.
          </p>
        </div>

        {/* Calculator Interactive Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg shadow-slate-200/50">
          
          {/* Sliders Input Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Your Brand Parameters
              </span>
              <button
                onClick={resetDefaults}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset Values
              </button>
            </div>

            {/* Slider 1: Units your brand actually needs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-slate-800">
                  Units Your Collection Actually Requires
                </label>
                <span className="font-mono text-base font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {unitsNeeded.toLocaleString()} units
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={unitsNeeded}
                onChange={(e) => setUnitsNeeded(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>50 units (capsule drop)</span>
                <span>500 units</span>
                <span>1,000 units</span>
              </div>
            </div>

            {/* Slider 2: Mill Minimum Order Quantity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-slate-800">
                  Mill's Imposed Minimum Order Quantity (MOQ)
                </label>
                <span className="font-mono text-base font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg border border-red-200">
                  {millMoq.toLocaleString()} units
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={millMoq}
                onChange={(e) => setMillMoq(Number(e.target.value))}
                className="w-full accent-red-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>500 units</span>
                <span>1,500 units</span>
                <span>3,000 units (strict OEM)</span>
              </div>
            </div>

            {/* Slider 3: Tier-1 Mill Cost per Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Tier-1 Mill Direct Price ({curSymbol}/unit)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">{curSymbol}</span>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={unitCost}
                    onChange={(e) => setUnitCost(Math.max(1, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono font-semibold bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-slate-600">Raw mill bulk cost</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Middleman / Jobber Price ({curSymbol}/unit)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">{curSymbol}</span>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={jobberCost}
                    onChange={(e) => setJobberCost(Math.max(1, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono font-semibold bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-slate-600">Cost if buying small stock</span>
              </div>
            </div>

          </div>

          {/* Calculations Summary Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 space-y-6">
            
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Financial Impact Report
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Your Working Capital Protection
              </h3>
            </div>

            {/* Big Headline Stat */}
            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1">
              <span className="text-xs text-slate-400">Cash Flow Saved from Deadlock</span>
              <div className="text-3xl sm:text-4xl font-display font-bold text-emerald-400 font-mono">
                {formatCurrency(capitalSaved, currency)}
              </div>
              <p className="text-[11px] text-slate-300">
                You only spend <strong className="text-white">{formatCurrency(moqMatchCapital, currency)}</strong> instead of forcing <strong className="text-red-400">{formatCurrency(standaloneCapital, currency)}</strong>.
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Unsold Overstock Eliminated:</span>
                <span className="font-mono font-bold text-white">{excessUnitsAvoided.toLocaleString()} units</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Savings vs Jobber Small-Batch:</span>
                <span className="font-mono font-bold text-emerald-400">+{formatCurrency(markupSaved, currency)}</span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-400">Factory Tier Level:</span>
                <span className="font-bold text-indigo-300">Direct OEM Tier-1 (Apex / Cone Mills)</span>
              </div>
            </div>

            {/* Action inside calculator */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onExplorePools}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950/40"
              >
                <span>Find an Active Pool for This Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 text-xs text-slate-300 hover:text-white text-center cursor-pointer transition-colors"
              >
                Or propose your own custom pool →
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
