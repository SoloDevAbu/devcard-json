import { DeveloperData } from '@/lib/types';

interface CardTemplateProps {
  data: DeveloperData;
}

export function MinimalTemplate({ data }: CardTemplateProps) {
  return (
    <div className="w-[600px] h-[400px] bg-white rounded-xl overflow-hidden shadow-2xl relative border border-gray-200">
      <div className="h-full flex flex-col justify-between p-10">
        <div>
          <div className="w-12 h-1 bg-black mb-8" />

          <h1 className="text-5xl font-bold text-black mb-3 tracking-tight leading-tight">
            {data.name}
          </h1>

          <p className="text-xl text-gray-600 mb-8 font-light">
            {data.title}
          </p>

          {data.techStack.length > 0 && (
            <div className="space-y-2">
              {data.techStack.slice(0, 4).map((tech, i) => (
                <div key={tech} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span className="text-gray-800 text-sm">{tech}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          {data.email && <div>{data.email}</div>}
          <div className="flex items-center gap-4">
            {data.github && <span>@{data.github}</span>}
            {data.twitter && <span>{data.twitter}</span>}
            {data.linkedin && <span>in/{data.linkedin}</span>}
          </div>
          {data.website && (
            <div className="text-gray-500">{data.website.replace('https://', '')}</div>
          )}
        </div>

        <div className="absolute top-8 right-8 w-2 h-2 bg-black rounded-full" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border border-gray-200 rounded-full -z-10" />
      </div>
    </div>
  );
}
