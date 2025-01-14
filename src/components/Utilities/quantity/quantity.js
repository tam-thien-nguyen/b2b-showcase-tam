import React from 'react'
import './quantity.css'

const Quantity = ({ value, increase = () => {}, decrease = () => {} }) => {
  return (
    <div className="quantity-input">
      <button
        className="quantity-input_modifier quantity-input__modifier--left"
        onClick={() => decrease()}
      >
        <svg
          width="10"
          height="3"
          viewBox="0 0 10 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 0.908417V2.47092H0V0.908417H10Z" fill="#818385" />
        </svg>
      </button>
      <div className="quantity-input_screen">{value}</div>
      <button
        className="quantity-input_modifier quantity-input__modifier--right"
        onClick={() => increase()}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.89205 9.37717V0.00216675H5.48295V9.37717H3.89205ZM0 5.48512V3.89421H9.375V5.48512H0Z"
            fill="#818385"
          />
        </svg>
      </button>
    </div>
  )
}

export default Quantity
