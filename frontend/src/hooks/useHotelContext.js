import { HotelContext } from '../context/HotelContext'
import { useContext } from 'react'

export const useHotelContext = () => {
  const context = useContext(HotelContext)

  if (!context) {
    throw Error('useHotelContext must be used inside an HotelContextProvider')
  }

  return context
}