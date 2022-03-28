import { useContext } from 'react'
import { Button } from '../../components/button/Button'
import { RateContext } from '../../context/RateContext'

import './sample.scss'

export const Sample = () => {

  const { state, baseHandler, sampleDateHandler, dataWrite, sampleRemove } = useContext(RateContext)

  return (
    <div className='sample'>
      <div className='sampleInner'>
        <div>
          <h3>
            Получить курс: EUR к &nbsp;
            <select value={state.sample.base} onChange={baseHandler}>
              {Object.keys(state.currency).map((item, i) => {
                return (
                  <option key={item}>{item}</option>
                )
              })}
            </select>
          </h3>
        </div>
        <div className='sampleHead'>
          <span>Дата: <input type='date' onChange={sampleDateHandler} /> </span>
          <Button text='Получить курс' click={dataWrite} arg={state.sample} />
        </div>
        <div className='sampleResult'>
          <ul>
            {state.sampleList ?
              Object.keys(state.sampleList).map((item, i) => {
                return (
                  <li key={item}>
                    <span><img src={state.currency['EUR'].flag} alt='EUR' /> EUR</span>
                    <span>{state.sampleList[item].date}</span>
                    <span>{`${state.sampleList[item].course} ${state.sampleList[item].base}`}</span>
                    <button onClick={() => { sampleRemove(item) }}><i className='fa fa-times' /></button>
                  </li>
                )
              }) : null
            }

          </ul>
        </div>
      </div>
    </div>
  )
}