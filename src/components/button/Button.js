import './button.scss'

export const Button = (props) => {

  return(
    <button className='btn'
            onClick={() => props.click ? props.click(props.arg || '') : undefined}
            disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}