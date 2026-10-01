import React, { useState, useEffect } from 'react';
import { deceptionSecurity, SocMetrics } from '../security/deceptionSecurity';
import { 
  ShieldCheck, 
  Lock, 
  Terminal, 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Bug, 
  Zap, 
  Activity,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface SocSecurityWidgetProps {
  onSimulateScraper?: () => void;
  onSimulateFormBot?: () => void;
  className?: string;
}

export const SocSecurityWidget: React.FC<SocSecurityWidgetProps> = ({
  onSimulateScraper,
  onSimulateFormBot,
  className = ''
}) => {
  const [metrics, setMetrics] = useState<SocMetrics>(deceptionSecurity.getMetrics());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = deceptionSecurity.subscribeMetrics((newMetrics) => {
      setMetrics(newMetrics);
    });
    return unsubscribe;
  }, []);

  const handleSimulateApi = () => {
    deceptionSecurity.triggerFakeApiTrap('/api/v1/admin/export-all-supplier-pricing');
  };

  const handleSimulateBot = () => {
    deceptionSecurity.validateHoneypot('http://malicious-spam-crawler.bot', 'Buyer Registration Form');
  };

  return (
    <div className={`relative ${className}`}>
      
      {/* Sleek SOC Security Status Widget Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-lg shadow-black/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Status: Protected by Active Honeytokens (Green Indicator) */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <span className="font-semibold text-slate-200 block sm:inline">
              System Status:
            </span>{' '}
            <span className="text-emerald-400 font-mono font-bold">
              {metrics.systemStatus}
            </span>
          </div>
        </div>

        {/* Center: Threat Detection Status: "0 Active Breaches | X Scrapers Isolated" */}
        <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
          <span className="hidden md:inline text-slate-500">·</span>
          <span>Threat Status:</span>
          <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {metrics.activeBreaches} Active Breaches | {metrics.scrapersIsolated} Scrapers Isolated
          </span>
        </div>

        {/* Right: Escrow & Data Privacy Status: "100% Encrypted & Monitored" */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-1.5 text-indigo-400 font-medium text-[11px]">
            <Lock className="w-3.5 h-3.5" />
            <span>Escrow & Data Privacy: <strong className="text-white font-mono">{metrics.encryptionStatus}</strong></span>
          </div>

          {/* Interactive Simulation / Expand Drawer Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg px-2.5 py-1 transition-colors cursor-pointer"
            title="Inspect Deception Defense Diagnostics"
          >
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>SOC Lab</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

      </div>

      {/* Expandable Deception Lab / Honeypot Testing Panel */}
      {expanded && (
        <div className="mt-2 p-4 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl text-xs space-y-3 animate-in fade-in-50 duration-150">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              Proactive Honeypot & Honeytoken Diagnostics
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              14 Canary Tokens Active
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            MOQ Match deploys hidden honeypot form inputs and invisible scraper bait routes across the DOM. When malicious automation touches them, their IP is immediately sandboxed with synthetic pricing decoys.
          </p>

          {/* Interactive Honeypot Simulator Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleSimulateApi}
              className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900/90 text-red-300 border border-red-800/80 font-mono text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Bug className="w-3.5 h-3.5 text-red-400" />
              <span>Probe Fake API Route (/api/v1/admin/export-all-supplier-pricing)</span>
            </button>

            <button
              onClick={handleSimulateBot}
              className="px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900/90 text-amber-300 border border-amber-800/80 font-mono text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Trigger Form Honeypot [website_url]</span>
            </button>
          </div>

        </div>
      )}

      {/* Hidden Unlinked Scraper Trap Anchor in the DOM (Feature 2) */}
      <a 
        href="/api/v1/admin/export-all-supplier-pricing" 
        onClick={(e) => {
          e.preventDefault();
          deceptionSecurity.triggerFakeApiTrap('/api/v1/admin/export-all-supplier-pricing');
        }}
        tabIndex={-1}
        aria-hidden="true"
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: '-9999px',
          height: 0,
          width: 0,
          zIndex: -1,
          pointerEvents: 'none'
        }}
        rel="nofollow"
      >
        Admin Supplier Raw Pricing Export Endpoint
      </a>

    </div>
  );
};
