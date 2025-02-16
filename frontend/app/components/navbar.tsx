import LogoGlobe from "~/assets/logo-globe.svg?react";
import LogoBookmark from "~/assets/logo-bookmark.svg?react";
import LogoAccount from "~/assets/logo-account.svg?react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-3 px-6 bg-nav text-white font-semibold text-xl">
      <div className="flex items-center gap-2">
        <LogoGlobe />
        <p>Poof</p>
      </div>
      <div className="flex items-center gap-10">
        <a
          href="/my"
          className="flex gap-2 text-[18px] items-center hover:brightness-80"
        >
          <LogoBookmark className="text-white" />
          My courses
        </a>
        <button className="flex gap-2 text-[18px] items-center">
          <LogoAccount />
          Hello, Eggy!
        </button>
      </div>
    </nav>
  );
}
