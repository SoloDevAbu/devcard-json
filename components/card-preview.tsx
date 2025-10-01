'use client';

import { useRef } from 'react';
import { DeveloperData, CardTheme } from '@/lib/types';
import { DarkCodeTemplate } from './card-templates/dark-code-template';
import { OceanTemplate } from './card-templates/ocean-template';
import { SunsetTemplate } from './card-templates/sunset-template';
import { MatrixTemplate } from './card-templates/matrix-template';
import { MinimalTemplate } from './card-templates/minimal-template';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CardPreviewProps {
  data: DeveloperData;
  theme: CardTheme;
  onBack: () => void;
}

export function CardPreview({ data, theme, onBack }: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (theme) {
      case 'dark-code':
        return <DarkCodeTemplate data={data} />;
      case 'ocean':
        return <OceanTemplate data={data} />;
      case 'sunset':
        return <SunsetTemplate data={data} />;
      case 'matrix':
        return <MatrixTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      default:
        return <DarkCodeTemplate data={data} />;
    }
  };

  const downloadAsPNG = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-devcard.png`;
      link.href = url;
      link.click();
    }
  };

  const downloadAsJSON = () => {
    const jsonData = {
      name: data.name,
      title: data.title,
      email: data.email,
      github: data.github,
      twitter: data.twitter,
      linkedin: data.linkedin,
      website: data.website,
      techStack: data.techStack,
    };
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-devcard.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsSVG = async () => {
    if (cardRef.current) {
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${cardRef.current.innerHTML}
            </div>
          </foreignObject>
        </svg>
      `;
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-devcard.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Dev Card</h2>
        <p className="text-muted-foreground">
          Preview your card and download in your preferred format
        </p>
      </div>

      <div className="flex justify-center">
        <div ref={cardRef} className="inline-block">
          {renderTemplate()}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={downloadAsPNG} size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          Download PNG
        </Button>
        <Button onClick={downloadAsSVG} size="lg" variant="secondary" className="gap-2">
          <Download className="w-4 h-4" />
          Download SVG
        </Button>
        <Button onClick={downloadAsJSON} size="lg" variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download JSON
        </Button>
      </div>

      <div className="flex justify-center">
        <Button onClick={onBack} variant="ghost">
          Back to Templates
        </Button>
      </div>
    </div>
  );
}
