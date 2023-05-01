import { createContext, useContext, useState, ReactNode } from "react";

type SideNavContextType = {
    sideNavVisible: boolean;
    setSideNavVisible: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

const SideNavContext = createContext<SideNavContextType>({
    sideNavVisible: false,
    setSideNavVisible: () => { },
});

type SideNavProviderProps = {
    children: ReactNode;
};

export const SideNavProvider: React.FC<SideNavProviderProps> = ({ children }) => {
    const [sideNavVisible, setSideNavVisible] = useState(false);

    return (
        <SideNavContext.Provider value={{ sideNavVisible, setSideNavVisible }}>
            {children}
        </SideNavContext.Provider>
    );
};

export const useSideNav = () => useContext(SideNavContext);
