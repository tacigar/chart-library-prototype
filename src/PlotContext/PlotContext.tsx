import React, { useContext } from 'react';

export interface PlotContextType {
  width: number;
  height: number;
  margin: {
    top: number;
    bottom: number;
    right: number;
    left: number;
  };
}

export const PlotContext = React.createContext<PlotContextType | undefined>(
  undefined
);

export const usePlotContext = () => {
  const ctx = useContext(PlotContext);
  if (!ctx) {
    throw new Error('No context value was passed');
  }
  return ctx;
};

export const PlotContextProvider = PlotContext.Provider;
