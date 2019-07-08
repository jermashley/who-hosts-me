import React, { createContext, useState } from 'react'
import uuid from 'uuidv4'

const hostResultsContext = createContext()

const HostResultsContextProvider = props => {
  const [hostResults, setHostResults] = useState({})

  const addHostResults = (id, date, domain, results) => {
    setHostResults({
      id: id,
      createdAt: date,
      domain: domain,
      results: results,
    })
  }

  return (
    <hostResultsContext.Provider
      value={{
        hostResults,
        addHostResults,
      }}
    >
      {props.children}
    </hostResultsContext.Provider>
  )
}

export { hostResultsContext, HostResultsContextProvider }
