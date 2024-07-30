import { ItineraryContext } from '../context/ItineraryContext'
import { useContext } from 'react'

export const useItineraryContext = () => {
  const context = useContext(ItineraryContext)

  if (!context) {
    throw Error('useItineraryContext must be used inside an ItineraryContextProvider')
  }

  return context
}