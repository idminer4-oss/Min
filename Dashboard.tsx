
import React from 'react';
import { 
  TrendingUp, 
  Cpu, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Repeat, 
  Users, 
  Calendar,
  Lock,
  ChevronRight
} from 'lucide-react';
import { WalletState, AppTab } from '../types';
import { CONVERSION_RATE } from '../constants';

interface DashboardProps {
  wallet: WalletState;
  onNavigate: (tab: AppTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ wallet, onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
          <Cpu className="w-24 h-24 text-black" />
        </div>
        <p className="text-black/60 text-xs font-bold uppercase tracking-wider mb-1">Estimated Value</p>
        <div className="flex items-baseline gap-2 mb-6">
          <h2 className="text-4xl font-orbitron font-bold text-black">
            {(wallet.balance * CONVERSION_RATE).toLocaleString('id-ID')}
          </h2>
          <span className="text-black font-bold text-sm">IDR</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-3">
            <p className="text-black/60 text-[10px] uppercase font-bold">My Hashrate</p>
            <p className="text-black font-orbitron font-bold">{wallet.hashrate.toFixed(1)} Hs</p>
          </div>
          <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-3">
            <p className="text-black/60 text-[10px] uppercase font-bold">Today's Profit</p>
            <p className="text-black font-orbitron font-bold text-sm">+ {(wallet.hashrate * 0.5).toFixed(4)}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        <ActionButton onClick={() => onNavigate('wallet')} icon={<ArrowDownCircle />} label="Deposit" color="text-green-500" />
        <ActionButton onClick={() => onNavigate('wallet')} icon={<ArrowUpCircle />} label="Withdraw" color="text-red-500" />
        <ActionButton onClick={() => onNavigate('wallet')} icon={<Repeat />} label="Transfer" color="text-blue-500" />
        <ActionButton onClick={() => onNavigate('missions')} icon={<Calendar />} label="Check-in" color="text-orange-500" />
      </div>

      {/* Features Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Mining Network</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <FeatureCard 
            onClick={() => onNavigate('referral')}
            icon={<Users className="w-6 h-6 text-purple-500" />}
            title="Referral"
            desc="Earn 20% Comm."
          />
          <FeatureCard 
            onClick={() => onNavigate('missions')}
            icon={<Calendar className="w-6 h-6 text-orange-500" />}
            title="Missions"
            desc="30-Day Streak"
          />
        </div>

        <button 
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors"
          disabled
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <p className="font-bold">P2P Marketplace</p>
                <span className="bg-red-500/20 text-red-500 text-[8px] px-2 py-0.5 rounded-full border border-red-500/50 uppercase font-black">LOCKED</span>
              </div>
              <p className="text-xs text-gray-500">Sell coins for cash (KYC Req.)</p>
            </div>
          </div>
          <Lock className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-600/10 border border-blue-600/20 rounded-2xl p-4 flex gap-4 items-center">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Repeat className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-blue-400">Current Rate</p>
          <p className="text-sm">1.0000 Coin IDR = Rp 1.000,-</p>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick, color }: { icon: React.ReactNode, label: string, onClick: () => void, color: string }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
    <span className={color}>{icon}</span>
    <span className="text-[10px] font-bold text-gray-400">{label}</span>
  </button>
);

const FeatureCard = ({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick: () => void }) => (
  <button onClick={onClick} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left hover:bg-white/10 transition-all group">
    <div className="mb-3">{icon}</div>
    <p className="font-bold text-sm">{title}</p>
    <div className="flex items-center justify-between">
      <p className="text-[10px] text-gray-500">{desc}</p>
      <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-yellow-500 transition-colors" />
    </div>
  </button>
);

export default Dashboard;
