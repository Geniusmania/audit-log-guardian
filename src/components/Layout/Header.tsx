
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8 animate-fade-in">
      {subtitle && (
        <div className="inline-block px-3 py-1 mb-2 text-xs font-medium tracking-wider text-primary-foreground bg-primary/90 rounded-full uppercase">
          {subtitle}
        </div>
      )}
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h1>
    </header>
  );
};

export default Header;
