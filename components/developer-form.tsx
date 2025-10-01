'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { DeveloperData } from '@/lib/types';

interface DeveloperFormProps {
  onSubmit: (data: DeveloperData) => void;
}

export function DeveloperForm({ onSubmit }: DeveloperFormProps) {
  const [formData, setFormData] = useState<DeveloperData>({
    name: '',
    title: '',
    email: '',
    github: '',
    twitter: '',
    linkedin: '',
    website: '',
    techStack: [],
  });

  const [techInput, setTechInput] = useState('');

  const handleAddTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.title) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Information</h2>
        <p className="text-muted-foreground">
          Fill in your details to create your developer card
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            required
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="title" className="text-sm font-medium">
            Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Full Stack Developer"
            required
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="github" className="text-sm font-medium">
            GitHub Username
          </Label>
          <Input
            id="github"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            placeholder="johndoe"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="twitter" className="text-sm font-medium">
            Twitter/X Username
          </Label>
          <Input
            id="twitter"
            value={formData.twitter}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            placeholder="@johndoe"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="linkedin" className="text-sm font-medium">
            LinkedIn Username
          </Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            placeholder="johndoe"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="website" className="text-sm font-medium">
            Website URL
          </Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://johndoe.dev"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="tech" className="text-sm font-medium">
            Tech Stack
          </Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              id="tech"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTech();
                }
              }}
              placeholder="React, Node.js, TypeScript..."
            />
            <Button type="button" onClick={handleAddTech} variant="secondary">
              Add
            </Button>
          </div>
          {formData.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="pl-3 pr-2 py-1.5">
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Continue to Templates
      </Button>
    </form>
  );
}
