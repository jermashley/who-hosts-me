import React, { createContext, useState, useEffect } from 'react'
import uuid from 'uuidv4'

const hostResultsContext = createContext({})

const HostResultsContextProvider = props => {
  const [hostResults, setHostResults] = useState({})
  const [resultsHistory, setResultsHistory] = useState(null)
  const [hasResults, setHasResults] = useState(false)

  useEffect(() => {
    setResultsHistory(JSON.parse(localStorage.getItem(`results`)))
  }, [])

  const addHostResults = (id, date, domain, results) => {
    setHostResults({
      id: id,
      createdAt: date,
      domain: domain,
      results: results,
    })
  }

  const updateResultsHistory = results => {
    setResultsHistory(results)
  }

  const toggleHasResults = () => setHasResults(!hasResults)

  return (
    <hostResultsContext.Provider
      value={{
        hostResults,
        addHostResults,
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
