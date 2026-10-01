import React from 'react';
import { SecurityIncident } from '../security/deceptionSecurity';
import { 
  ShieldAlert, 
  AlertTriangle, 
  X, 
  Terminal, 
  Lock, 
  CheckCircle2, 
  Zap, 
  Server, 
  Fingerprint,
  RotateCcw
} from 'lucide-react';

interface SecurityAlertModalProps {
  incident: SecurityIncident | null;
  onClose: () => void;
}

export const SecurityAlertModal: React.FC<SecurityAlertModalProps> = ({
  incident,
  onClose
}) => {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background click */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-red-500/80 rounded-2xl shadow-2xl shadow-red-950/50 p-6 sm:p-7 z-10 overflow-hidden text-slate-100">
        
        {/* Glow corner */}
        <div 
          aria-hidden="true" 
          className="absolute -top-20 -right-20 w-44 h-44 bg-red-600/20 rounded-full blur-[70px] pointer-events-none"
        ></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close Security Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-red-800">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
              Deception Honeytrap Engaged
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1">
              ⚠️ Suspicious Scraping Activity Detected — IP Blocked
            </h3>
            <p className="text-xs text-slate-400">
              Proactive honeypot triggered by unauthorized crawler or automated script.
            </p>
          </div>
        </div>

        {/* Incident Telemetry Box */}
        <div className="my-5 bg-slate-950/90 rounded-xl border border-slate-800 p-4 space-y-2.5 font-mono text-xs">
          
          <div className="flex justify-between items-center text-slate-400">
            <span>Incident ID:</span>
            <span className="text-red-400 font-bold">{incident.id}</span>
          </div>

          <div className="flex justify-between items-start text-slate-400">
            <span className="shrink-0">Trap Probed:</span>
            <span className="text-amber-300 font-bold text-right truncate max-w-[240px]" title={incident.trapTriggered}>
              {incident.trapTriggered}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-400">
            <span>Threat Classification:</span>
            <span className="text-white font-semibold">
              {incident.threatType === 'BOT_FORM_INJECTION' && 'Automated Bot Field Injection'}
              {incident.threatType === 'SCRAPER_ENDPOINT_PROBE' && 'Web Scraper API Exfiltration'}
              {incident.threatType === 'HONEYTOKEN_ACCESS' && 'Canary Token Unauthorized Access'}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-400">
            <span>Origin IP / Network:</span>
            <span className="text-slate-300">{incident.simulatedIp}</span>
          </div>

          <div className="flex justify-between items-start text-slate-400 pt-1 border-t border-slate-800/80">
            <span className="shrink-0">Active Defense:</span>
            <span className="text-emerald-400 font-semibold text-right">
              {incident.mitigationAction}
            </span>
          </div>

          <div className="flex justify-between items-start text-slate-400">
            <span className="shrink-0">Decoy Delivered:</span>
            <span className="text-indigo-400 text-right">
              {incident.decoyPayloadSupplied}
            </span>
          </div>

        </div>

        {/* Protective Explainer */}
        <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-white">Zero Real Data Exposed</p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Proprietary fabric specs from Velvet & Vine and confidential bulk tiers from Apex Textile Mills remain completely isolated behind multi-party escrow encryption.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between gap-3 text-xs">
          <span className="text-[11px] text-slate-500 font-mono">
            Status: Isolated & Quarantined
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>

    </div>
  );
};
