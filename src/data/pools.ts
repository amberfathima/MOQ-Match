import { Pool, ProductCategory } from '../types';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'organic-linen-cotton',
    name: 'Organic Linen & Cotton',
    description: 'GOTS-certified natural woven linens, poplins, twills & raw cottons',
    activePoolCount: 14,
    avgSavings: '42%'
  },
  {
    id: 'activewear-synthetics',
    name: 'Activewear Synthetics',
    description: 'Recycled nylon (ECONYL), technical polyester & elastane blends',
    activePoolCount: 19,
    avgSavings: '38%'
  },
  {
    id: 'denim-heavy-canvas',
    name: 'Denim & Heavy Canvas',
    description: 'Selvedge denim, duck canvas, recycled indigo & organic cotton twills',
    activePoolCount: 8,
    avgSavings: '45%'
  },
  {
    id: 'sustainable-knits',
    name: 'Sustainable Knits',
    description: 'TENCEL Lyocell, modal, bamboo fleece, organic French terry & rib knits',
    activePoolCount: 22,
    avgSavings: '36%'
  },
  {
    id: 'swimwear-blends',
    name: 'Swimwear Blends',
    description: 'Chlorine-resistant recycled polyamide, UV50+ tricot & textured piques',
    activePoolCount: 6,
    avgSavings: '34%'
  },
  {
    id: 'leather-vegan-leather',
    name: 'Leather & Vegan Leather',
    description: 'LWG gold-rated hides, apple leather, mycelium & bio-polyurethane',
    activePoolCount: 9,
    avgSavings: '48%'
  },
  {
    id: 'footwear-soles',
    name: 'Footwear & Soles',
    description: 'Vibram outsoles, vulcanized natural rubber, EVA foam & welted lasts',
    activePoolCount: 5,
    avgSavings: '51%'
  },
  {
    id: 'trims-zippers',
    name: 'Trims & Zippers',
    description: 'YKK recycled zippers, corozo buttons, organic cotton labels & piping',
    activePoolCount: 27,
    avgSavings: '39%'
  },
  {
    id: 'packaging-materials',
    name: 'Packaging Materials',
    description: 'FSC-certified paper boxes, compostable poly-mailers & soy-ink tissue',
    activePoolCount: 16,
    avgSavings: '44%'
  },
  {
    id: 'hardware-fasteners',
    name: 'Hardware & Fasteners',
    description: 'Solid brass snaps, nickel-free rivets, magnetic clasps & custom buckles',
    activePoolCount: 11,
    avgSavings: '40%'
  }
];

