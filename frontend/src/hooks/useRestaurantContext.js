import { RestaurantContext } from '../context/RestaurantContext'
import { useContext } from 'react'

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext)

  if (!context) {
    throw Error('useRestaurantContext must be used inside an RestaurantContextProvider')
  }

  return context
}