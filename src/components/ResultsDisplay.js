import React, { useContext, useEffect } from 'react'
import { hostResultsContext } from '../contexts/HostResultsContext'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const ResultsDisplay = () => {
  const { hostResults, updateResultsHistory, hasResults } = useContext(
    hostResultsContext
  )
  const { updateHostResultsInLocalStorage, getLocalStorageItem } = useContext(
    LocalStorageContext
  )

  useEffect(() => {
    updateResultsHistory(getLocalStorageItem(`results`))
  }, [])

  const handleClick = obj => {
    updateHostResultsInLocalStorage(obj)
    updateResultsHistory(getLocalStorageItem(`results`))
  }

  return (
    <>
      {hasResults ? (
        <>
          <h2>{hostResults.domain}</h2>
          <div>
            {hostResults.results.map(result => (
              <ul key={result.ip}>
                <li>IP: {result.ip}</li>
                <li>ISP ID: {result.isp_id}</li>
                <li>ISP Name: {result.isp_name}</li>
                <li>Type: {result.type}</li>
              </ul>
            ))}
          </div>

          <button onClick={() => handleClick(hostResults)}>Save Result</button>
        </>
      ) : null}
    </>
  )
}

export default ResultsDisplay
