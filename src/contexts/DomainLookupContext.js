import React, { createContext, useState } from 'react'

const domainLookupContext = createContext({})

const DomainLookupContextProvider = props => {
  const [domain, setDomain] = useState(``)

  const addDomain = domain => {
    let cleanDomain = domain.replace(/^\/\/|^.*?:(\/\/)?/, ``)
    setDomain(cleanDomain)
  }

  return (
    <domainLookupContext.Provider value={{ domain, addDomain }}>
      {props.children}
    </domainLookupContext.Provider>
  )
}

export { domainLookupContext, DomainLookupContextProvider }
