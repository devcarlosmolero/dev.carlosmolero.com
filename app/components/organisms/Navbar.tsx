import { Fragment, useState } from "react";
import { IComponentWithTranslation } from "~/types/components";
import Hamburger from "../molecules/Hamburguer";
import SocialIcons from "../molecules/SocialIcons";
import SidebarLayout from "../templates/SidebarLayout";

export default function Navbar({translation}:IComponentWithTranslation) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <nav className="fixed z-10 flex h-[80px] w-full items-center bg-white px-5 py-2 shadow md:hidden">
        <div className="w-full">
          <a href={"/"}>
            <img
              alt="Carlos Molero"
              className="h-[50px] w-[50px] rounded-full"
              src="/carlos-molero.png"
            />
          </a>
        </div>
        <div>
          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </nav>
      {isOpen && (
        <div className="fixed z-10 mt-[80px] h-[100vh] w-full space-y-5 bg-white px-5 md:hidden">
          <hr className="my-3 !border-[#E4E4E4]" />
          <SidebarLayout.BookButton translation={(translation as any)}/>
          <SidebarLayout.NavLinks translation={(translation as any)} />
          <hr className="mb-3 !border-[#E4E4E4]" />
          <SidebarLayout.Map />
          <SocialIcons />
        </div>
      )}
    </Fragment>
  );
}
