import React, { useContext, useEffect } from 'react'
import { hostResultsContext } from '../contexts/HostResultsContext'

const ResultsDisplay = () => {
  const { hostResults, hasResults } = useContext(hostResultsContext)

  return (
    <>
      {hasResults ? (
        <>
          <h2>{hostResults.domain}</h2>
          <code>{hostResults.id}</code>
          <div>
            {hostResults.results.map(result => (
              <ul key={result.ip}>
                <li>{result.ip}</li>
                <li>{result.isp_id}</li>
                <li>{result.isp_name}</li>
                <li>{result.type}</li>
              </ul>
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

export default ResultsDisplay
