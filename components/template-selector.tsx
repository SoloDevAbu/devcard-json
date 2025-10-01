'use client';

import { CardTheme, CardTemplate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TemplateSelectorProps {
  onSelect: (theme: CardTheme) => void;
  selectedTheme?: CardTheme;
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

export function TemplateSelector({ onSelect, selectedTheme }: TemplateSelectorProps) {
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
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedTheme === template.id
                ? 'ring-2 ring-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelect(template.id)}
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
