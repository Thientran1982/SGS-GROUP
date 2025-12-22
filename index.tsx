
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';

// --- GLOBAL ERROR HANDLER (Prevents Black Screen) ---
window.addEventListener('error', (event) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="color: #ff4444; background: #020408; height: 100vh; padding: 20px; font-family: monospace;">
        <h1>CRITICAL SYSTEM ERROR</h1>
        <p>${event.message}</p>
        <pre>${event.filename}: ${event.lineno}</pre>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #fff; border: none; cursor: pointer; margin-top: 20px;">REBOOT SYSTEM</button>
      </div>
    `;
  }
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
