import React, { useContext, useEffect } from 'react'
import DomainLookupForm from '../components/DomainLookupForm'
import Layout from '../layouts'
import ResultsDisplay from '../components/ResultsDisplay'
import { hostResultsContext } from '../contexts/HostResultsContext'

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <DomainLookupForm />
      </div>

      <div>
        <ResultsDisplay />
      </div>
    </Layout>
  )
}

export default IndexPage
