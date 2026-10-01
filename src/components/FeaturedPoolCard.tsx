import React, { useState } from 'react';
import { Pool, Participant, PoolPipelineStatus } from '../types';
import { CurrencyCode, formatCurrency } from '../utils/currency';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Users, 
  ArrowRight, 
  Lock, 
  AlertCircle,
  Scissors,
  Check,
  PackageCheck,
  TrendingUp,
  Share2
} from 'lucide-react';
import { DemandCoalitionCard } from './DemandCoalitionCard';

interface FeaturedPoolCardProps {
  pool: Pool;
  currency: CurrencyCode;
  onCommitUnits: (poolId: string) => void;
  onRequestSwatch: (pool: Pool) => void;
}

const PIPELINE_STAGES: PoolPipelineStatus[] = [
  'Open',
  'Matching',
  'MOQ Reached',
  'Confirmed',
  'Production'
];

export const FeaturedPoolCard: React.FC<FeaturedPoolCardProps> = ({
  pool,
  currency,
  onCommitUnits,
  onRequestSwatch
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const percentage = Math.min(100, Math.round((pool.committedUnits / pool.targetUnits) * 100));
  const remainingUnits = Math.max(0, pool.targetUnits - pool.committedUnits);

  const getStageIndex = (status: PoolPipelineStatus) => {
    return PIPELINE_STAGES.indexOf(status);
  };

  const currentStageIndex = getStageIndex(pool.pipelineStatus);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <section id="featured-pool" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background illumination */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Preview Component · Sourcing Syndicate
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Featured Active Pool Card
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Join active brand consortiums currently hitting tier-1 textile minimums in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Link Copied!' : 'Share Pool'}</span>
            </button>
          </div>
        </div>

        {/* Real-Time Demand Coalition: Pool #402 3-Column Card */}
        <DemandCoalitionCard 
          pool={pool} 
          currency={currency} 
          onJoinPool={() => onCommitUnits(pool.id)} 
          className="mb-12" 
        />

        {/* The Featured Active Pool #402 Detailed Spec Card */}
        <div className="rounded-2xl bg-slate-850/90 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden">
          
          {/* Top Bar inside Card */}
          <div className="p-6 sm:px-8 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-md border border-emerald-500/30">
                Pool #{pool.poolNumber}
              </span>
              <span className="text-slate-400 text-xs font-medium">
                Category: <strong className="text-slate-200">{pool.category}</strong>
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Supplier: <strong className="text-white font-semibold">{pool.supplier}</strong> ({pool.supplierLocation})</span>
              </div>
              <div className="hidden md:flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>{pool.certification}</span>
              </div>
            </div>
          </div>

          {/* Status Badge Pipeline Bar */}
          <div className="px-6 sm:px-8 py-5 bg-slate-900 border-b border-slate-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Status Badge Pipeline:</span>
              <span className="text-emerald-400 font-mono">Current Stage: {pool.pipelineStatus}</span>
            </div>

            {/* Pipeline Step Visualizer */}
            <div className="grid grid-cols-5 gap-2 relative">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const isUpcoming = idx > currentStageIndex;

                return (
                  <div key={stage} className="relative flex flex-col items-center">
                    
                    {/* Connecting line between stages */}
                    {idx < PIPELINE_STAGES.length - 1 && (
                      <div 
                        className={`absolute top-3.5 left-1/2 w-full h-1 -z-0 ${
                          idx < currentStageIndex 
                            ? 'bg-emerald-500' 
                            : idx === currentStageIndex 
                              ? 'bg-slate-700' 
                              : 'bg-slate-800'
                        }`}
                      ></div>
                    )}

                    {/* Step Icon Node */}
                    <div 
                      className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed 
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' 
                          : isCurrent 
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 ring-offset-2 ring-offset-slate-900 scale-110' 
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    {/* Stage Label */}
                    <span 
                      className={`mt-2 text-[11px] sm:text-xs font-medium text-center truncate w-full ${
                        isCurrent 
                          ? 'text-indigo-400 font-bold' 
                          : isPassed 
                            ? 'text-emerald-400' 
                            : 'text-slate-500'
                      }`}
                    >
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Card Content Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Fabric Image & Quick Technical Specs */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-slate-700 aspect-[4/3] group shadow-inner">
                <img 
                  src={pool.image} 
                  alt={pool.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded text-white font-medium border border-slate-700">
                    High Tactile Grade
                  </span>
                  <span className="bg-emerald-950/90 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold text-[11px] border border-emerald-800">
                    42% Under Jobber Rate
                  </span>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between pb-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Composition</span>
                  <span className="font-semibold text-slate-200 text-right">{pool.specs.composition}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Weight & Width</span>
                  <span className="font-semibold text-slate-200">{pool.specs.weight} · {pool.specs.width}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Colorway / Dye</span>
                  <span className="font-semibold text-slate-200">{pool.specs.dyeMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mill Origin</span>
                  <span className="font-semibold text-emerald-400">{pool.specs.origin}</span>
                </div>
              </div>

              {/* Quick Action links */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRequestSwatch(pool)}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Request Free Swatch</span>
                </button>
                <a
                  href="#problem-solution"
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center justify-center gap-1"
                  title="View Spec Sheet"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Specs</span>
                </a>
              </div>
            </div>

            {/* Central Info: Progress, Remaining Notice, and Active Participants */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Title & Pricing Overview */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {pool.title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-1">
                    Premium European apparel linen woven on high-tension rapier looms. Direct partnership with Apex Textile Mills.
                  </p>
                </div>

                <div className="sm:text-right shrink-0 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">Group Wholesale Price</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {formatCurrency(pool.unitPrice, currency)} <span className="text-xs font-normal text-slate-400">/ yard</span>
                  </div>
                  <div className="text-[11px] text-slate-500 line-through">
                    Standard Jobber: {formatCurrency(pool.estimatedRetailValue, currency)}/yd
                  </div>
                </div>
              </div>

              {/* Progress Bar & Unit Count */}
              <div className="space-y-2 p-5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Consortium Progress:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {pool.committedUnits.toLocaleString()} / {pool.targetUnits.toLocaleString()} Units
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-xs">
                    {percentage}% Completed
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-700 shadow-lg shadow-emerald-500/40 relative"
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  </div>
                </div>

                {/* Remaining Notice Required in Specification */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/60">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{remainingUnits} units remaining! Pool closes in {pool.daysRemaining} days.</span>
                  </div>

                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    Tier-1 Escrow Protocol Active
                  </span>
                </div>
              </div>

              {/* Active Participants List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-400" />
                    Active Participating Brands ({pool.participants.length})
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px] font-normal">
                    Verified Purchase Commitments
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {pool.participants.map((participant: Participant, pIdx: number) => (
                    <div 
                      key={pIdx} 
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg ${participant.avatarBg} text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm`}>
                          {participant.avatarInitials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate">
                            {participant.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {participant.location}
                          </p>
                        </div>
                      </div>

                      <div className="pt-1 border-t border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-400">Committed:</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {participant.units} units
                        </span>
                      </div>
                      
                      <p className="text-[10px] text-slate-500 italic">
                        {participant.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Bar */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 space-y-0.5">
                  <p className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    No obligation until full 1,000 units are locked
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Funds remain in escrow. If pool doesn't hit MOQ, you receive a 100% immediate refund.
                  </p>
                </div>

                <button
                  onClick={() => onCommitUnits(pool.id)}
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-xl shadow-lg shadow-emerald-950/60 transition-all cursor-pointer flex items-center justify-center gap-2 group shrink-0"
                >
                  <span>Commit Units to Pool #402</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
