import { DeveloperData } from '@/lib/types';
import { Github, Twitter, Linkedin, Globe, Mail } from 'lucide-react';

interface CardTemplateProps {
  data: DeveloperData;
}

export function OceanTemplate({ data }: CardTemplateProps) {
  return (
    <div className="w-[600px] h-[400px] bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] rounded-xl overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.1),transparent_50%)]" />

      <div className="relative h-full flex flex-col justify-between p-8">
        <div>
          <div className="inline-block px-3 py-1 bg-[#64ffda]/10 border border-[#64ffda]/30 rounded text-[#64ffda] text-xs font-mono mb-4">
            DEVELOPER
          </div>

          <h1 className="text-4xl font-bold text-[#ccd6f6] mb-2 tracking-tight">
            {data.name}
          </h1>

          <p className="text-xl text-[#64ffda] font-mono mb-6">
            {data.title}
          </p>

          {data.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {data.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#112240] border border-[#233554] rounded-md text-[#8892b0] text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {data.email && (
            <div className="flex items-center gap-3 text-[#8892b0]">
              <Mail className="w-4 h-4 text-[#64ffda]" />
              <span className="text-sm font-mono">{data.email}</span>
            </div>
          )}

          <div className="flex items-center gap-4 text-[#8892b0]">
            {data.github && (
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-[#64ffda]" />
                <span className="text-sm font-mono">{data.github}</span>
              </div>
            )}
            {data.twitter && (
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-[#64ffda]" />
                <span className="text-sm font-mono">{data.twitter}</span>
              </div>
            )}
            {data.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#64ffda]" />
                <span className="text-sm font-mono">{data.linkedin}</span>
              </div>
            )}
            {data.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#64ffda]" />
                <span className="text-sm font-mono">{data.website.replace('https://', '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-6 right-6 w-32 h-32 rounded-full bg-[#64ffda]/5 blur-3xl" />
      </div>
    </div>
  );
}
