import { useContext } from 'react'
import { RateContext } from '../../context/RateContext'

import './dark.scss'

export const Dark = ({ showModal }) => {

  const { modalHideHandler } = useContext(RateContext)

  const cls = ['dark']

  if (showModal) {
    cls.push('showDark')
  }

  return(
    <div className={cls.join(' ')} onClick={modalHideHandler}></div>
  )
}