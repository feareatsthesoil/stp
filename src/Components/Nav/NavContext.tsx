import { createContext, useContext, useState, ReactNode, useEffect } from "react";

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

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth > 575) {
            setSideNavVisible(true);
        }
    }, []);

    return (
        <SideNavContext.Provider value={{ sideNavVisible, setSideNavVisible }}>
            {children}
        </SideNavContext.Provider>
    );
};

export const useSideNav = () => useContext(SideNavContext);
