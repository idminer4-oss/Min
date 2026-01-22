
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("IDR Minier: System mounted successfully.");
  } catch (err) {
    console.error("Mounting Failure:", err);
    rootElement.innerHTML = `
      <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #0a0a0c; color: #ef4444; font-family: sans-serif; text-align: center;">
        <h1 style="font-family: Orbitron;">CORE SYSTEM FAILURE</h1>
        <p style="color: #666; font-size: 12px;">Gagal memuat sistem mining. Pastikan browser Anda mendukung JavaScript terbaru.</p>
        <button onclick="location.reload()" style="margin-top:20px; background:#eab308; color:black; border:none; padding:10px 20px; border-radius:8px; font-weight:bold; cursor:pointer;">REBOOT</button>
      </div>
    `;
  }
}
