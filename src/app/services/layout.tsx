import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Excorto Builders & Interiors',
  description: 'Explore our architectural planning, bespoke interior design, and precision turnkey installation services in Thiruvananthapuram, Kerala.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      {children}
    </div>
  );
}
