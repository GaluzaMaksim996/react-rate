import React from 'react'
import axios from 'axios'
import Layout from './components/layout/Layout'
import { RateContext } from './context/RateContext'
import { Dark } from './components/dark/Dark'
import { Modal } from './components/modal/Modal'
import { Input } from './components/input/Input'

import CHF from './images/CHF.png'
import CNY from './images/CNY.png'
import EUR from './images/EUR.png'
import GBP from './images/GBP.png'
import JPY from './images/JPY.png'
import RUB from './images/RUB.png'
import USD from './images/USD.png'


import './App.scss'


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      auth: false,
      error: '',
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Введите корректный email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          value: '',
          type: 'password',
          label: 'Пароль',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6
          }
        }
      },
      base: 'EUR',
      rate: '',
      date: '',
      currency: {
        EUR: { name: 'Евро', flag: EUR, course: '' },
        USD: { name: 'Доллар США', flag: USD, course: '' },
        CHF: { name: 'Швейцарский Франк', flag: CHF, course: '' },
        CNY: { name: 'Китайский Юань', flag: CNY, course: '' },
        GBP: { name: 'Фунт Стерлингов', flag: GBP, course: '' },
        JPY: { name: 'Японская Йена', flag: JPY, course: '' },
        RUB: { name: 'Российский Рубль', flag: RUB, course: '' },
      },
      //calculator
      inputValue: 100,
      currencyValue: 'EUR',
      result: null,
      //samle
      sample: { base: 'RUB', date: '', course: '' },
      sampleList: {},

      showModal: false,
      isFormValid: false
    }
  }

  loginHandler = async () => {

    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAF_GaOFR-hk5I43Y71ZtIyXXNy0fc2Glk', authData)

      if (response.data.idToken) {

        const formControls = {...this.state.formControls}
        formControls.email.value = ''
        formControls.password.value = ''

        this.setState({
          auth: true,
          showModal: false,
          error: '',
          formControls
        })
      }
    } catch (e) {
      console.log(e);
      this.setState({ error: 'Ошибка' })
    }
  }

  registerHandler = async () => {

    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAF_GaOFR-hk5I43Y71ZtIyXXNy0fc2Glk', authData)

      if (response.data.idToken) {

        const formControls = {...this.state.formControls}
        formControls.email.value = ''
        formControls.password.value = ''

        this.setState({
          auth: true,
          showModal: false,
          error: '',
          formControls
        })
      }
    } catch (e) {
      console.log(e)
      this.setState({error: 'Ошибка'})
    }
  }

  modalShowHandler = () => {
    this.setState({ showModal: true })
  }

  modalHideHandler = () => {
    this.setState({ showModal: false })
  }

  validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (e, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
    })
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, i) => {

      const control = this.state.formControls[controlName]
      return (
        <Input key={controlName + i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={true}
          onChange={(e) => { this.onChangeHandler(e, controlName) }}
        />
      )
    })
  }

  baseHandler = e => {
    this.setState({
      sample: { ...this.state.sample, base: e.target.value }
    })
  }

  sampleDateHandler = e => {
    this.setState({
      sample: { ...this.state.sample, date: e.target.value }
    })
  }

  sampleRemove = async id => {
    let sampleList = { ...this.state.sampleList }
    delete sampleList[id]
    this.setState({
      sampleList
    })

    await axios.delete(`https://rateapp-dd935-default-rtdb.firebaseio.com/sample/${id}.json`)
  }

  dataWrite = async () => {

    await fetch(`http://api.exchangeratesapi.io/v1/${this.state.sample.date}?access_key=8b70442083efcb21a4cd9e3f576e4bf3`)
      .then(response => response.json()).then(response => {
        this.setState({
          sample: { ...this.state.sample, course: response.rates[this.state.sample.base] }
        })

      })

    await axios.post('https://rateapp-dd935-default-rtdb.firebaseio.com/sample.json', this.state.sample)
      .then(response => {
        return ''
      })

    await axios('https://rateapp-dd935-default-rtdb.firebaseio.com/sample.json')
      .then(response => {
        this.setState({
          sampleList: response.data
        })
      })
  }

  inputValueHandler = e => {
    this.setState({
      inputValue: e.target.value,
      result: null
    })
  }

  currencyValueHandler = e => {
    this.setState({
      currencyValue: e.target.value,
      result: null
    })
  }

  calculatorHandler = value => {
    let course = this.state.currency[value].course
    let result = course * this.state.inputValue

    this.setState({
      result
    })
  }

  componentDidMount() {
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=8b70442083efcb21a4cd9e3f576e4bf3`)
      .then(response => response.json()).then(response => {

        const rateArr = ['EUR', 'USD', 'CHF', 'CNY', 'GBP', 'JPY', 'RUB']
        const currency = { ...this.state.currency }

        for (let i = 0; i < rateArr.length; i++) {
          currency[rateArr[i]].course = response.rates[rateArr[i]]
        }

        this.setState({
          rate: response.rates,
          date: response.date,
          currency
        })
      })

    axios('https://rateapp-dd935-default-rtdb.firebaseio.com/sample.json')
      .then(response => {
        this.setState({
          sampleList: response.data
        })
      })
  }

  render() {

    return (
      <div className='app'>
        <RateContext.Provider value={{
          state: this.state,
          inputValueHandler: this.inputValueHandler,
          currencyValueHandler: this.currencyValueHandler,
          calculatorHandler: this.calculatorHandler,
          baseHandler: this.baseHandler,
          sampleDateHandler: this.sampleDateHandler,
          dataWrite: this.dataWrite,
          sampleRemove: this.sampleRemove,
          renderInputs: this.renderInputs,
          modalShowHandler: this.modalShowHandler,
          modalHideHandler: this.modalHideHandler,
          loginHandler: this.loginHandler,
          registerHandler: this.registerHandler,
        }}>
          <Dark showModal={this.state.showModal} />
          <Modal />
          <Layout />
        </RateContext.Provider>
      </div>
    )
  }
}


export default App;
