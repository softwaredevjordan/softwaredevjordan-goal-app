import React from 'react'

function EditButton({text, bootStrapClass, isDisabled,onClick}) {
  return (
    <button type='buttton' className={bootStrapClass} disabled={isDisabled} onClick={onClick}>{text}</button>
  )
}

export default EditButton