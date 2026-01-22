
import React, { useState } from 'react';
import { Pickaxe, Mail, Phone, Lock, ChevronRight, Eye, EyeOff, Coins, Zap } from 'lucide-react';
import { User } from '../types.ts';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone && password) {
      if (password.length < 6) {
        alert("Password minimal 6 karakter");
        return;
      }

      // Logic: Pendaftar pertama adalah Admin
      const existingUsers = localStorage.getItem('minier_all_users');
      const usersList = existingUsers ? JSON.parse(existingUsers) : [];
      
      const isFirstUser = usersList.length === 0;
      const newUser: User = {
        email,
        phone,
        isLoggedIn: true,
        role: isFirstUser ? 'admin' : 'user'
      };

      // Simpan ke "database" lokal
      usersList.push({ email, phone, role: newUser.role });
      localStorage.setItem('minier_all_users', JSON.stringify(usersList));

      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#0a0a0c] flex flex-col p-8 items-center justify-center relative overflow-hidden">
      {/* Animasi Latar Belakang Bergerak */}
      <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-0 w-2 h-2 bg-yellow-500 rounded-full animate-drift opacity-20"></div>
      <div className="absolute top-1/2 left-0 w-3 h-3 bg-blue-500 rounded-full animate-drift opacity-10" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-0 w-1 h-1 bg-white rounded-full animate-drift opacity-30" style={{ animationDelay: '5s' }}></div>

      <div className="z-10 w-full">
        {/* Logo Coin & Brand */}
        <div className="flex flex-col items-center mb-12 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-[2rem] shadow-[0_15px_50px_rgba(234,179,8,0.4)] mb-4 border-t-2 border-white/30">
              <Coins className="w-14 h-14 text-black" />
              <Zap className="absolute -top-2 -right-2 w-6 h-6 text-white bg-blue-500 rounded-full p-1 shadow-lg" />
            </div>
          </div>
          <h1 className="font-orbitron text-3xl font-bold text-white tracking-tighter text-center">
            COIN IDR <br/> 
            <span className="text-yellow-500">MINIER</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-[1px] w-4 bg-gray-700"></span>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Cloud Mining IDR Network</p>
            <span className="h-[1px] w-4 bg-gray-700"></span>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Phone Number</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
              <input 
                type="tel" 
                placeholder="083169046XXX"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder:text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
              <input 
                type="email" 
                placeholder="miner@coinidr.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder:text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Security Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder:text-gray-700"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl shadow-[0_10px_20px_rgba(234,179,8,0.3)] hover:bg-yellow-400 active:scale-95 transition-all flex items-center justify-center gap-2 mt-6 uppercase tracking-widest text-sm"
          >
            {isRegister ? 'Register Account' : 'Login System'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-xs font-medium">
          {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-yellow-500 font-black ml-2 underline underline-offset-4 hover:text-yellow-400"
          >
            {isRegister ? 'Masuk Sekarang' : 'Daftar Gratis'}
          </button>
        </p>
      </div>

      <div className="mt-16 text-center opacity-30">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-[8px] text-gray-400 uppercase tracking-widest">Network Secure Status: Encrypted</p>
        </div>
        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Powered by Gemini AI Engine</p>
      </div>
    </div>
  );
};

export default Auth;
