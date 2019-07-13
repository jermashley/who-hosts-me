import React, { useContext } from 'react'
import axios from 'axios'
import uuid from 'uuidv4'
import { domainLookupContext } from '../contexts/DomainLookupContext'
import { hostResultsContext } from '../contexts/HostResultsContext'
import DomainInput from './DomainInput'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const DomainLookupForm = () => {
  const { domain } = useContext(domainLookupContext)
  const { hostResults, setHostResults, toggleHasResults } = useContext(
    hostResultsContext
  )

  function ResultObject (id, createdAt, domain, results, favicon) {
    this.id = id
    this.createdAt = createdAt
    this.domain = domain
    this.results = results
    this.favicon = favicon
  }

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
          let results = res.data.results
          let favicon

          axios
            .get(`http://favicongrabber.com/api/grab/${ domain }`, {
              params: {
                pretty: true,
              },
            })
            .then(res => {
              favicon = res.data.icons[0].src
            })

          setHostResults({
            id: id,
            createdAt: createdAt,
            domain: domain,
            results: results,
            favicon: favicon,
          })

          toggleHasResults()
        } else {
          console.log(`There was an error.`)
        }
      })
      .catch(e => {
        console.log(e)
      })

    // let finalResults = new ResultObject(...hostResults)
    // console.log(finalResults)
  }

  return (
    <>
      <DomainInput />
      <button role='button' onClick={() => getHostInformation(domain)}>
        Get Info
      </button>
    </>
  )
}

export default DomainLookupForm
