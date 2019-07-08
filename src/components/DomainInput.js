import React, { useContext } from 'react'
import { domainLookupContext } from '../contexts/DomainLookupContext'

const DomainInput = props => {
  const { addDomain } = useContext(domainLookupContext)

  return (
    <>
      <input type='text' onChange={e => addDomain(e.target.value)} />
    </>
  )
}

export default DomainInput
