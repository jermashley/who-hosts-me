import React, { useContext, useEffect } from 'react'
import DomainLookupForm from '../components/DomainLookupForm'
import ResultsDisplay from '../components/ResultsDisplay'
import ResultsHistory from '../components/ResultsHistory'

const IndexPage = () => {
  return (
    <>
      <div>
        <DomainLookupForm />
      </div>

      <div>
        <ResultsDisplay />
      </div>

      <ResultsHistory />
    </>
  )
}

export default IndexPage
