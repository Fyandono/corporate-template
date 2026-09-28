import Button from '../ui/Button';
import Container from '../ui/Container';
import NusantaraPattern from '../ui/NusantaraPattern';

export type CtaBandProps = {
  title: string;
  body: string;
  action: { label: string; href: string };
};

export default function CtaBand({ title, body, action }: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-50">
      <NusantaraPattern tone="light" fade="right" />
      <Container className="py-28 md:py-40">
        <div className="grid gap-10 border-t border-neutral-300 pt-12 lg:grid-cols-12" data-reveal>
          <h2 className="text-headline font-light lg:col-span-7">{title}</h2>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-lead text-neutral-600">{body}</p>
            <Button href={action.href} className="mt-8">
              {action.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
