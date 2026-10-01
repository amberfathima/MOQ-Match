import React, { useState } from 'react';
import { Pool } from '../types';
import { PRODUCT_CATEGORIES } from '../data/pools';
import { CurrencyCode, formatCurrency } from '../utils/currency';
import { 
  Search, 
  Building2, 
  Clock, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Sliders, 
  ArrowUpDown,
  Tag,
  CheckCircle2,
  Package
} from 'lucide-react';

interface PoolsDirectoryProps {
  pools: Pool[];
  selectedCategory: string | null;
  currency: CurrencyCode;
  onSelectCategory: (categoryId: string | null) => void;
  onCommitUnits: (poolId: string) => void;
  onRequestSwatch: (pool: Pool) => void;
}

export const PoolsDirectory: React.FC<PoolsDirectoryProps> = ({
  pools,
  selectedCategory,
  currency,
  onSelectCategory,
  onCommitUnits,
  onRequestSwatch
}) => {
  // Working Filter & Live Search Bar Engine states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGsm, setSelectedGsm] = useState<'all' | 'light' | 'medium' | 'heavy'>('all');
  const [selectedFabricType, setSelectedFabricType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'highest-fill' | 'closing-soonest' | 'lowest-price'>('highest-fill');

  // Helper to extract or fallback GSM
  const getGsm = (pool: Pool): number => {
    if (pool.gsm) return pool.gsm;
    const match = pool.specs.weight.match(/(\d+)\s*GSM/i);
    if (match) return parseInt(match[1], 10);
    if (pool.specs.weight.toLowerCase().includes('14 oz')) return 475;
    return 200;
  };

  // Helper to get fabric classification
  const getFabricType = (pool: Pool): string => {
    const f = (pool.fabricType || '').toLowerCase();
    const t = (pool.title || '').toLowerCase();
    const c = (pool.specs.composition || '').toLowerCase();

    if (f.includes('linen') || t.includes('linen') || c.includes('linen') || c.includes('flax')) return 'linen';
    if (f.includes('cotton') || t.includes('cotton') || c.includes('cotton')) return 'cotton';
    if (f.includes('denim') || t.includes('denim')) return 'denim';
    if (f.includes('silk') || t.includes('silk') || c.includes('silk')) return 'silk';
    if (f.includes('wool') || t.includes('wool') || c.includes('merino')) return 'wool';
    if (f.includes('synthetic') || f.includes('poly') || f.includes('tencel') || f.includes('bamboo') || 
        t.includes('poly') || t.includes('tencel') || t.includes('bamboo') || c.includes('spandex')) return 'synthetics';
    return 'other';
  };

  // 2. Working Filter & Live Search Engine
  const filterAndSortPools = (poolList: Pool[]): Pool[] => {
    const query = searchTerm.trim().toLowerCase();

    const filtered = poolList.filter((pool) => {
      // 1. Live Search Input: fabric title, supplier, or colorway code
      const textMatches = !query || 
        pool.title.toLowerCase().includes(query) ||
        pool.supplier.toLowerCase().includes(query) ||
        pool.supplierLocation.toLowerCase().includes(query) ||
        (pool.colorCode && pool.colorCode.toLowerCase().includes(query)) ||
        pool.specs.dyeMethod.toLowerCase().includes(query) ||
        pool.specs.composition.toLowerCase().includes(query);

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

      // 3. Fabric Type Dropdown: "All Types", "Linen", "Cotton", "Denim", "Silk", "Synthetics", "Wool"
      let fabricMatches = true;
      if (selectedFabricType !== 'all') {
        const poolFabric = getFabricType(pool);
        fabricMatches = poolFabric === selectedFabricType;
      }

      // 4. Quick Category match (if selected from categories horizontal bar)
      let categoryMatches = true;
      if (selectedCategory && selectedCategory !== 'all') {
        categoryMatches = pool.category.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(selectedCategory.toLowerCase()) ||
          PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.name.toLowerCase() === pool.category.toLowerCase();
      }

      return textMatches && gsmMatches && fabricMatches && categoryMatches;
    });

    // 5. Sorting Dropdown: "Highest % Filled", "Closing Soonest", "Lowest Wholesale Price"
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

  const displayedPools = filterAndSortPools(pools);

  return (
    <section id="active-pools" className="py-20 lg:py-28 bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-slate-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consolidated Raw Material Batches</span>
              <span className="text-slate-500">·</span>
              <span>Tier-1 Mills</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Active Pools Directory
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Search, filter, and surf verified B2B demand consortiums open for commitments with vetted European and global mills. Commit exact yardage yields with zero MOQ penalty.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-3.5 py-2 rounded-xl border border-emerald-800 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{displayedPools.length} Pools Available</span>
            </span>
          </div>
        </div>

        {/* 2. Working Filter & Live Search Bar Engine */}
        <div className="p-4 sm:p-5 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input: fabric title, supplier, or colorway code */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span>Search Spec / Supplier / Code</span>
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="e.g. Linen, Apex, #FN-289, Denim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* GSM Dropdown: Options for "All Weights", "Light (< 150 GSM)", "Medium (150 - 250 GSM)", "Heavy (> 250 GSM)" */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span>GSM Weight Range</span>
              </label>
              <select
                id="gsm-filter"
                value={selectedGsm}
                onChange={(e) => setSelectedGsm(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">All Weights</option>
                <option value="light">Light (&lt; 150 GSM)</option>
                <option value="medium">Medium (150 - 250 GSM)</option>
                <option value="heavy">Heavy (&gt; 250 GSM)</option>
              </select>
            </div>

            {/* Fabric Type Dropdown: "All Types", "Linen", "Cotton", "Denim", "Silk", "Synthetics", "Wool" */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>Fabric Fiber Type</span>
              </label>
              <select
                id="fabric-filter"
                value={selectedFabricType}
                onChange={(e) => setSelectedFabricType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="linen">Linen</option>
                <option value="cotton">Cotton</option>
                <option value="denim">Denim</option>
                <option value="silk">Silk</option>
                <option value="synthetics">Synthetics</option>
                <option value="wool">Wool</option>
              </select>
            </div>

            {/* Sorting Dropdown: "Highest % Filled", "Closing Soonest", "Lowest Wholesale Price" */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span>Sort Consortiums By</span>
              </label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="highest-fill">Highest % Filled</option>
                <option value="closing-soonest">Closing Soonest</option>
                <option value="lowest-price">Lowest Wholesale Price</option>
              </select>
            </div>

          </div>

          {/* Active Filter Badges / Quick Reset */}
          {(searchTerm || selectedGsm !== 'all' || selectedFabricType !== 'all' || selectedCategory) && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 font-medium">Active Filters:</span>
              {searchTerm && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono text-[11px] flex items-center gap-1">
                  Query: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-white cursor-pointer">×</button>
                </span>
              )}
              {selectedGsm !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[11px] flex items-center gap-1">
                  GSM: {selectedGsm}
                  <button onClick={() => setSelectedGsm('all')} className="hover:text-white cursor-pointer">×</button>
                </span>
              )}
              {selectedFabricType !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px] flex items-center gap-1">
                  Fabric: {selectedFabricType}
                  <button onClick={() => setSelectedFabricType('all')} className="hover:text-white cursor-pointer">×</button>
                </span>
              )}
              {selectedCategory && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono text-[11px] flex items-center gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => onSelectCategory(null)} className="hover:text-white cursor-pointer">×</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGsm('all');
                  setSelectedFabricType('all');
                  onSelectCategory(null);
                }}
                className="text-emerald-400 hover:text-emerald-300 text-[11px] font-semibold underline ml-auto cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* 3. Pool Card UI & Surfing Grid */}
        {displayedPools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPools.map((pool) => {
              const progressPct = Math.min(100, Math.round((pool.committedUnits / pool.targetUnits) * 100));
              const unitsLeft = Math.max(0, pool.targetUnits - pool.committedUnits);
              const gsm = getGsm(pool);
              const colorTag = pool.colorCode || pool.specs.dyeMethod.split(' ')[0] || 'Dyed';

              return (
                <div
                  key={pool.id}
                  className="rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden group"
                >
                  <div className="space-y-4">
                    
                    {/* Header Chips */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-500/30">
                          Pool #{pool.poolNumber}
                        </span>
                        {/* Compatibility match percentage badge */}
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                          {pool.matchScore || '92% Match'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />
                        {pool.daysRemaining}d left
                      </span>
                    </div>

                    {/* Title & Mill */}
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors leading-snug">
                        {pool.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{pool.supplier} · {pool.supplierLocation}</span>
                      </p>
                    </div>

                    {/* GSM & Color tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                        {gsm} GSM
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-indigo-300 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        <span>{colorTag}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-400 truncate max-w-[130px]">
                        {pool.category}
                      </span>
                    </div>

                    {/* Real-time Progress Bar with unit fractions and percentage */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold">
                          {pool.committedUnits.toLocaleString()} / {pool.targetUnits.toLocaleString()} units
                        </span>
                        <span className="text-slate-300 font-bold">
                          {progressPct}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                      <p className="text-[11px] text-slate-400 flex justify-between pt-0.5">
                        <span>{unitsLeft > 0 ? `${unitsLeft.toLocaleString()} units remaining` : 'MOQ 100% Reached!'}</span>
                        <span className="text-slate-500">{pool.participants.length} brands joined</span>
                      </p>
                    </div>

                    {/* Pricing Block formatted with active currency symbol */}
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Wholesale Rate</span>
                        <span className="font-mono text-base font-bold text-emerald-400">
                          {formatCurrency(pool.unitPrice, currency)}
                          <span className="text-xs text-slate-400 font-normal"> / yd</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Retail Est.</span>
                        <span className="font-mono text-xs text-red-400 line-through">
                          {formatCurrency(pool.estimatedRetailValue, currency)}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons: Join Pool & Swatch */}
                  <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => onCommitUnits(pool.id)}
                      className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-950/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Join Pool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRequestSwatch(pool)}
                      className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-800 transition-colors cursor-pointer"
                      title="Request 10x10cm Fabric Swatch"
                    >
                      Swatch
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty-state Card */
          <div className="text-center py-16 px-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-500 border border-slate-800">
              <Package className="w-6 h-6 text-slate-400" />
            </div>
            <h4 className="text-base font-bold text-white">
              No active pooling consortiums found matching your criteria.
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your GSM weight filter, clearing search keywords, or selecting "All Types" to see available fabric pools.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGsm('all');
                  setSelectedFabricType('all');
                  onSelectCategory(null);
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
