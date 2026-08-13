export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-dashed border-primary/30 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto gap-4">
        <div className="font-display text-headline-md text-primary">
          Hacker House Goa 2026
        </div>
        <div className="font-body text-body-md text-on-surface-variant text-center">
          © 2026 Hacker House Goa. Built for the world, in the sun.
        </div>
        <ul className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((label) => (
            <li key={label}>
              <a
                href="#"
                className="font-label text-label-caps text-outline hover:text-primary transition-colors uppercase tracking-widest"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
