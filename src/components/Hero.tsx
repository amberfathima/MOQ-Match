import React from 'react';
import { 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingDown, 
  Lock, 
  Building2, 
  Sparkles,
  Users
} from 'lucide-react';

interface HeroProps {
  onExplorePools: () => void;
  onOpenCalculator: () => void;
  onJumpToPool402: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePools,
  onOpenCalculator,
  onJumpToPool402
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Subtle Ambient Glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[140px]"></div>
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-emerald-500/20 rounded-full blur-[130px]"></div>
        <div className="absolute -bottom-10 left-1/3 w-[600px] h-[300px] bg-slate-800/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust announcement eyebrow */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">128 Active Sourcing Pools</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">GOTS & OEKO-TEX Certified Mills</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-7 text-center sm:text-left space-y-6">
            
            {/* Primary Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] text-balance">
              Pool Demand. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                Lower MOQs.
              </span> <br />
              Cut Inventory Risk.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed text-balance">
              Combine order volumes with vetted small brands to hit manufacturer minimums without over-purchasing.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
              <button
                onClick={onExplorePools}
                className="w-full sm:w-auto px-7 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-xl shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/70 transition-all cursor-pointer flex items-center justify-center gap-2.5 group"
              >
                <span>Explore Active Pools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="w-full sm:w-auto px-7 py-4 text-base font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculate Savings</span>
              </button>
            </div>

            {/* Key Value Metric Dividers */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  42%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Avg. Tier-1 Unit Price Reduction
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                  0 Units
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Dead Stock or Excess Purchased
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-indigo-400 tabular-nums">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Milestone Escrow Protection
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Sourcing Stage Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-black/80 bg-slate-800">
              
              {/* Mill Photography */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img 
                  src="/src/assets/images/hero_textile_sourcing_1790775540727.jpg" 
                  alt="High-end sustainable textile mill with rolls of certified organic fabrics" 
                  className="w-full h-full object-cover brightness-90 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                
                {/* Mill badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-xs text-slate-200">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Apex Textile Mills (Portugal)</span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                  LIVE POOL
                </div>
              </div>

              {/* Floating Live Teaser Widget */}
              <div className="p-6 bg-slate-900/95 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                      Pool #402 In Progress
                    </span>
                    <h2 className="text-lg font-bold text-white mt-0.5">
                      200 GSM Organic Linen
                    </h2>
                    <p className="text-xs text-slate-400">French Navy Dye · GOTS Certified</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Target</span>
                    <div className="text-base font-bold font-mono text-white">1,000 units</div>
                  </div>
                </div>

                {/* Progress bar preview */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Progress</span>
                    <span className="font-mono text-emerald-400 font-bold">700 / 1,000 (70%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span className="text-amber-300 font-medium">300 units remaining</span>
                    <span>Closes in 4 days</span>
                  </div>
                </div>

                {/* Mini participant chips */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900" title="Velvet & Vine (200 units)">
                      VV
                    </div>
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900" title="Aura Athleisure (300 units)">
                      AA
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900" title="Urban Loom (200 units)">
                      UL
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 border-2 border-slate-900">
                      +1
                    </div>
                  </div>

                  <button
                    onClick={onJumpToPool402}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Full Pool #402</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

            {/* Escrow Guarantee Float Badge */}
            <div className="absolute -bottom-5 -left-4 sm:left-4 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 text-xs">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Tier-1 Escrow Protocol</p>
                <p className="text-slate-400 text-[11px]">Funds released only upon lab dip approval</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
