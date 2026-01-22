
import { MiningPlan } from './types';

export const CONVERSION_RATE = 1000; // 1.0000 IDR Coin = 1000 IDR Real
export const BASE_MINING_RATE = 0.5000; // per 1 Hs per 24h

export const MINING_PLANS: MiningPlan[] = [
  {
    id: 'starter',
    name: 'Starter Rig',
    price: 10.0000,
    hashrateReward: 3,
    dailyYield: 1.5000
  },
  {
    id: 'pro',
    name: 'Pro Miner',
    price: 25.0000,
    hashrateReward: 7,
    dailyYield: 4.5000
  },
  {
    id: 'industrial',
    name: 'Industrial Unit',
    price: 50.0000,
    hashrateReward: 10,
    dailyYield: 8.0000
  }
];
