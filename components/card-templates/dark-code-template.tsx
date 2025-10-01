import { DeveloperData } from '@/lib/types';

interface CardTemplateProps {
  data: DeveloperData;
}

export function DarkCodeTemplate({ data }: CardTemplateProps) {
  const jsonData = {
    name: data.name,
    title: data.title,
    ...(data.email && { email: data.email }),
    ...(data.twitter && { x: data.twitter }),
    ...(data.github && { github: data.github }),
    ...(data.linkedin && { linkedin: data.linkedin }),
    ...(data.website && { website: data.website }),
    ...(data.techStack.length > 0 && { techStack: data.techStack }),
  };

  const lines = JSON.stringify(jsonData, null, 2).split('\n');

  return (
    <div className="w-[600px] h-[400px] bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl font-mono">
      <div className="bg-[#323233] px-4 py-3 flex items-center justify-between border-b border-[#454545]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[#cccccc] text-sm ml-2">DevCard.json</span>
        </div>
        <div className="flex gap-3 text-[#cccccc]">
          <div className="w-4 h-4 border border-[#cccccc] rounded-sm" />
          <div className="text-xs">•••</div>
        </div>
      </div>

      <div className="flex">
        <div className="bg-[#1e1e1e] px-4 py-4 text-[#858585] text-sm border-r border-[#454545] text-right min-w-[50px]">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div className="flex-1 px-4 py-4 text-sm leading-relaxed overflow-auto">
          {lines.map((line, i) => {
            const keyMatch = line.match(/"([^"]+)":/);
            const stringMatch = line.match(/: "([^"]+)"/);

            return (
              <div key={i}>
                {keyMatch ? (
                  <>
                    <span className="text-[#9cdcfe]">
                      "{keyMatch[1]}"
                    </span>
                    <span className="text-[#cccccc]">:</span>
                    {stringMatch ? (
                      <>
                        <span className="text-[#cccccc]"> </span>
                        <span className="text-[#ce9178]">
                          "{stringMatch[1]}"
                        </span>
                        {line.includes(',') && <span className="text-[#cccccc]">,</span>}
                      </>
                    ) : line.includes('[') ? (
                      <span className="text-[#cccccc]"> [</span>
                    ) : null}
                  </>
                ) : line.includes('{') ? (
                  <span className="text-[#cccccc]">{'{'}</span>
                ) : line.includes('}') ? (
                  <span className="text-[#cccccc]">
                    {'}'}
                    {line.includes(',') && ','}
                  </span>
                ) : line.includes(']') ? (
                  <span className="text-[#cccccc]">
                    {']'}
                    {line.includes(',') && ','}
                  </span>
                ) : line.trim().startsWith('"') ? (
                  <>
                    <span className="text-[#ce9178]">{line.trim()}</span>
                  </>
                ) : (
                  <span className="text-[#cccccc]">{line}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
