import logo from "@/assets/chs-logo-new.png";

const Footer = () => (
  <footer className="py-8 px-6 bg-navy border-t border-primary-foreground/10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <img src={logo} alt="CHS Media & Digital Solutions" className="h-7 md:h-9" />
      <p className="text-primary-foreground/50 text-sm font-body">
        © {new Date().getFullYear()} CHS Media & Digital Solutions. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
