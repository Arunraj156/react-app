import { createContext, useState, useEffect } from "react";

const DataContext = createContext({})

export const DataProvider = (children) => {      // decides for which components we have to send the data
 

  return (
    <DataContext.Provider value={{
      
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext