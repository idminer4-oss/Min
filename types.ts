
export interface User {
  phone: string;
  email: string;
  isLoggedIn: boolean;
  role: 'user' | 'admin';
}

export interface WalletState {
  balance: number; // In Coin IDR (1.0000 format)
  hashrate: number; // In Hs
  lastClaimTime: number; // Timestamp
  accumulatedMined: number;
}

export interface MiningPlan {
  id: string;
  price: number;
  hashrateReward: number;
  dailyYield: number;
  name: string;
}

export interface CheckInDay {
  day: number;
  claimed: boolean;
  rewardType: 'HS' | 'COIN';
  amount: number;
}

export type AppTab = 'dashboard' | 'mining' | 'shop' | 'wallet' | 'missions' | 'support' | 'referral' | 'admin';
