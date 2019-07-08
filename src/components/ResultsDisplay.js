import React, { useContext, useEffect } from 'react'
import { hostResultsContext } from '../contexts/HostResultsContext'

const ResultsDisplay = () => {
  const { hostResults } = useContext(hostResultsContext)

  useEffect(() => {
    console.log(hostResults)
  }, hostResults)

  return <>{hostResults ? <code>{hostResults.domain}</code> : null}</>
}

export default ResultsDisplay
