import React, { createContext } from 'react'
import uuid from 'uuidv4'

const LocalStorageContext = createContext({})

const LocalStorageContextProvider = props => {
  const existsInLocalStorage = key => {
    let doesExistsInLocalStorage = localStorage.getItem(key) !== null

    return doesExistsInLocalStorage
  }

  const getLocalStorageItem = key => {
    return JSON.parse(localStorage.getItem(key))
  }

  const addLocalStorageItem = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }

  const updateHostResultsInLocalStorage = obj => {
    let hostResults = {
      ...obj,
    }

    let resultsStorage

    // If local storage has results entry
    if (existsInLocalStorage(`results`)) {
      // Set currently stored array of results
      resultsStorage = getLocalStorageItem(`results`)

      // Push new results to currently stored array of results
      resultsStorage = [...resultsStorage, hostResults]
    } else {
      resultsStorage = [hostResults]
    }

    addLocalStorageItem(`results`, resultsStorage)
  }

  return (
    <LocalStorageContext.Provider
      value={{
        existsInLocalStorage,
        getLocalStorageItem,
        addLocalStorageItem,
        updateHostResultsInLocalStorage,
      }}
    >
      {props.children}
    </LocalStorageContext.Provider>
  )
}

export { LocalStorageContext, LocalStorageContextProvider }
