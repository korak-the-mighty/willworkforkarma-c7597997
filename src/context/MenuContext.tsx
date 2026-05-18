import { createContext, useContext, useState } from "react";

interface MenuContextValue {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export const MenuContext = createContext<MenuContextValue>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
