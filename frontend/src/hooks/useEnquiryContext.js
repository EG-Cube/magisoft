import { EnquiryContext } from '../context/EnquiryContext'
import { useContext } from 'react'

export const useEnquiryContext = () => {
  const context = useContext(EnquiryContext)

  if (!context) {
    throw Error('useEnquiryContext must be used inside an EnquiryContextProvider')
  }

  return context
}