export const INITIAL_POOLS: Pool[] = [
  {
    id: 'pool-402',
    poolNumber: 402,
    title: '200 GSM Organic Linen | French Navy Dye (#FN-289)',
    category: 'Organic Linen & Cotton',
    fabricType: 'Linen',
    gsm: 200,
    colorCode: '#FN-289',
    matchScore: '92% Match',
    supplier: 'Apex Textile Mills',
    supplierLocation: 'Guimarães, Portugal',
    certification: 'GOTS & OEKO-TEX Standard 100',
    targetUnits: 1000,
    committedUnits: 700,
    unitPrice: 14.50,
    estimatedRetailValue: 32.00,
    pipelineStatus: 'Matching',
    daysRemaining: 4,
    image: '/src/assets/images/french_navy_linen_1790775556422.jpg',
    specs: {
      composition: '100% Certified Organic French Flax',
      weight: '200 GSM (Medium Heavy)',
      width: '148 cm / 58 inches',
      dyeMethod: 'Low-impact reactive yarn dye (Color #FN-289)',
      origin: 'Woven in Northern Portugal'
    },
    participants: [
      {
        name: 'Velvet & Vine',
        units: 200,
        location: 'Melbourne, AU',
        avatarInitials: 'VV',
        avatarBg: 'bg-emerald-600',
        timestamp: 'Committed 2 days ago'
      },
      {
        name: 'Aura Athleisure',
        units: 300,
        location: 'Vancouver, CA',
        avatarInitials: 'AA',
        avatarBg: 'bg-indigo-600',
        timestamp: 'Committed 1 day ago'
      },
      {
        name: 'Urban Loom',
        units: 200,
        location: 'Brooklyn, US',
        avatarInitials: 'UL',
        avatarBg: 'bg-slate-700',
        timestamp: 'Committed 8 hours ago'
      }
    ]
  },
  {
    id: 'pool-419',
    poolNumber: 419,
    title: '280 GSM TENCEL Organic French Terry | Ecru Natural (#EC-102)',
    category: 'Sustainable Knits',
    fabricType: 'Synthetics',
    gsm: 280,
    colorCode: '#EC-102',
    matchScore: '95% Match',
    supplier: 'Lenzing Certified Mill',
    supplierLocation: 'Izmir, Turkey',
    certification: 'Lenzing™ Lyocell Certified & Bluesign®',
    targetUnits: 1200,
    committedUnits: 950,
    unitPrice: 12.80,
    estimatedRetailValue: 28.00,
    pipelineStatus: 'Matching',
    daysRemaining: 6,
    image: '/src/assets/images/french_navy_linen_1790775556422.jpg',
    specs: {
      composition: '95% TENCEL™ Modal, 5% Roica Clean Elastane',
      weight: '280 GSM French Terry',
      width: '160 cm Open Width',
      dyeMethod: 'Natural Ecru Unbleached (#EC-102)',
      origin: 'Knit in Turkey'
    },
    participants: [
      {
        name: 'Haven Loungewear',
        units: 450,
        location: 'Stockholm, SE',
        avatarInitials: 'HL',
        avatarBg: 'bg-teal-600',
        timestamp: 'Committed 3 days ago'
      },
      {
        name: 'Maison Minimal',
        units: 500,
        location: 'Paris, FR',
        avatarInitials: 'MM',
        avatarBg: 'bg-violet-600',
        timestamp: 'Committed 1 day ago'
      }
    ]
  },
  {
    id: 'pool-108',
    poolNumber: 108,
    title: '180 GSM Circular Recycled Cotton Jersey | Undyed Mélange (#RC-108)',
    category: 'Organic Linen & Cotton',
    fabricType: 'Cotton',
    gsm: 180,
    colorCode: '#RC-108',
    matchScore: '89% Match',
    supplier: 'Recover™ Fiber Mill',
    supplierLocation: 'Alicante, Spain',
    certification: 'GRS Certified & OEKO-TEX Standard 100',
    targetUnits: 1000,
    committedUnits: 720,
    unitPrice: 8.90,
    estimatedRetailValue: 22.00,
    pipelineStatus: 'Matching',
    daysRemaining: 2,
    image: '/src/assets/images/french_navy_linen_1790775556422.jpg',
    specs: {
      composition: '50% Post-Consumer Recycled Cotton, 50% Organic Combed Cotton',
      weight: '180 GSM Single Jersey',
      width: '155 cm Tubular',
      dyeMethod: 'Undyed Mélange Mineral Process (#RC-108)',
      origin: 'Alicante, Spain'
    },
    participants: [
      {
        name: 'EcoBasics Co.',
        units: 320,
        location: 'Barcelona, ES',
        avatarInitials: 'EB',
        avatarBg: 'bg-emerald-600',
        timestamp: 'Committed 3 days ago'
      },
      {
        name: 'Loop Wear',
        units: 400,
        location: 'Amsterdam, NL',
        avatarInitials: 'LW',
        avatarBg: 'bg-sky-600',
        timestamp: 'Committed 1 day ago'
      }
    ]
  },
  {
    id: 'pool-314',
    poolNumber: 314,
    title: '310 GSM Raw Selvedge Denim | Indigo Dark (#DN-310)',
    category: 'Denim & Heavy Canvas',
    fabricType: 'Denim',
    gsm: 310,
    colorCode: '#DN-310',
    matchScore: '94% Match',
    supplier: 'Kuroki Mills',
    supplierLocation: 'Okayama, Japan',
    certification: 'JAS Organic & Better Cotton Initiative',
    targetUnits: 1500,
    committedUnits: 1100,
    unitPrice: 18.20,
    estimatedRetailValue: 45.00,
    pipelineStatus: 'Matching',
    daysRemaining: 5,
    image: '/src/assets/images/hero_textile_sourcing_1790775540727.jpg',
    specs: {
      composition: '100% Long-Staple Zimbabwe Cotton',
      weight: '310 GSM / 11 oz Selvedge',
      width: '32 inches Red Selvedge ID',
      dyeMethod: 'Natural Pure Indigo Rope Dye (#DN-310)',
      origin: 'Toyoda Shuttle Looms, Okayama'
    },
    participants: [
      {
        name: 'Forge & Thread',
        units: 500,
        location: 'Portland, US',
        avatarInitials: 'FT',
        avatarBg: 'bg-amber-600',
        timestamp: 'Committed 4 days ago'
      },
      {
        name: 'Riveted Co.',
        units: 600,
        location: 'Osaka, JP',
        avatarInitials: 'RC',
        avatarBg: 'bg-indigo-600',
        timestamp: 'Committed 2 days ago'
      }
    ]
  },
  {
    id: 'pool-522',
    poolNumber: 522,
    title: '120 GSM Mulberry Habotai Silk | Ivory Cream (#SK-012)',
    category: 'Sustainable Knits',
    fabricType: 'Silk',
    gsm: 120,
    colorCode: '#SK-012',
    matchScore: '88% Match',
    supplier: 'Hangzhou Silk Syndicate',
    supplierLocation: 'Hangzhou, China',
    certification: 'OEKO-TEX Class 1 & Organic Silk Standard',
    targetUnits: 600,
    committedUnits: 400,
    unitPrice: 22.50,
    estimatedRetailValue: 58.00,
    pipelineStatus: 'Matching',
    daysRemaining: 8,
    image: '/src/assets/images/french_navy_linen_1790775556422.jpg',
    specs: {
      composition: '100% Grade 6A Mulberry Silk',
      weight: '120 GSM / 16mm Habotai',
      width: '140 cm Width',
      dyeMethod: 'Low-temperature botanical ivory tint (#SK-012)',
      origin: 'Hangzhou Heritage Mill'
    },
    participants: [
      {
        name: 'Aurelia Eveningwear',
        units: 250,
        location: 'London, UK',
        avatarInitials: 'AE',
        avatarBg: 'bg-rose-600',
        timestamp: 'Committed 2 days ago'
      },
      {
        name: 'Serena Lingerie',
        units: 150,
        location: 'Milan, IT',
        avatarInitials: 'SL',
        avatarBg: 'bg-pink-600',
        timestamp: 'Committed 12 hours ago'
      }
    ]
  },
  {
    id: 'pool-230',
    poolNumber: 230,
    title: '240 GSM Recycled Poly-Spandex Rib | Carbon Black (#BK-099)',
    category: 'Activewear Synthetics',
    fabricType: 'Synthetics',
    gsm: 240,
    colorCode: '#BK-099',
    matchScore: '96% Match',
    supplier: 'Taekwang Industrial',
    supplierLocation: 'Seoul, South Korea',
    certification: 'GRS & Bluesign Approved',
    targetUnits: 1000,
    committedUnits: 850,
    unitPrice: 11.00,
    estimatedRetailValue: 26.00,
    pipelineStatus: 'Matching',
    daysRemaining: 3,
    image: '/src/assets/images/french_navy_linen_1790775556422.jpg',
    specs: {
      composition: '82% Recycled Ocean PET, 18% High-Recovery Spandex',
      weight: '240 GSM 2x2 Performance Rib',
      width: '150 cm Width',
      dyeMethod: 'Waterless Supercritical CO2 Carbon Black (#BK-099)',
      origin: 'Seoul, South Korea'
    },
    participants: [
      {
        name: 'Apex Athletic',
        units: 500,
        location: 'Seoul, KR',
        avatarInitials: 'AA',
        avatarBg: 'bg-slate-800',
        timestamp: 'Committed 3 days ago'
      },
      {
        name: 'Kinetic Movement',
        units: 350,
        location: 'Denver, US',
        avatarInitials: 'KM',
        avatarBg: 'bg-cyan-600',
        timestamp: 'Committed 1 day ago'
      }
    ]
  },
  {
    id: 'pool-605',
    poolNumber: 605,
    title: '350 GSM Merino Wool Flannel | Forest Green (#MG-605)',
    category: 'Sustainable Knits',
    fabricType: 'Wool',
    gsm: 350,
    colorCode: '#MG-605',
    matchScore: '91% Match',
    supplier: 'Vitale Barberis Canonico',
    supplierLocation: 'Biella, Italy',
    certification: 'ZQ Merino & Responsible Wool Standard (RWS)',
    targetUnits: 800,
    committedUnits: 480,
    unitPrice: 29.00,
    estimatedRetailValue: 72.00,
    pipelineStatus: 'Matching',
    daysRemaining: 7,
    image: '/src/assets/images/hero_textile_sourcing_1790775540727.jpg',
    specs: {
      composition: '100% Super 110s Fine Merino Wool',
      weight: '350 GSM Brushed Flannel',
      width: '150 cm Width',
      dyeMethod: 'Yarn-dyed forest green mélange (#MG-605)',
      origin: 'Biella, Piedmont, Italy'
    },
    participants: [
      {
        name: 'Highland Outerwear',
        units: 300,
        location: 'Edinburgh, UK',
        avatarInitials: 'HO',
        avatarBg: 'bg-emerald-700',
        timestamp: 'Committed 4 days ago'
      },
      {
        name: 'Atelier Sartorial',
        units: 180,
        location: 'Florence, IT',
        avatarInitials: 'AS',
        avatarBg: 'bg-amber-700',
        timestamp: 'Committed 2 days ago'
      }
    ]
  },
  {
    id: 'pool-711',
    poolNumber: 711,
    title: '220 GSM Bamboo Viscose Slub | Terracotta (#TC-711)',
    category: 'Sustainable Knits',
    fabricType: 'Synthetics',
    gsm: 220,
    colorCode: '#TC-711',
    matchScore: '90% Match',
    supplier: 'Aditya Birla Yarn',
    supplierLocation: 'Kharach, India',
    certification: 'FSC Certified Bamboo & OEKO-TEX Standard 100',
    targetUnits: 1000,
    committedUnits: 640,
    unitPrice: 10.50,
    estimatedRetailValue: 24.00,
    pipelineStatus: 'Matching',
    daysRemaining: 9,
    image: '/src/assets/images/french_navy_linen_1790775556422.jpg',
    specs: {
      composition: '70% Organic Bamboo Viscose, 30% Slub Cotton',
      weight: '220 GSM Slub Jersey',
      width: '155 cm Width',
      dyeMethod: 'Low-impact reactive clay dye (#TC-711)',
      origin: 'Gujarat, India'
    },
    participants: [
      {
        name: 'Dharma Essentials',
        units: 400,
        location: 'Mumbai, IN',
        avatarInitials: 'DE',
        avatarBg: 'bg-orange-600',
        timestamp: 'Committed 3 days ago'
      },
      {
        name: 'Terra Resortwear',
        units: 240,
        location: 'Sydney, AU',
        avatarInitials: 'TR',
        avatarBg: 'bg-yellow-600',
        timestamp: 'Committed 1 day ago'
      }
    ]
  }
];
