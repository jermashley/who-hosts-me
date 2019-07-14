import React, { useContext } from 'react'
import axios from 'axios'
import uuid from 'uuidv4'
import { domainLookupContext } from '../contexts/DomainLookupContext'
import { hostResultsContext } from '../contexts/HostResultsContext'
import DomainInput from './DomainInput'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const DomainLookupForm = () => {
  const { domain } = useContext(domainLookupContext)
  const { setHostResults, toggleHasResults } = useContext(hostResultsContext)

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
    let faviconResults = await axios.get(
      `${ process.env.GATSBY_FAVICON_API_URL }/${ domain }`,
      {
        params: {
          pretty: true,
        },
      }
    )

    let filteredResults = faviconResults.data.icons.filter(icon =>
      icon.sizes ? icon.sizes : false
    )

    let sortedBySize = filteredResults.sort(
      (a, b) =>
        parseInt(b.sizes.substring(0, 3)) - parseInt(a.sizes.substring(0, 3))
    )

    return sortedBySize[0] ? sortedBySize[0].src : null
  }

  const getHostInformation = domain => {
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

        toggleHasResults()
      }
    )

    // axios
    //   .get(process.env.GATSBY_API_URL, {
    //     params: {
    //       key: process.env.GATSBY_API_KEY,
    //       url: domain,
    //     },
    //   })
    //   .then(res => {
    //     let responseCode = res.data.result.code
    //     if (responseCode === 200) {
    //       let id = uuid()
    //       let createdAt = new Date()
    //       let results = res.data.results
    //       let favicon
    //       axios
    //         .get(`http://favicongrabber.com/api/grab/${ domain }`, {
    //           params: {
    //             pretty: true,
    //           },
    //         })
    //         .then(res => {
    //           favicon = res.data.icons[0].src
    //         })
    //       setHostResults({
    //         id: id,
    //         createdAt: createdAt,
    //         domain: domain,
    //         results: results,
    //         favicon: favicon,
    //       })
    //       toggleHasResults()
    //     } else {
    //       console.log(`There was an error.`)
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e)
    //   })
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
