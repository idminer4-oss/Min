
import React from 'react';
import { Users, Gift, Share2, Copy, TrendingUp, ChevronRight } from 'lucide-react';

const Referral: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute -right-6 -bottom-6 opacity-20">
          <Users className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Build Your Team</h2>
          <p className="text-white/80 text-sm mb-6 max-w-[200px]">Earn passive income while your friends mine coins.</p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-flex items-center gap-3 border border-white/20">
            <Gift className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="text-[10px] font-bold uppercase text-white/60">Instant Reward</p>
              <p className="text-lg font-orbitron font-bold">0.1000 <span className="text-xs">IDR</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* My Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Total Invited</p>
          <p className="text-xl font-orbitron font-bold text-white">0</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Total Rewards</p>
          <p className="text-xl font-orbitron font-bold text-yellow-500">0.0000</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#1a1a1e] rounded-3xl p-6 border border-white/5">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          Partner Benefits
        </h3>
        <div className="space-y-4">
          <BenefitItem title="20% Commission" desc="From all coins mined by your direct referrals." />
          <BenefitItem title="Sign-up Bonus" desc="Get 0.1000 IDR for every successful friend registration." />
          <BenefitItem title="Network Growth" desc="Unlock VIP mining status as your team expands." />
        </div>
      </div>

      {/* Share Link */}
      <div className="space-y-2">
        <p className="text-[10px] text-gray-500 font-bold uppercase ml-1">My Referral Code</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
          <span className="font-orbitron font-bold tracking-widest text-lg">IDR-99281X</span>
          <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
            <Copy className="w-5 h-5 text-yellow-500" />
          </button>
        </div>
        <button className="w-full bg-white text-black font-bold py-4 rounded-2xl mt-4 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-95 transition-all">
          <Share2 className="w-5 h-5" />
          Share Invite Link
        </button>
      </div>
    </div>
  );
};

const BenefitItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0"></div>
    <div>
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </div>
);

export default Referral;
