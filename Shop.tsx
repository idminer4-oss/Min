
import React from 'react';
import { Cpu, Zap, Coins, ChevronRight } from 'lucide-react';
import { WalletState, MiningPlan } from '../types';
import { MINING_PLANS } from '../constants';

interface ShopProps {
  wallet: WalletState;
  setWallet: React.Dispatch<React.SetStateAction<WalletState>>;
}

const Shop: React.FC<ShopProps> = ({ wallet, setWallet }) => {
  const handlePurchase = (plan: MiningPlan) => {
    if (wallet.balance >= plan.price) {
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - plan.price,
        hashrate: prev.hashrate + plan.hashrateReward
      }));
      alert(`Success! Purchased ${plan.name}. Hashrate increased by ${plan.hashrateReward} Hs.`);
    } else {
      alert("Insufficient Balance! Mine more coins or deposit to buy hashrate.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold">Mining Mall</h3>
        <div className="bg-white/5 px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
          <Coins className="w-3 h-3 text-yellow-500" />
          <span className="text-xs font-orbitron font-bold text-yellow-500">{wallet.balance.toFixed(4)}</span>
        </div>
      </div>

      <div className="space-y-4">
        {MINING_PLANS.map(plan => (
          <div key={plan.id} className="bg-white/5 border border-white/10 rounded-3xl p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-32 h-32 text-white" />
            </div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h4 className="font-bold text-lg text-yellow-500">{plan.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded">NEW</div>
                  <p className="text-xs text-gray-400">Yield: {plan.dailyYield.toFixed(4)} / 24h</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-bold">Price</p>
                <p className="text-lg font-orbitron font-bold">{plan.price.toFixed(4)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="flex-1 bg-black/30 rounded-2xl p-3 flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Zap className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Hashrate</p>
                  <p className="text-sm font-orbitron font-bold">+{plan.hashrateReward} Hs</p>
                </div>
              </div>
              <div className="flex-1 bg-black/30 rounded-2xl p-3 flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Coins className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Reward</p>
                  <p className="text-sm font-orbitron font-bold">IDR Coin</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handlePurchase(plan)}
              className="w-full bg-white text-black font-bold py-3 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all relative z-10"
            >
              Purchase Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
