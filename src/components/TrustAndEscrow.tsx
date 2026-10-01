import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Factory, 
  CheckCircle2, 
  Truck, 
  FileCheck2, 
  BadgePercent, 
  Quote, 
  Building2 
} from 'lucide-react';

export const TrustAndEscrow: React.FC = () => {
  return (
    <section id="escrow-security" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-semibold uppercase tracking-wider border border-indigo-200">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Institutional Escrow Architecture</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight text-balance">
            Zero-Risk Sourcing: Protected by Milestone Escrow
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Your production capital is never wired directly to overseas mills until quality standards are 100% physically verified and approved.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              1. Verified Aggregation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every joining brand is vetted for business legitimacy and solvency before committing to a pool. No ghost buyers or broken contracts.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              2. Tier-1 Mill Matching
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We exclusively contract with audited mills in Portugal, Italy, Japan, Turkey, and the US carrying GOTS and OEKO-TEX credentials.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              3. Milestone Escrow
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Funds sit in regulated FDIC-insured escrow. 30% released upon physical lab dip sign-off, 70% released after pre-shipment SGS inspection.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              4. Split-Ship Logistics
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bulk production is palletized and customs cleared as one shipment, then automatically split-delivered directly to each brand's door.
            </p>
          </div>

        </div>

        {/* Real Brand Testimonials */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              Founder Case Studies
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              How Small Brands Scale with Group Sourcing
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4">
              <Quote className="w-8 h-8 text-emerald-400 opacity-60" />
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "As an independent resort-wear label, Portuguese linen mills wouldn't return our emails for less than 1,500 meters. With MOQ Match Pool #402, we locked down 200 meters of the exact French Navy Linen at $14.50/m. We saved $16,000 in upfront cash."
              </p>
              <div className="pt-2 border-t border-slate-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                  VV
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Elena Vance</h4>
                  <p className="text-[11px] text-slate-400">Founder, Velvet & Vine (Melbourne)</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4">
              <Quote className="w-8 h-8 text-indigo-400 opacity-60" />
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "Our technical running shorts needed Italian ECONYL tricot, but middleman distributors charged $26/yd for leftover lots. Pooling demand with two other athletic labels let us buy direct from Aquafil at $11.20/yd. The escrow milestone system made our CFO feel completely protected."
              </p>
              <div className="pt-2 border-t border-slate-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  AA
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Marcus Sterling</h4>
                  <p className="text-[11px] text-slate-400">Head of Product, Aura Athleisure (Vancouver)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Mill Trust Badges Bar */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Audited Compliance Standards:</span>
            <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> GOTS Organic 5.0</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> OEKO-TEX Standard 100</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Bluesign Certified</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> LWG Gold Tannery Rated</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
