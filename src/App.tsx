import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ConnectButton } from "thirdweb/react";
import { accountAbstraction, client } from "./constants";
import GaslessPage from './components/GaslessPage';
import MultichainPage from './components/MultichainPage';
import AddSigner from './components/SessionKeysPage';
import BatchingPage from './components/BatchingPage';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gasless" element={<GaslessPage />} />
        <Route path="/multichain" element={<MultichainPage />} />
        <Route path="/session-keys" element={<AddSigner />} />
        <Route path="/batching" element={<BatchingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center mb-20">
        <ConnectButton
          client={client}
          accountAbstraction={accountAbstraction}
        />
      </div>
      <Menu />
    </div>
  );
}

function Menu() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <MenuItem
        title="Sponsored transactions"
        href="/gasless"
        description="Execute transactions without requiring users to hold ETH."
      />
      <MenuItem
        title="Multichain transactions"
        href="/multichain"
        description="Execute transactions on different chains maintaining the same smart account address."
      />
      <MenuItem
        title="Session keys"
        href="/session-keys"
        description="Add other admins and signers to your smart accounts"
      />
      <MenuItem
        title="Batching transactions"
        href="/batching"
        description="Execute multiple transactions atomically."
      />
    </div>
  );
}

type MenuItemProps = {
  title: string;
  href: string;
  description: string;
};

function MenuItem({ title, href, description }: MenuItemProps) {
  return (
    <Link to={href} className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors duration-200 ease-in-out hover:border-zinc-700 hover:text-white">
      <article className="flex flex-col items-start justify-center w-full h-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </article>
    </Link>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20 mt-20">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-black">
        Account Abstraction Examples
      </h1>
    </header>
  );
}

function Footer() {
  return (
    <div className="flex flex-col items-center mt-20">
      React AA Sample
    </div>
  );
}

export default App;