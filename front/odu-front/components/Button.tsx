import React, { useState } from 'react';

interface Props {
  label: {
    clicked: string,
    notclicked: string
  }
}

const Button: React.FC<Props> = ({ label }) => {
  const [clicked, setClicked] = useState(false)

  return (
    <button
      onClick={() => setClicked(!clicked)}
      style={{ background: clicked ? 'green' : 'red' }}
    >
      {clicked ? label.clicked : label.notclicked}
    </button>
  )
}

export default Button;
