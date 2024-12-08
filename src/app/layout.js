import '@/styles/Typography.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>AppScrip Test</title>
      <body >
        {children}
      </body>
    </html>
  );
}
