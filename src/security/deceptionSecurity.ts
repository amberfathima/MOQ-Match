/**
 * MOQ MATCH CYBERSECURITY CORE
 * Deception-Based Security Layer: Honeypots, Honeytokens & Bot Traps
 */

export interface SecurityIncident {
  id: string;
  threatType: 'BOT_FORM_INJECTION' | 'SCRAPER_ENDPOINT_PROBE' | 'HONEYTOKEN_ACCESS' | 'CREDENTIAL_STUFFING';
  trapTriggered: string;
  timestamp: string;
  simulatedIp: string;
  userAgent: string;
  mitigationAction: string;
  decoyPayloadSupplied: string;
}

export interface SocMetrics {
  systemStatus: string;
  activeBreaches: number;
  scrapersIsolated: number;
  encryptionStatus: string;
  honeytokensActive: number;
}

class DeceptionSecurityManager {
  private static instance: DeceptionSecurityManager;
  private incidents: SecurityIncident[] = [];
  private scrapersIsolatedCount: number = 2;
  private listeners: ((incident: SecurityIncident | null) => void)[] = [];
  private metricsListeners: ((metrics: SocMetrics) => void)[] = [];

  private constructor() {
    // Initial mock historical incidents
    this.incidents = [
      {
        id: 'SEC-1092',
        threatType: 'SCRAPER_ENDPOINT_PROBE',
        threatTitle: 'Automated Competitor Pricing Scraper',
        trapTriggered: '/api/v1/admin/export-all-supplier-pricing',
        timestamp: 'Today at 04:12 AM',
        simulatedIp: '198.51.100.44 (Frankfurt Datacenter ASN)',
        userAgent: 'Python-requests/2.31.0 [Headless Crawler]',
        mitigationAction: 'Rate-Limited & Quarantined to Sandbox Honeycomb',
        decoyPayloadSupplied: 'Synthetic Jobber Pricing Table (Markup +140%)'
      } as any
    ];
  }

  public static getInstance(): DeceptionSecurityManager {
    if (!DeceptionSecurityManager.instance) {
      DeceptionSecurityManager.instance = new DeceptionSecurityManager();
    }
    return DeceptionSecurityManager.instance;
  }

  public getMetrics(): SocMetrics {
    return {
      systemStatus: 'Protected by Active Honeytokens',
      activeBreaches: 0,
      scrapersIsolated: this.scrapersIsolatedCount,
      encryptionStatus: '100% Encrypted & Monitored',
      honeytokensActive: 14
    };
  }

  public getIncidents(): SecurityIncident[] {
    return [...this.incidents];
  }

  public subscribeAlert(listener: (incident: SecurityIncident | null) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public subscribeMetrics(listener: (metrics: SocMetrics) => void): () => void {
    this.metricsListeners.push(listener);
    return () => {
      this.metricsListeners = this.metricsListeners.filter(l => l !== listener);
    };
  }

  private notifyAlert(incident: SecurityIncident) {
    this.listeners.forEach(l => l(incident));
  }

  private notifyMetrics() {
    const metrics = this.getMetrics();
    this.metricsListeners.forEach(l => l(metrics));
  }

  /**
   * 1. Validate Form Honeypot:
   * Returns true if request is legitimate (honeypot empty).
   * Returns false if bot filled the hidden honeypot field.
   */
  public validateHoneypot(honeypotValue: string, formName: string = 'Form Submission'): boolean {
    if (honeypotValue && honeypotValue.trim().length > 0) {
      this.scrapersIsolatedCount += 1;

      const incident: SecurityIncident = {
        id: `SEC-${Math.floor(1000 + Math.random() * 9000)}`,
        threatType: 'BOT_FORM_INJECTION',
        trapTriggered: `Hidden Honeypot Field [website_url] on ${formName}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        simulatedIp: '203.0.113.89 (Tor Exit Relay Node)',
        userAgent: navigator.userAgent || 'Automated Form Filling Spider',
        mitigationAction: 'Immediate Silent Rejection (HTTP 403 Forbidden)',
        decoyPayloadSupplied: 'Synthetic Captcha Token Injected & Blacklisted'
      };

      this.incidents.unshift(incident);
      this.notifyAlert(incident);
      this.notifyMetrics();
      return false; // Trapped!
    }
    return true; // Clean human input
  }

  /**
   * 2. Trigger Fake API Route Trap:
   * Called when a crawler or user queries /api/v1/admin/export-all-supplier-pricing
   */
  public triggerFakeApiTrap(endpoint: string = '/api/v1/admin/export-all-supplier-pricing'): SecurityIncident {
    this.scrapersIsolatedCount += 1;

    const incident: SecurityIncident = {
      id: `SEC-${Math.floor(1000 + Math.random() * 9000)}`,
      threatType: 'SCRAPER_ENDPOINT_PROBE',
      trapTriggered: endpoint,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      simulatedIp: '198.51.100.127 (Commercial Scraper Proxy Cloud)',
      userAgent: 'Mozilla/5.0 (compatible; Scrapy/2.11; +http://scrapy.org)',
      mitigationAction: 'IP Address Isolated & Session Quarantined',
      decoyPayloadSupplied: 'Disinformation Mill Catalog with +120% Price Skew'
    };

    this.incidents.unshift(incident);
    this.notifyAlert(incident);
    this.notifyMetrics();
    return incident;
  }
}

export const deceptionSecurity = DeceptionSecurityManager.getInstance();
