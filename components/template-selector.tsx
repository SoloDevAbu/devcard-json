'use client';

import { useState } from 'react';
import { CardTheme, CardTemplate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (theme: CardTheme) => void;
  selectedTheme?: CardTheme;
  onBack?: () => void;
  isLoading?: boolean;
}

const templates: CardTemplate[] = [
  {
    id: 'dark-code',
    name: 'Dark Code',
    description: 'VS Code inspired dark theme with JSON format',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Navy blue gradient with teal accents',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm gradient with vibrant colors',
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'Terminal-style with green text on black',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean black and white design',
  },
];

export function TemplateSelector({ onSelect, selectedTheme, onBack, isLoading = false }: TemplateSelectorProps) {
  const handleTemplateSelect = (theme: CardTheme) => {
    if (!isLoading) {
      onSelect(theme);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-muted-foreground">
          Select a design that matches your style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-6 transition-all ${
              isLoading
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:shadow-lg hover:border-primary/50'
            } ${
              selectedTheme === template.id
                ? 'ring-2 ring-primary'
                : ''
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                {isLoading && selectedTheme === template.id && (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {onBack && (
        <div className="flex justify-center pt-4">
          <Button onClick={onBack} variant="ghost" disabled={isLoading}>
            Back to Details
          </Button>
        </div>
      )}
    </div>
  );
}
