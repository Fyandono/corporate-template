import { LeaderMessage } from 'corporate-template-ui';

const photo = {
  src: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><rect width="600" height="800" fill="#d4d4d4"/><circle cx="300" cy="300" r="120" fill="#a3a3a3"/><path d="M90 800c0-150 94-260 210-260s210 110 210 260z" fill="#a3a3a3"/></svg>`,
  )}`,
  alt: 'Nama Direktur Utama',
  width: 600,
  height: 800,
};

export const Default = () => (
  <div className="p-8">
    <LeaderMessage
      eyebrow="Sambutan Direktur Utama"
      quote="Amanah kami bukan sekadar mengelola aset negara, melainkan memastikan setiap rupiah yang dipercayakan kembali kepada masyarakat sebagai layanan yang lebih baik."
      name="Nama Direktur Utama"
      position="Direktur Utama"
      photo={photo}
    />
  </div>
);
