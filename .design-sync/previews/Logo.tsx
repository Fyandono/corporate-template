import { Logo } from 'corporate-template-ui';

export const OnLight = () => (
  <div className="bg-white p-6 text-primary-900">
    <Logo name="Nama Perusahaan" />
  </div>
);

export const OnDark = () => (
  <div className="bg-primary-950 p-6 text-white">
    <Logo name="Nama Perusahaan" />
  </div>
);
