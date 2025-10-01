'use client';

import { useState } from 'react';
import { DeveloperForm } from '@/components/developer-form';
import { TemplateSelector } from '@/components/template-selector';
import { CardPreview } from '@/components/card-preview';
import { DeveloperData, CardTheme } from '@/lib/types';
import { Code as Code2 } from 'lucide-react';

type Step = 'form' | 'template' | 'preview';

export default function Home() {
  const [step, setStep] = useState<Step>('form');
  const [developerData, setDeveloperData] = useState<DeveloperData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<CardTheme | undefined>();

  const handleFormSubmit = (data: DeveloperData) => {
    setDeveloperData(data);
    setStep('template');
  };

  const handleTemplateSelect = (theme: CardTheme) => {
    setSelectedTheme(theme);
    setStep('preview');
  };

  const handleBack = () => {
    setStep('template');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code2 className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                DevCard Generator
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create stunning developer cards to showcase your skills and profile
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-2">
              <div
                className={`flex items-center gap-2 ${
                  step === 'form' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === 'form'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  1
                </div>
                <span className="hidden sm:inline text-sm font-medium">Details</span>
              </div>
              <div className="w-12 md:w-20 h-px bg-border" />
              <div
                className={`flex items-center gap-2 ${
                  step === 'template' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === 'template'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  2
                </div>
                <span className="hidden sm:inline text-sm font-medium">Template</span>
              </div>
              <div className="w-12 md:w-20 h-px bg-border" />
              <div
                className={`flex items-center gap-2 ${
                  step === 'preview' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === 'preview'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  3
                </div>
                <span className="hidden sm:inline text-sm font-medium">Download</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-8 shadow-sm">
            {step === 'form' && <DeveloperForm onSubmit={handleFormSubmit} />}
            {step === 'template' && (
              <TemplateSelector
                onSelect={handleTemplateSelect}
                selectedTheme={selectedTheme}
              />
            )}
            {step === 'preview' && developerData && selectedTheme && (
              <CardPreview
                data={developerData}
                theme={selectedTheme}
                onBack={handleBack}
              />
            )}
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Made for developers, by developers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
