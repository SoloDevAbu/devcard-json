'use client';

import { useState } from 'react';
import { DeveloperForm } from '@/components/developer-form';
import { TemplateSelector } from '@/components/template-selector';
import { CardPreview } from '@/components/card-preview';
import { Header } from '@/components/header';
import { LoadingOverlay } from '@/components/loading-overlay';
import { DeveloperData, CardTheme } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'form' | 'template' | 'preview';

export default function Home() {
  const [step, setStep] = useState<Step>('form');
  const [developerData, setDeveloperData] = useState<DeveloperData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<CardTheme | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: DeveloperData) => {
    setDeveloperData(data);
    setStep('template');
  };

  const handleTemplateSelect = async (theme: CardTheme) => {
    setSelectedTheme(theme);
    setIsLoading(true);
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsLoading(false);
    setStep('preview');
  };

  const handleBack = () => {
    setStep('template');
  };

  const handleStartOver = () => {
    setStep('form');
    setDeveloperData(null);
    setSelectedTheme(undefined);
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      {isLoading && <LoadingOverlay />}
      <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Create Stunning Developer Cards
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Showcase your skills and profile with beautiful, customizable developer cards
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-2">
                <StepIndicator
                  number={1}
                  label="Details"
                  isActive={step === 'form'}
                  isCompleted={step !== 'form'}
                />
                <div className="w-12 md:w-20 h-px bg-border" />
                <StepIndicator
                  number={2}
                  label="Template"
                  isActive={step === 'template'}
                  isCompleted={step === 'preview'}
                />
                <div className="w-12 md:w-20 h-px bg-border" />
                <StepIndicator
                  number={3}
                  label="Download"
                  isActive={step === 'preview'}
                  isCompleted={false}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-lg border shadow-lg p-8"
            >
              <AnimatePresence mode="wait">
                {step === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DeveloperForm onSubmit={handleFormSubmit} />
                  </motion.div>
                )}
                {step === 'template' && (
                  <motion.div
                    key="template"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TemplateSelector
                      onSelect={handleTemplateSelect}
                      selectedTheme={selectedTheme}
                      onBack={handleStartOver}
                      isLoading={isLoading}
                    />
                  </motion.div>
                )}
                {step === 'preview' && developerData && selectedTheme && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardPreview
                      data={developerData}
                      theme={selectedTheme}
                      onBack={handleBack}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center text-sm text-muted-foreground"
            >
              <p>Made with ❤️ for developers, by developers</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

interface StepIndicatorProps {
  number: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

function StepIndicator({ number, label, isActive, isCompleted }: StepIndicatorProps) {
  return (
    <div
      className={`flex items-center gap-2 transition-colors ${
        isActive ? 'text-primary' : isCompleted ? 'text-primary/60' : 'text-muted-foreground'
      }`}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
        }}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
            : isCompleted
            ? 'bg-primary/20 text-primary'
            : 'bg-muted'
        }`}
      >
        {number}
      </motion.div>
      <span className="hidden sm:inline text-sm font-medium">{label}</span>
    </div>
  );
}
