'use client';

import { useRef, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { DeveloperData, CardTheme } from '@/lib/types';
import { DarkCodeTemplate } from './card-templates/dark-code-template';
import { OceanTemplate } from './card-templates/ocean-template';
import { SunsetTemplate } from './card-templates/sunset-template';
import { MatrixTemplate } from './card-templates/matrix-template';
import { MinimalTemplate } from './card-templates/minimal-template';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface CardPreviewProps {
  data: DeveloperData;
  theme: CardTheme;
  onBack: () => void;
  cardId?: string;
}

export function CardPreview({ data, theme, onBack, cardId }: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

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

  const checkDownloadPermission = async () => {
    if (!cardId) {
      // If no cardId, allow download (backward compatibility)
      return true;
    }

    try {
      const response = await fetch('/api/cards/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardId }),
      });

      const result = await response.json();
      setDownloadCount(result.totalDownloads);

      if (result.requiresAuth) {
        setShowAuthDialog(true);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking download permission:', error);
      return true; // Allow download on error
    }
  };

  const downloadAsPNG = async () => {
    const canDownload = await checkDownloadPermission();
    if (!canDownload) return;

    setIsDownloading(true);
    try {
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false,
        });
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-devcard.png`;
        link.href = url;
        link.click();
        toast.success('Card downloaded successfully!');
      }
    } catch (error) {
      console.error('Error downloading card:', error);
      toast.error('Failed to download card');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsJSON = async () => {
    const canDownload = await checkDownloadPermission();
    if (!canDownload) return;

    try {
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
      toast.success('Data downloaded successfully!');
    } catch (error) {
      console.error('Error downloading JSON:', error);
      toast.error('Failed to download data');
    }
  };

  const downloadAsSVG = async () => {
    const canDownload = await checkDownloadPermission();
    if (!canDownload) return;

    try {
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
        toast.success('Card downloaded successfully!');
      }
    } catch (error) {
      console.error('Error downloading SVG:', error);
      toast.error('Failed to download card');
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Your Dev Card</h2>
          <p className="text-muted-foreground">
            Preview your card and download in your preferred format
          </p>
          {!session && downloadCount === 0 && (
            <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
              💡 Sign in to download unlimited cards!
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <div ref={cardRef} className="inline-block">
            {renderTemplate()}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={downloadAsPNG} 
            size="lg" 
            className="gap-2"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Download PNG
          </Button>
          <Button 
            onClick={downloadAsSVG} 
            size="lg" 
            variant="secondary" 
            className="gap-2"
            disabled={isDownloading}
          >
            <Download className="w-4 h-4" />
            Download SVG
          </Button>
          <Button 
            onClick={downloadAsJSON} 
            size="lg" 
            variant="outline" 
            className="gap-2"
            disabled={isDownloading}
          >
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

      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign in to continue</AlertDialogTitle>
            <AlertDialogDescription>
              You&apos;ve reached the free download limit. Sign in with Google to download unlimited cards and save your creations!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => signIn('google')}>
              Sign in with Google
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
