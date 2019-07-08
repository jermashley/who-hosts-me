import React from 'react'
import { HostResultsContextProvider } from '../contexts/HostResultsContext'
import { DomainLookupContextProvider } from '../contexts/DomainLookupContext'
import { LocalStorageContextProvider } from '../contexts/LocalStorageContext'

const Layout = props => {
  return (
    <HostResultsContextProvider>
      <DomainLookupContextProvider>
        <LocalStorageContextProvider>
          <main>{props.children}</main>
        </LocalStorageContextProvider>
      </DomainLookupContextProvider>
    </HostResultsContextProvider>
  )
}

export default Layout
