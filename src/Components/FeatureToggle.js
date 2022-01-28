import React, {createContext, useContext} from "react";
import { useFlag } from '@unleash/proxy-client-react';

const FeatureFlagsContext = createContext();

const useFeatureFlagsContext = () => {
    const context = useContext(FeatureFlagsContext);
    if (!context) {
        throw new Error("No context found for feature Flags");
    }
    return context;
}

const FeatureFlag = ({ children, flagName }) => {
    //getting the falg status from unleash proxy
    const flag = useFlag(flagName);
    const value = {flag};
    return (
        <FeatureFlagsContext.Provider value={value}>
            {children}
        </FeatureFlagsContext.Provider>
    );
}

const On = ({ children }) => {
    const { flag } = useFeatureFlagsContext();
    return (
        <>
            {flag  && children}
        </>
    );
}

const Off = ({ children }) => {
    const { flag } = useFeatureFlagsContext();
    return (
        <>
            {!flag && children}
        </>
    );
}

export { FeatureFlag, On, Off };
