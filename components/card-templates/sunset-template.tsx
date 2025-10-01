import { DeveloperData } from '@/lib/types';
import { Code as Code2 } from 'lucide-react';

interface CardTemplateProps {
  data: DeveloperData;
}

export function SunsetTemplate({ data }: CardTemplateProps) {
  return (
    <div className="w-[600px] h-[400px] bg-gradient-to-br from-[#ff6b6b] via-[#ee5a6f] to-[#c44569] rounded-xl overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd93d]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6bcf7f]/20 rounded-full blur-3xl" />

      <div className="relative h-full flex flex-col justify-between p-8 text-white">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-wider uppercase opacity-90">
              Developer
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-3 tracking-tight">
            {data.name}
          </h1>

          <p className="text-2xl font-light mb-8 opacity-95">
            {data.title}
          </p>

          {data.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.techStack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          {data.email && (
            <div className="text-sm opacity-90">{data.email}</div>
          )}
          <div className="flex items-center gap-4 text-sm opacity-90">
            {data.github && <span>github.com/{data.github}</span>}
            {data.twitter && <span>{data.twitter}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
