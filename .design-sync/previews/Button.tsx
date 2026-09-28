import { Button } from 'corporate-template-ui';

export const Primary = () => <Button href="#">Hubungi Kami</Button>;

export const Secondary = () => (
  <Button href="#" variant="secondary">
    Selengkapnya
  </Button>
);

export const OnDarkBackground = () => (
  <div className="flex flex-wrap gap-4 bg-primary-950 p-8">
    <Button href="#" variant="accent">
      Tentang Kami
    </Button>
    <Button href="#" variant="ghost-light">
      Lini Bisnis
    </Button>
  </div>
);
