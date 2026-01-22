
import React, { useState } from 'react';
// Added ChevronRight to the lucide-react import list
import { ArrowDownCircle, ArrowUpCircle, Repeat, Wallet, Copy, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { WalletState } from '../types';

interface WalletViewProps {
  wallet: WalletState;
  setWallet: React.Dispatch<React.SetStateAction<WalletState>>;
}

const WalletView: React.FC<WalletViewProps> = ({ wallet, setWallet }) => {
  const [activeAction, setActiveAction] = useState<'deposit' | 'withdraw' | 'transfer' | null>(null);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const handleAction = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return alert("Invalid amount");

    if (activeAction === 'withdraw' || activeAction === 'transfer') {
      if (wallet.balance < numAmount) return alert("Insufficient balance");
      setWallet(prev => ({ ...prev, balance: prev.balance - numAmount }));
      alert(`${activeAction === 'withdraw' ? 'Withdrawal' : 'Transfer'} of ${numAmount.toFixed(4)} requested successfully!`);
    } else {
      alert("Simulated Deposit: Please contact AI Support for real deposit info.");
    }
    setActiveAction(null);
    setAmount('');
    setAddress('');
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Display */}
      <div className="bg-[#1a1a1e] rounded-3xl p-6 border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-500/20 p-2 rounded-lg">
            <Wallet className="w-5 h-5 text-yellow-500" />
          </div>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Asset</span>
        </div>
        <h2 className="text-3xl font-orbitron font-bold text-white mb-1">
          {wallet.balance.toFixed(4)} <span className="text-yellow-500 text-lg">IDR</span>
        </h2>
        <p className="text-xs text-gray-500">≈ Rp {(wallet.balance * 1000).toLocaleString('id-ID')}</p>
        
        <div className="mt-6 flex items-center justify-between bg-black/20 p-3 rounded-2xl border border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-bold">Wallet Address</span>
            <span className="text-xs font-mono">MINIER_7x...A2f4</span>
          </div>
          <button className="text-yellow-500">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-3 gap-3">
        <ActionButton 
          active={activeAction === 'deposit'} 
          onClick={() => setActiveAction('deposit')} 
          icon={<ArrowDownCircle />} 
          label="Deposit" 
        />
        <ActionButton 
          active={activeAction === 'withdraw'} 
          onClick={() => setActiveAction('withdraw')} 
          icon={<ArrowUpCircle />} 
          label="Withdraw" 
        />
        <ActionButton 
          active={activeAction === 'transfer'} 
          onClick={() => setActiveAction('transfer')} 
          icon={<Repeat />} 
          label="Transfer" 
        />
      </div>

      {/* Action Form */}
      {activeAction && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 animate-in slide-in-from-top duration-300">
          <h4 className="font-bold text-lg mb-4 capitalize">{activeAction} IDR Coin</h4>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Amount</label>
              <input 
                type="number" 
                placeholder="0.0000"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            {(activeAction === 'withdraw' || activeAction === 'transfer') && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
                  {activeAction === 'withdraw' ? 'Dana/Bank Info' : 'Receiver Address'}
                </label>
                <input 
                  type="text" 
                  placeholder={activeAction === 'withdraw' ? "Dana: 08..." : "MINIER_..."}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            )}
            <button 
              onClick={handleAction}
              className="w-full bg-yellow-500 text-black font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              Confirm {activeAction}
            </button>
          </div>
        </div>
      )}

      {/* 2FA Security Banner */}
      <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-4 flex items-center gap-4">
        <div className="bg-green-500/20 p-2 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <p className="text-xs font-bold text-green-500">Authenticator Code (2FA)</p>
          <p className="text-[10px] text-gray-500">Security enhanced for all transactions.</p>
        </div>
        {/* Fixed: Added missing ChevronRight import */}
        <ChevronRight className="w-4 h-4 text-gray-600 ml-auto" />
      </div>

      {/* Transaction History Mock */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recent Activity</h3>
        <div className="space-y-2">
          <HistoryItem type="Deposit" amount="+1.0000" date="2023-10-24" status="Success" />
          <HistoryItem type="Mining" amount="+0.4281" date="2023-10-23" status="Completed" />
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick: () => void, active: boolean }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-2 p-4 rounded-3xl border transition-all ${
      active ? 'bg-yellow-500 border-yellow-500 text-black scale-105 shadow-xl' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
    }`}
  >
    <span className={active ? 'text-black' : 'text-yellow-500'}>{icon}</span>
    <span className="text-[10px] font-bold uppercase">{label}</span>
  </button>
);

const HistoryItem = ({ type, amount, date, status }: { type: string, amount: string, date: string, status: string }) => (
  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center">
        <Repeat className="w-4 h-4 text-gray-500" />
      </div>
      <div>
        <p className="text-sm font-bold">{type}</p>
        <p className="text-[10px] text-gray-500">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-orbitron font-bold text-green-500">{amount}</p>
      <p className="text-[8px] uppercase font-black text-gray-600">{status}</p>
    </div>
  </div>
);

export default WalletView;
