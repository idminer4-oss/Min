
import React, { useState } from 'react';
import { Database, ShieldCheck, Users, Cpu, Coins, Edit3, Trash2, Search, CheckCircle } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simulated Platform Stats
  const stats = {
    totalUsers: 142,
    totalHashrate: 1520.5,
    totalMined: 452.9210,
    activeDeposits: 8
  };

  // Simulated User List
  const [users, setUsers] = useState([
    { id: '1', email: 'admin@coin.idr', phone: '083169046085', balance: 1.0000, hashrate: 1.0, role: 'admin' },
    { id: '2', email: 'user1@gmail.com', phone: '08123456789', balance: 25.5000, hashrate: 10.0, role: 'user' },
    { id: '3', email: 'miner77@yahoo.com', phone: '08556677889', balance: 0.1500, hashrate: 3.0, role: 'user' },
    { id: '4', email: 'crypto.king@web.com', phone: '08991122334', balance: 120.0000, hashrate: 50.0, role: 'user' },
  ]);

  const handleUpdateBalance = (id: string) => {
    const amount = prompt("Enter new balance (e.g. 10.0000):");
    if (amount && !isNaN(parseFloat(amount))) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, balance: parseFloat(amount) } : u));
    }
  };

  const handleUpdateHashrate = (id: string) => {
    const amount = prompt("Enter new hashrate (Hs):");
    if (amount && !isNaN(parseFloat(amount))) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, hashrate: parseFloat(amount) } : u));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
        <ShieldCheck className="w-6 h-6 text-red-500" />
        <div>
          <h2 className="font-orbitron font-bold text-red-500">ADMIN CONTROL PANEL</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Platform Management & Verification</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={<Users className="text-blue-500" />} label="Total Users" value={stats.totalUsers} />
        <StatCard icon={<Cpu className="text-yellow-500" />} label="Avg Hashrate" value={`${stats.totalHashrate} Hs`} />
        <StatCard icon={<Coins className="text-green-500" />} label="Total Mined" value={stats.totalMined.toFixed(4)} />
        <StatCard icon={<CheckCircle className="text-purple-500" />} label="Pending WD" value={stats.activeDeposits} />
      </div>

      {/* User Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">User Database</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-8 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-red-500/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          {users.filter(u => u.email.includes(searchTerm) || u.phone.includes(searchTerm)).map(user => (
            <div key={user.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{user.phone}</p>
                    {user.role === 'admin' && <span className="bg-red-500/20 text-red-500 text-[8px] px-1.5 py-0.5 rounded font-bold">ROOT</span>}
                  </div>
                  <p className="text-[10px] text-gray-500">{user.email}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleUpdateBalance(user.id)} className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20">
                    <Coins className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleUpdateHashrate(user.id)} className="p-1.5 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20">
                    <Cpu className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-black/20 rounded-xl p-2 text-center">
                  <p className="text-[8px] text-gray-500 uppercase font-bold">Balance</p>
                  <p className="text-xs font-orbitron font-bold text-yellow-500">{user.balance.toFixed(4)}</p>
                </div>
                <div className="bg-black/20 rounded-xl p-2 text-center">
                  <p className="text-[8px] text-gray-500 uppercase font-bold">Hashrate</p>
                  <p className="text-xs font-orbitron font-bold text-blue-500">{user.hashrate.toFixed(1)} Hs</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
        <h3 className="font-bold text-sm mb-3">System Logs</h3>
        <div className="space-y-2">
          <LogItem msg="User 0812... registered" time="2m ago" />
          <LogItem msg="Admin manually updated user balance" time="15m ago" />
          <LogItem msg="System backup completed" time="1h ago" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
    <div className="mb-2">{icon}</div>
    <p className="text-[10px] text-gray-500 font-bold uppercase">{label}</p>
    <p className="text-lg font-orbitron font-bold">{value}</p>
  </div>
);

const LogItem = ({ msg, time }: { msg: string, time: string }) => (
  <div className="flex justify-between items-center text-[10px] text-gray-500">
    <span>{msg}</span>
    <span className="font-mono">{time}</span>
  </div>
);

export default AdminPanel;
