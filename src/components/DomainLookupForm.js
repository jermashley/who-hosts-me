import React, { useContext } from 'react'
import axios from 'axios'
import uuid from 'uuidv4'
import { domainLookupContext } from '../contexts/DomainLookupContext'
import { hostResultsContext } from '../contexts/HostResultsContext'
import DomainInput from './DomainInput'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const DomainLookupForm = () => {
  const { domain } = useContext(domainLookupContext)
  const { addHostResults, toggleHasResults, updateResultsHistory } = useContext(
    hostResultsContext
  )
  const { getLocalStorageItem, updateHostResultsInLocalStorage } = useContext(
    LocalStorageContext
  )

  const getHostInformation = domain => {
    axios
      .get(process.env.GATSBY_API_URL, {
        params: {
          key: process.env.GATSBY_API_KEY,
          url: domain,
        },
      })
      .then(res => {
        let responseCode = res.data.result.code

        if (responseCode === 200) {
          let id = uuid()
          let createdAt = new Date()

          updateHostResultsInLocalStorage(
            id,
            createdAt,
            domain,
            res.data.results
          )

          let updatedLocalStorageResults = getLocalStorageItem(`results`)
          updateResultsHistory(updatedLocalStorageResults)

          addHostResults(id, createdAt, domain, res.data.results)
          toggleHasResults()
        } else {
          console.log(`There was an error.`)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <div>
        <DomainInput />
        <button role='button' onClick={() => getHostInformation(domain)}>
          Get Info
        </button>
      </div>
    </>
  )
}

export default DomainLookupForm
