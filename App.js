import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    async function setup() {
      // Connect to Binance Smart Chain mainnet
      const provider = new ethers.providers.JsonRpcProvider(
        'https://bsc-dataseed.binance.org/'
      );
      // Generate a new random wallet and connect it to the provider
      const randomWallet = ethers.Wallet.createRandom().connect(provider);
      setWallet(randomWallet);
      try {
        const bal = await provider.getBalance(randomWallet.address);
        setBalance(ethers.utils.formatEther(bal));
      } catch (err) {
        console.error('Failed to fetch balance', err);
      }
    }
    setup();
  }, []);

  if (!wallet) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">BSC Wallet</h1>
        <p>
          <span className="font-semibold">Address:</span> {wallet.address}
        </p>
        <p>
          <span className="font-semibold">Mnemonic:</span> {wallet.mnemonic?.phrase}
        </p>
        <p>
          <span className="font-semibold">BNB Balance:</span> {balance}
        </p>
      </div>
    </div>
  );
}

export default App;
