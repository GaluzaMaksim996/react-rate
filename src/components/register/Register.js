import { useContext } from 'react'
import { RateContext } from '../../context/RateContext'
import { Button } from '../button/Button'

import './register.scss'

export const Register = () => {

  const { state, renderInputs, registerHandler } = useContext(RateContext)

  return (
    <>
      {renderInputs()}
      <div className='modalBtn'>
        <Button text='Зарегистрироваться' disabled={!state.isFormValid} click={registerHandler} />
      </div>
    </>
  )
}