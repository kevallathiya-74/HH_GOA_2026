export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-dashed border-primary/30 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto gap-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="HH Goa Logo"
            className="w-8 h-8 rounded-full object-cover border border-primary/30"
          />
          <span className="font-display text-headline-md text-primary font-bold">
            Hacker House Goa 2026
          </span>
        </div>
        <div className="font-body text-body-md text-on-surface-variant text-center">
          © 2026 Hacker House Goa.
        </div>
      </div>
    </footer>
  );
}
