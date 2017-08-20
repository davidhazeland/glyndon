import React from 'react'

const Analytics = (props) => {
  const {
    spend,
    revenue,
    cost,
    orderCount
  } = props

  return (
    <div className="Analytics">
      Analytics
      
      <p>Spend: {spend}</p>
      <p>Revenue: {revenue}</p>
      <p>Fulfill: {cost}</p>
      <p>Orders: {orderCount}</p>
    </div>
  )
}

Analytics.propTypes = {

}

Analytics.displayName = 'Analytics'

export default Analytics
