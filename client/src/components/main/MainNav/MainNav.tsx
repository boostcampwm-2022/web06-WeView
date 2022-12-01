import React from "react";

import NavHeader from "@/components/main/MainNav/NavHeader/NavHeader";
import NavMenus from "@/components/main/MainNav/NavMenus/NavMenus";
import NavFooter from "@/components/main/MainNav/NavFooter/NavFooter";
import useNavStore from "@/store/useNavStore";
import NavContent from "@/components/main/MainNav/NavContent/NavContent";

import "./MainNav.scss";

const MainNav = (): JSX.Element => {
  const [isOpened] = useNavStore((state) => [state.isOpened]);

  return (
    <div className={`nav ${isOpened ? "opened" : "closed"}`}>
      <nav className="nav__sidebar">
        <NavHeader />
        <NavMenus />
        <NavFooter />
      </nav>
      <NavContent />
    </div>
  );
};

export default MainNav;
