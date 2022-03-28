import { useContext } from 'react'
import { RateContext } from '../../context/RateContext'

import './countResult.scss'

export const CountResult = () => {

  const { state } = useContext(RateContext)

  return (
    <div className='calcResult'>
      <ul>
        {state.result ?
          <li>
            <p>
              <span>{`${state.inputValue} EUR`}</span>
              =
              <span>{`${state.result} ${state.currencyValue}`}</span>
            </p>
          </li>
          : null
        }
      </ul>
    </div>
  )
}