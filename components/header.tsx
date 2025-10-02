'use client';

import { Code2 } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="w-8 h-8" />
            <span className="text-xl font-bold">DevCard Generator</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
