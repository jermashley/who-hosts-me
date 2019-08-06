import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import uuid from 'uuidv4'
import { domainLookupContext } from '../contexts/DomainLookupContext'
import { hostResultsContext } from '../contexts/HostResultsContext'
import DomainInput from './DomainInput'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const DomainLookupForm = () => {
  const { domain } = useContext(domainLookupContext)
  const { setHostResults, toggleHasResults } = useContext(hostResultsContext)
  const [button, setButton] = useState(false)

  const getHostResults = async domain => {
    let results = await axios
      .get(process.env.GATSBY_API_URL, {
        params: {
          key: process.env.GATSBY_API_KEY,
          url: domain,
        },
      })
      .then(res => {
        return res.data.results
      })
      .catch(e => {
        return e
      })

    return results
  }

  const getDomainFavicon = async domain => {
    let favicon = await `https://api.faviconkit.com/${ domain }/32`
    return favicon
  }

  const getHostInformation = domain => {
    setButton(true)

    Promise.all([getHostResults(domain), getDomainFavicon(domain)]).then(
      res => {
        let id = uuid()
        let createdAt = new Date()
        let results = res[0]
        let favicon = res[1]

        setHostResults({
          id: id,
          createdAt: createdAt,
          domain: domain,
          results: results,
          favicon: favicon,
        })

        toggleHasResults(true)

        setTimeout(() => {
          setButton(false)
        }, 12500)
      }
    )
  }

  return (
    <>
      <DomainInput />
      <button
        role='button'
        type='button'
        disabled={button}
        onClick={() => getHostInformation(domain)}
      >
        Get Info
      </button>
    </>
  )
}

export default DomainLookupForm
