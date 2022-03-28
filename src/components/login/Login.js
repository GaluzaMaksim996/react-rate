import { useContext } from 'react'
import { RateContext } from '../../context/RateContext'
import { Button } from '../button/Button'

import './login.scss'

export const Login = () => {

  const { state, renderInputs, loginHandler } = useContext(RateContext)

  return(
    <>
      {renderInputs()}
      <div className='modalBtn'>
        <Button text='Войти' disabled={!state.isFormValid} click={loginHandler} />
      </div>
    </>
  )
} 