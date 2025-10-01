import { DeveloperData } from '@/lib/types';
import { Terminal } from 'lucide-react';

interface CardTemplateProps {
  data: DeveloperData;
}

export function MatrixTemplate({ data }: CardTemplateProps) {
  return (
    <div className="w-[600px] h-[400px] bg-black rounded-xl overflow-hidden shadow-2xl relative border border-[#00ff41]/30">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#00ff41_0px,transparent_1px,transparent_2px,#00ff41_3px)]" />
      </div>

      <div className="relative h-full flex flex-col p-8 font-mono">
        <div className="flex items-center gap-2 mb-6 text-[#00ff41]">
          <Terminal className="w-5 h-5" />
          <span className="text-xs">root@devcard:~$</span>
          <span className="animate-pulse">_</span>
        </div>

        <div className="space-y-3 mb-8">
          <div className="text-[#00ff41]">
            <span className="text-[#00ff41]/60">{'>'} </span>
            <span className="text-sm">whoami</span>
          </div>
          <div className="text-3xl font-bold text-[#00ff41] pl-4">
            {data.name}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="text-[#00ff41]">
            <span className="text-[#00ff41]/60">{'>'} </span>
            <span className="text-sm">cat role.txt</span>
          </div>
          <div className="text-xl text-[#00ff41]/90 pl-4">
            {data.title}
          </div>
        </div>

        {data.techStack.length > 0 && (
          <div className="space-y-3 mb-6">
            <div className="text-[#00ff41]">
              <span className="text-[#00ff41]/60">{'>'} </span>
              <span className="text-sm">ls skills/</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pl-4">
              {data.techStack.slice(0, 6).map((tech) => (
                <span key={tech} className="text-[#00ff41]/80 text-sm">
                  {tech}.sh
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto space-y-2">
          {data.email && (
            <div className="text-[#00ff41]/70 text-sm">
              <span className="text-[#00ff41]/50">email:</span> {data.email}
            </div>
          )}
          {data.github && (
            <div className="text-[#00ff41]/70 text-sm">
              <span className="text-[#00ff41]/50">github:</span> {data.github}
            </div>
          )}
          {data.twitter && (
            <div className="text-[#00ff41]/70 text-sm">
              <span className="text-[#00ff41]/50">twitter:</span> {data.twitter}
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-4 text-[#00ff41]/40 text-xs">
          [SYSTEM READY]
        </div>
      </div>
    </div>
  );
}
