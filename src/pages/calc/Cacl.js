import { Counter } from '../../components/counter/Counter'
import { CountResult } from '../../components/countResult/CountResult'

import './calc.scss'

export const Calc = () => {
  
  return(
    <div className='calc'>
      <div className='calcInner'>
        <Counter />
        <CountResult />
      </div>
    </div>
  )
}