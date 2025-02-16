import LogoGlobe from "~/assets/logo-globe.svg?react";
import LogoBookmark from "~/assets/logo-bookmark.svg?react";
import LogoAccount from "~/assets/logo-account.svg?react";
import LogoPoof from "~/assets/logo-poof.svg?react";
import { useContext, useState } from "react";
import Signin from "./Signin";
import { Context } from "~/context";
import { Link } from "react-router";

export default function Navbar() {
  const [showSignin, setShowSignin] = useState(false);
  const { state } = useContext(Context);
  // TODO: poof keyboard shortcut
  return (
    <nav className="flex justify-between items-center p-3 px-6 bg-nav text-white font-semibold text-xl">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="flex gap-2 text-[18px] items-center hover:brightness-80"
        >
          <LogoPoof />
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <Link
          to="/"
          className="flex gap-2 text-[18px] items-center hover:brightness-80"
        >
          <LogoGlobe className="text-white" />
          Deep Research
        </Link>
        <Link
          to="/my"
          className="flex gap-2 text-[18px] items-center hover:brightness-80"
        >
          <LogoBookmark className="text-white" />
          My Courses
        </Link>
        <button
          onClick={() => {
            console.log("yo");
            setShowSignin(true);
          }}
          className="flex gap-2 text-[18px] items-center hover:cursor-pointer hover:brightness-80"
        >
          <LogoAccount />
          Hello, {state.userId}!
        </button>
      </div>
      {showSignin && <Signin onClose={() => setShowSignin(false)} />}
    </nav>
  );
}
