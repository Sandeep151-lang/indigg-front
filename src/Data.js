import React from 'react'

const Data = ({ setCart, cart }) => {
  const carts = JSON.parse(localStorage.getItem('data')) || []
  const onRemove = (item) => {
    setCart(cart.filter((x) => x.id !== item.id))
  }
  return (
    <div>
      {carts.map((item) => {
        return (
          <>
            <p>{item?.id}</p>
            <button onClick={() => onRemove(item)}>Delete</button>
          </>
        )
      })}
    </div>
  )
}

export default Data
