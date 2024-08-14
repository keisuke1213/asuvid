"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type Info = {
  id: number;
  name: string;
  date: string;
  deadline: string;
  formUrl: string;
};

type InfoContextType = {
  selectedInfo: Info | null;
  setSelectedInfo: (info: Info | null) => void;
};

const InfoContext = createContext<InfoContextType | undefined>(undefined);


export const InfoProvider = ({ children }: { children: ReactNode }) => {
  const [selectedInfo, setSelectedInfo] = useState<Info | null>(null);

  return (
    <InfoContext.Provider value={{ selectedInfo, setSelectedInfo }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfoContext = () => {
  const context = useContext(InfoContext);
  if (!context) {
    throw new Error("useInfoContext must be used within an InfoProvider");
  }
  return context;
};