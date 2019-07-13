import React, { createContext, useState, useEffect } from 'react'

const hostResultsContext = createContext({})

const HostResultsContextProvider = props => {
  const [hostResults, setHostResults] = useState({
    id: null,
    createdAt: null,
    domain: null,
    results: [],
    favicon: null,
  })
  const [resultsHistory, setResultsHistory] = useState(null)
  const [hasResults, setHasResults] = useState(false)

  const updateResultsHistory = results => {
    setResultsHistory(results)
  }

  const toggleHasResults = () => setHasResults(!hasResults)

  return (
    <hostResultsContext.Provider
      value={{
        hostResults,
        setHostResults,
        hasResults,
        toggleHasResults,
        resultsHistory,
        updateResultsHistory,
      }}
    >
      {props.children}
    </hostResultsContext.Provider>
  )
}

export { hostResultsContext, HostResultsContextProvider }
