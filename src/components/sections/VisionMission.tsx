import Eyebrow from '../ui/Eyebrow';
import Section from '../ui/Section';

export type VisionMissionProps = {
  visionTitle: string;
  vision: string;
  missionTitle: string;
  mission: string[];
};

/** Section gelap: pernyataan visi besar di kiri, daftar misi bernomor di kanan. */
export default function VisionMission({
  visionTitle,
  vision,
  missionTitle,
  mission,
}: VisionMissionProps) {
  return (
    <Section
      tone="dark"
      spacing="compact"
      labelledBy="vision-title"
      containerClassName="grid gap-16 lg:grid-cols-2"
    >
      <div data-reveal>
        <Eyebrow as="h2" id="vision-title" tone="dark">
          {visionTitle}
        </Eyebrow>
        <p className="mt-6 text-statement font-medium text-white">{vision}</p>
      </div>
      <div data-reveal>
        <Eyebrow as="h2" tone="dark">
          {missionTitle}
        </Eyebrow>
        <ol className="mt-6 space-y-6">
          {mission.map((item, i) => (
            <li key={item} className="flex gap-5 border-t border-white/15 pt-6">
              <span className="text-small font-semibold text-accent-400" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-body-lg leading-relaxed text-primary-100">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
