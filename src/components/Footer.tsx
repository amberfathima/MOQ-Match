import React from 'react';
import { Layers, ArrowRight, ShieldCheck, Mail, Globe, MapPin } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/pools';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms' | 'manufacturer' | 'contact') => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicy,
  onSelectCategory
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white tracking-tight">
                  MOQ Match
                </span>
                <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
                  B2B Group Sourcing Platform
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Empowering independent and emerging apparel brands to pool demand, hit Tier-1 mill minimums, and eliminate excess inventory liability through neutral milestone escrow.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                FDIC-Insured Escrow
              </span>
              <span>·</span>
              <span>Audited Global Mills</span>
            </div>
          </div>

          {/* Sourcing Categories Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Key Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {PRODUCT_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Hardware & Trims
            </h4>
            <ul className="space-y-2 text-xs">
              {PRODUCT_CATEGORIES.slice(5, 10).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal, Manufacturer Onboarding & Contact Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('manufacturer')}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Manufacturer Onboarding</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Contact Sourcing Desk
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MOQ Match Inc. All rights reserved. B2B Group Sourcing Platform.</p>
          <div className="flex items-center gap-6">
            <span>Escrow facilitated via Stripe Treasury & Regulated Trust Partners.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
