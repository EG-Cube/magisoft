import { TransportContext } from '../context/TransportContext'
import { useContext } from 'react'

export const useTransportContext = () => {
  const context = useContext(TransportContext)

  if (!context) {
    throw Error('useTransportContext must be used inside an TransportContextProvider')
  }

  return context
}