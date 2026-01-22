
import React from 'react';
import { Pickaxe, Cpu, Zap, Timer, Coins } from 'lucide-react';
import { WalletState } from '../types';

interface MiningPanelProps {
  wallet: WalletState;
  onClaim: () => void;
}

const MiningPanel: React.FC<MiningPanelProps> = ({ wallet, onClaim }) => {
  return (
    <div className="space-y-6">
      {/* 3D Visual Simulation */}
      <div className="relative aspect-square w-full max-w-[280px] mx-auto flex items-center justify-center">
        {/* Animated Rings */}
        <div className="absolute inset-0 rounded-full border-4 border-yellow-500/20 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-4 rounded-full border-2 border-yellow-500/40 animate-[spin_5s_linear_infinite_reverse]"></div>
        <div className="absolute inset-8 rounded-full border border-yellow-500/60 animate-pulse"></div>
        
        {/* Core Element */}
        <div className="relative z-10 flex flex-col items-center bg-[#1a1a1e] p-8 rounded-full shadow-[0_0_50px_rgba(234,179,8,0.2)]">
          <div className="animate-float">
            <Cpu className="w-16 h-16 text-yellow-500" />
          </div>
          <p className="mt-4 font-orbitron font-bold text-yellow-500 text-xl">MINING</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Active</p>
        </div>
      </div>

      {/* Accumulation Stats */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2">Mining Accumulation</p>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Coins className="w-6 h-6 text-yellow-500" />
          <h2 className="text-4xl font-orbitron font-bold text-white">
            {wallet.accumulatedMined.toFixed(4)}
          </h2>
          <span className="text-yellow-500 font-bold">IDR</span>
        </div>

        <button 
          onClick={onClaim}
          disabled={wallet.accumulatedMined < 0.0001}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            wallet.accumulatedMined >= 0.0001 
            ? 'bg-yellow-500 text-black shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:scale-[1.02]' 
            : 'bg-white/10 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Pickaxe className="w-5 h-5" />
          CLAIM COINS
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Power</span>
          </div>
          <p className="font-orbitron font-bold text-lg">{wallet.hashrate.toFixed(1)} Hs</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-4 h-4 text-green-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Cycle</span>
          </div>
          <p className="font-orbitron font-bold text-lg">24 HOURS</p>
        </div>
      </div>

      <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
        <p className="text-xs text-yellow-500/70 italic leading-relaxed">
          * Each 1 Hs hashrate generates exactly 0.5000 IDR Coin every 24 hours. Keep your app active to track real-time accumulation.
        </p>
      </div>
    </div>
  );
};

export default MiningPanel;
