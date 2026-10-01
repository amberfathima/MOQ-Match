# MOQ Match — B2B Apparel Demand Aggregation Platform

> **A decentralized B2B demand syndicate solving Minimum Order Quantity (MOQ) friction for boutique labels through escrow-backed collective purchasing.**

---

## 📌 Executive Summary

Independent fashion brands and boutique labels routinely face prohibitive Minimum Order Quantities (MOQs)—often 1,000+ meters/yards per colorway—imposed by primary textile mills. This forces smaller labels into one of two damaging compromises:
1. Purchasing low-volume deadstock from middlemen/jobbers at 30%–60% markups.
2. Committing to excessive run volumes that lead to overproduction, tied-up working capital, and landfill deadstock.

**MOQ Match** provides an asset-light demand aggregation infrastructure. By clustering pre-season production orders across non-competing apparel labels into single mill production runs, the platform secures Tier-1 factory pricing while eliminating counterparty default risk through milestone-governed escrow protocols.

---

## 🚀 Key Functional Modules

### 1. Dynamic Demand Aggregation Engine
- **Live Consortium Tracking:** Real-time demand progress bars tracking pool unit thresholds (e.g., Pool #402: 700 / 1,000 units filled).
- **Automated Production Triggers:** Production batches lock and dispatch automatically once 100% capacity is reached.
- **Pledge Allocation:** Dynamic calculation of remaining buffer allocations and individual brand commitments.

### 2. FinTech Escrow Infrastructure (Milestone-Governed)
- **Zero Upfront Transfer to Mills:** Brand pledge capital is held in a Tier-1 secure escrow environment (simulating Stripe Treasury).
- **Quality & Lab-Dip Protection:** Pledges remain 100% refundable if the mill's initial physical lab-dip does not match target technical specifications (e.g., Color Code #FN-289).
- **Automated Milestone Release:** Escrow funds release to the manufacturer only after capacity lock and verified pre-production sign-off.

### 3. Multi-Currency Global Commerce Engine
- Native real-time currency conversion supporting:
  - **USD ($)**
  - **EUR (€)**
  - **GBP (£)**
  - **INR (₹)**
- Dynamic DOM recalculation across wholesale yardage rates, capital savings counters, and cumulative escrow balances.

### 4. Parametric Textile Catalog & Search Directory
- Live filtering engine for exploring production batches:
  - **Keyword Search:** Instant filtering across fiber types, fabric titles, and colorway codes.
  - **GSM Weight Classes:** Light (<150 GSM), Medium (150–250 GSM), and Heavy (>250 GSM).
  - **Multi-Fiber Diversity:** Curated catalog spanning Organic Linen, TENCEL™ French Terry, Circular Recycled Cotton, Raw Selvedge Denim, Mulberry Silk, and Bamboo Viscose.

### 5. Dual-Role Authenticated Workspaces
- **Buyer Brand Portal (Velvet & Vine):** Real-time monitoring of capital saved, risk reduction metrics, active consortium pledges, and swatch request workflows.
- **Mill Production Console (Apex Textile Mills):** Loom capacity allocation (Loom #04), batch scheduling, and collective purchase order visibility.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Core:** HTML5, CSS3 (Custom Dark Theme UI, CSS Grid & Flexbox)
- **Logic & State Engine:** Vanilla JavaScript (ES6+), Event-Driven DOM Router, Dynamic State Management
- **Security & Route Guarding:** Session identity verification preventing unauthenticated commitments
- **Architecture Pattern:** Modular Single-Page Application (SPA) architecture with zero heavy third-party framework dependencies

---

## 📂 Repository File Structure

```text
moq-match/
├── index.html          # Core application structure & accessible view containers
├── style.css           # Custom dark-mode design system, glassmorphism, and responsive layouts
├── app.js              # State manager, currency converter, search filter engine, and modal handlers
└── assets/             # Textile swatch assets, UI icons, and technical diagrams
