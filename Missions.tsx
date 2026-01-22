
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Trophy, Zap, Gift } from 'lucide-react';
import { WalletState, CheckInDay } from '../types';

interface MissionsProps {
  wallet: WalletState;
  setWallet: React.Dispatch<React.SetStateAction<WalletState>>;
}

const Missions: React.FC<MissionsProps> = ({ wallet, setWallet }) => {
  const [days, setDays] = useState<CheckInDay[]>(() => {
    const saved = localStorage.getItem('minier_days');
    if (saved) return JSON.parse(saved);
    
    return Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      let rewardType: 'HS' | 'COIN' = 'COIN';
      let amount = 0.1000;

      if (day === 1) {
        rewardType = 'HS';
        amount = 1.0;
      } else if (day >= 16 && day <= 30) {
        amount = 0.5000;
      }

      return { day, claimed: false, rewardType, amount };
    });
  });

  useEffect(() => {
    localStorage.setItem('minier_days', JSON.stringify(days));
  }, [days]);

  const handleClaimDay = (dayIndex: number) => {
    const dayObj = days[dayIndex];
    if (dayObj.claimed) return;

    // Logic for sequential claiming can be added here
    const updatedDays = [...days];
    updatedDays[dayIndex].claimed = true;
    setDays(updatedDays);

    if (dayObj.rewardType === 'HS') {
      setWallet(prev => ({ ...prev, hashrate: prev.hashrate + dayObj.amount }));
      alert(`Claimed Day ${dayObj.day}: Received ${dayObj.amount} Hs Hashrate!`);
    } else {
      setWallet(prev => ({ ...prev, balance: prev.balance + dayObj.amount }));
      alert(`Claimed Day ${dayObj.day}: Received ${dayObj.amount.toFixed(4)} IDR Coin!`);
    }
  };

  const currentDay = days.findIndex(d => !d.claimed) + 1;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl flex items-center gap-6">
        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Daily Mission</h3>
          <p className="text-white/80 text-sm">Check-in for 30 days to get free hashrate and coins.</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <h4 className="font-bold">Progress (Day {currentDay}/30)</h4>
          </div>
          {currentDay >= 16 && (
             <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded font-black uppercase">Phase 2 Active</span>
          )}
        </div>

        {/* 30 Day Grid */}
        <div className="grid grid-cols-5 gap-2">
          {days.map((day, idx) => (
            <button
              key={day.day}
              onClick={() => handleClaimDay(idx)}
              disabled={day.claimed}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                day.claimed 
                ? 'bg-green-500/20 border border-green-500/40' 
                : day.day === currentDay
                ? 'bg-orange-500 border border-orange-400 scale-105 shadow-lg'
                : 'bg-white/5 border border-white/10 opacity-50'
              }`}
            >
              <span className={`text-[10px] font-bold ${day.claimed ? 'text-green-500' : 'text-white/70'}`}>Day {day.day}</span>
              {day.claimed ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : day.rewardType === 'HS' ? (
                <Zap className="w-4 h-4 text-white" />
              ) : (
                <Gift className="w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards Info */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Reward Schedule</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Day 1 Reward</span>
            <span className="font-bold text-yellow-500">1.0 Hs</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Day 2 - 15 Reward</span>
            <span className="font-bold text-yellow-500">0.1000 IDR</span>
          </div>
          <div className="flex justify-between items-center text-orange-400">
            <span className="text-sm font-bold">Day 16 - 30 Reward (PHASE 2)</span>
            <span className="font-bold">0.5000 IDR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
