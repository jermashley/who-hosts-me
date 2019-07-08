import React, { useContext } from 'react'
import DomainInput from '../components/DomainInput'
import { domainLookupContext } from '../contexts/DomainLookupContext'
import DomainLookupForm from '../components/DomainLookupForm'
import Layout from '../layouts'

const IndexPage = () => {
  const { domain } = useContext(domainLookupContext)

  return (
    <Layout>
      <div>
        <DomainLookupForm />
      </div>
    </Layout>
  )
}

export default IndexPage
