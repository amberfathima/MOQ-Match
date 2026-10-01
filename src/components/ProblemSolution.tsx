import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  TrendingDown, 
  Lock, 
  Factory, 
  PackageX, 
  ShieldCheck, 
  Users, 
  Layers, 
  Coins, 
  Sparkles,
  Truck,
  RotateCw
} from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'flow'>('comparison');

  return (
    <section id="problem-solution" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            <span>Visual Process Flow</span>
            <span className="text-slate-400">·</span>
            <span>Why Group Sourcing Wins</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            The Sourcing Dilemma: Solved with Coordinated Demand
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Traditional textile mills demand 1,000+ unit production runs. We synchronize purchase orders across vetted boutique labels so everyone unlocks wholesale pricing with zero leftover inventory.
          </p>
        </div>

        {/* Process Flow Cards (As-Is vs To-Be) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* As-Is Process Card */}
          <div className="relative rounded-2xl bg-white border-2 border-red-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-bl-xl border-l border-b border-red-200 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              As-Is Traditional Model
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
                  The Solo Brand Trap
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  High MOQ = Crushed Working Capital
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  When an independent label wants to manufacture custom French Linen or performance knits, mills turn them away or demand unmanageable batch minimums.
                </p>
              </div>

              {/* As-Is Visual Step Flow */}
              <div className="space-y-3 pt-2">
                
                {/* Step 1 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900">Standalone Brand</p>
                    <p className="text-xs text-slate-500">Only needs 200 units for seasonal collection</p>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-slate-400">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50/60 border border-red-200/70">
                  <div className="w-9 h-9 rounded-lg bg-red-200 text-red-800 flex items-center justify-center font-bold text-sm shrink-0">
                    02
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-red-950">High Manufacturer MOQ</p>
                    <p className="text-xs text-red-700">Mill imposes rigid 1,000-unit minimum requirement</p>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-slate-400">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-100/70 border border-red-300">
                  <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    03
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-red-950">Cash Flow Strain & Excess Inventory</p>
                    <p className="text-xs text-red-800 font-medium">
                      Forced to buy 800 unneeded units or buy low-quality open stock
                    </p>
                  </div>
                </div>

              </div>

              {/* Consequence Metrics */}
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs space-y-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Capital Deadlock:</span>
                  <span className="font-mono text-red-700">$18,000+ tied up for 18 months</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Dead Stock Vulnerability:</span>
                  <span className="font-medium text-red-700">80% unsold inventory liability</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Factory Leverage:</span>
                  <span className="font-medium text-red-700">Zero bargaining power</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
              <PackageX className="w-4 h-4 text-red-500" />
              <span>Result: 43% of emerging apparel brands fail due to inventory over-allocation.</span>
            </div>
          </div>

          {/* To-Be Process Card */}
          <div className="relative rounded-2xl bg-white border-2 border-emerald-500 p-6 sm:p-8 shadow-xl shadow-emerald-950/5 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
              To-Be MOQ Match Model
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">
                  Consolidated Buyer Syndication
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  Demand Aggregation = Zero Over-Purchasing
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Three independent brands combine orders on the same raw fabric specification. The mill receives a single consolidated purchase order.
                </p>
              </div>

              {/* To-Be Visual Step Flow with Exact Participant Math */}
              <div className="space-y-3 pt-2">
                
                {/* Step 1: Exact Participant Pool Breakdown */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      3 Vetted Brands Pool Demand
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Exact 1,000 Units
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="font-semibold text-slate-800 truncate">Velvet & Vine</p>
                      <p className="font-mono text-emerald-700 font-bold">200 units</p>
                    </div>

                    <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200">
                      <p className="font-semibold text-slate-800 truncate">Aura Athleisure</p>
                      <p className="font-mono text-indigo-700 font-bold">300 units</p>
                    </div>

                    <div className="p-2 rounded-lg bg-teal-50 border border-teal-200">
                      <p className="font-semibold text-slate-800 truncate">Urban Loom</p>
                      <p className="font-mono text-teal-700 font-bold">500 units</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-emerald-600 font-bold text-sm">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Step 2: Escrow Protection */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/80 border border-indigo-200">
                  <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-indigo-950">Escrow Secured Contract</p>
                    <p className="text-xs text-indigo-800">
                      Funds deposited into neutral escrow; released to mill upon lab-dip approval
                    </p>
                  </div>
                </div>

                <div className="flex justify-center -my-1 text-emerald-600 font-bold text-sm">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Step 3: Consolidated Production */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-300">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <Factory className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-emerald-950">Consolidated Production & Split-Ship</p>
                    <p className="text-xs text-emerald-800 font-medium">
                      Apex Textile Mills runs bulk order; split-shipped directly to each label
                    </p>
                  </div>
                </div>

              </div>

              {/* Unlocked Outcome Benefits */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 text-xs space-y-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Cash Flow Freed Up:</span>
                  <span className="font-mono text-emerald-700 font-bold">Only pay for your exact 200 units</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Leftover Inventory:</span>
                  <span className="font-bold text-emerald-700">0 units excess dead stock</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Tier-1 Pricing:</span>
                  <span className="font-bold text-emerald-700">Bulk mill rate ($14.50/m vs $28.00 jobber)</span>
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Result: High-margin luxury fabrics accessible from day one with zero warehouse bloat.</span>
            </div>
          </div>

        </div>

        {/* Comparison Table for Quick Executive Understanding */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider font-display">
              Feature-by-Feature Benchmark
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              MOQ Match Standard vs Traditional Sourcing
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-6">Criteria</th>
                  <th className="py-3 px-6 text-red-700">Standalone Sourcing</th>
                  <th className="py-3 px-6 text-emerald-700 bg-emerald-50/80">MOQ Match Group Pool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">Minimum Order Size</td>
                  <td className="py-3.5 px-6 text-red-600 font-mono">1,000 - 3,000 units</td>
                  <td className="py-3.5 px-6 font-mono text-emerald-700 font-semibold bg-emerald-50/50">100 - 300 units</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">Payment Security</td>
                  <td className="py-3.5 px-6">Unsecured wire transfer direct to mill</td>
                  <td className="py-3.5 px-6 text-emerald-700 font-semibold bg-emerald-50/50">Neutral Escrow with milestone release</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">Quality & Lab Dips</td>
                  <td className="py-3.5 px-6">Small buyers get bottom-tier attention</td>
                  <td className="py-3.5 px-6 text-emerald-700 font-semibold bg-emerald-50/50">Full Tier-1 lab dip approvals & swatch kit</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">Delivery Logistics</td>
                  <td className="py-3.5 px-6">Brand coordinates full container freight</td>
                  <td className="py-3.5 px-6 text-emerald-700 font-semibold bg-emerald-50/50">Consolidated freight with individual split-ship</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
