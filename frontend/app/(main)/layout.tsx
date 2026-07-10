import Footer from "@/components/layout/Footer";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}

      <Footer />
    </>
  );
}
