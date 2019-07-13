import React, { useContext, useEffect } from 'react'
import { LocalStorageContext } from '../contexts/LocalStorageContext'
import { hostResultsContext } from '../contexts/HostResultsContext'

const ResultsHistory = () => {
  const { existsInLocalStorage, getLocalStorageItem } = useContext(
    LocalStorageContext
  )
  const { resultsHistory, updateResultsHistory } = useContext(
    hostResultsContext
  )

  const showHistory = existsInLocalStorage(`results`)

  useEffect(() => {
    updateResultsHistory(getLocalStorageItem(`results`))
  }, [])

  let resultsHistorySorted = resultsHistory
    ? resultsHistory.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    : null

  return (
    <>
      {showHistory && resultsHistory ? (
        <h3 style={{ display: `block` }}>Result History</h3>
      ) : null}

      {showHistory && resultsHistory
        ? resultsHistorySorted.map(item => (
          <div
            key={item.id}
            style={{
              margin: `0 auto 24px`,
              padding: `12px 24px`,
              width: `100%`,
              maxWidth: `600px`,
              border: `1px solid hsla(215, 5%, 85%, 1)`,
              borderRadius: `4px`,
            }}
          >
            <h2>{item.domain}</h2>
            <div>
              {item.results.map(result => (
                <ul key={result.ip}>
                  <li>IP: {result.ip}</li>
                  <li>ISP ID: {result.isp_id}</li>
                  <li>ISP Name: {result.isp_name}</li>
                  <li>Type: {result.type}</li>
                </ul>
              ))}
            </div>
          </div>
        ))
        : null}
    </>
  )
}

export default ResultsHistory
