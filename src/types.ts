export interface Participant {
  name: string;
  units: number;
  location: string;
  avatarInitials: string;
  avatarBg: string;
  timestamp: string;
}

export type PoolPipelineStatus = 'Open' | 'Matching' | 'MOQ Reached' | 'Confirmed' | 'Production';

export interface Pool {
  id: string;
  poolNumber: number;
  title: string;
  category: string;
  supplier: string;
  supplierLocation: string;
  certification: string;
  targetUnits: number;
  committedUnits: number;
  unitPrice: number;
  estimatedRetailValue: number;
  pipelineStatus: PoolPipelineStatus;
  daysRemaining: number;
  image: string;
  specs: {
    composition: string;
    weight: string;
    width: string;
    dyeMethod: string;
    origin: string;
  };
  participants: Participant[];
  gsm?: number;
  fabricType?: string;
  colorCode?: string;
  matchScore?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  activePoolCount: number;
  avgSavings: string;
}

export type UserRole = 'brand' | 'manufacturer';

export interface BrandUser {
  role: 'brand';
  name: string;
  id: string;
  email?: string;
  verified?: boolean;
}

export interface ManufacturerUser {
  role: 'manufacturer';
  name: string;
  cert: string;
  email?: string;
  verified?: boolean;
}

export type CurrentUser = BrandUser | ManufacturerUser | null;
