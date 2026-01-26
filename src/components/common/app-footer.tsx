import Link from "next/link";
import CookieBanner from "./CookieBanner/CookieBanner";

function AppFooter() {
  return (
    <footer className="border-t-[0.01rem] bg-background  sticky top-0 z-50 ">
      <div className="mx-auto flex flex-col md:flex-row gap-4 max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 uppercase text-sm ">
            let me give you the game
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* </div>
         <div className="lg:flex-1 text-left mx-auto"> */}
          <Link href="/legal" className="-m-1.5 p-1.5 uppercase text-sm ">
           Legal
          </Link>


        </div>
        <p className="text-sm">
          MARGINFOLD PRESS LTD
        </p>
      </div>
       <CookieBanner />
    </footer>
  );
}
export default AppFooter;
