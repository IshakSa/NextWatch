import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function TosPage() {
  return (
    <main className="w-full h-screen p-4">
      <iframe
        src="/terms-of-service-content.html"
        className="w-full mt-25 rounded-md h-screen border-0"
        title="Terms of Service"
      />
    </main>
  );
}
