import { SiteContext } from '../context/SiteContext'
import { useContext } from 'react'

export const useSiteContext = () => {
  const context = useContext(SiteContext)

  if (!context) {
    throw Error('useSiteContext must be used inside an SiteContextProvider')
  }

  return context
}