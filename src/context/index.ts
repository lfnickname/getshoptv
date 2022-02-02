import { createContext, useContext } from "react";

export type AgreeContextType = {
    agreeStatus: boolean | null
    setAgreeStatus: (c: boolean) => void
}

export const AgreeContext = createContext<AgreeContextType>({agreeStatus: null, setAgreeStatus: ()=>{}})
export const useAgreeContext = () => useContext(AgreeContext)