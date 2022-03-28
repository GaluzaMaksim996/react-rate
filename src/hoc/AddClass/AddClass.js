export const AddClass = (Component, className) => {

  return (props) => {
    
    return (
      <div className={className}>
        <Component />
      </div>
    )
  }
}