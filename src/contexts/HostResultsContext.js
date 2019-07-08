import React, { createContext, useState } from 'react'
import uuid from 'uuidv4'

const hostResultsContext = createContext({})

const HostResultsContextProvider = props => {
  const [hostResults, setHostResults] = useState({})
  const [hasResults, setHasResults] = useState(false)

  const addHostResults = (id, date, domain, results) => {
    setHostResults({
      id: id,
      createdAt: date,
      domain: domain,
      results: results,
    })
  }

  const toggleHasResults = () => setHasResults(!hasResults)

  return (
    <hostResultsContext.Provider
      value={{
        hostResults,
        addHostResults,
        hasResults,
        toggleHasResults,
      }}
    >
      {props.children}
    </hostResultsContext.Provider>
  )
}

export { hostResultsContext, HostResultsContextProvider }
