import React, { useContext, useEffect } from 'react'
import { hostResultsContext } from '../contexts/HostResultsContext'

const ResultsDisplay = () => {
  const { hostResults, hasResults } = useContext(hostResultsContext)

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
        </>
      ) : null}
    </>
  )
}

export default ResultsDisplay
