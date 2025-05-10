
import React from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container-custom py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold gradient-text">
            Ikigai Life Plan
          </Link>
          <nav className="hidden sm:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/upload" className="text-gray-600 hover:text-primary transition-colors">
              Upload
            </Link>
            <Link to="/plan" className="text-gray-600 hover:text-primary transition-colors">
              Life Plan
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container-custom text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Ikigai Life Plan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
