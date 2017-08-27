import React from 'react'
import moment from 'moment-timezone'
import _ from 'lodash'

const timezone = 'America/Los_Angeles'

import { Table } from 'semantic-ui-react'
import { dollar } from 'utils/format'

const AnalyticsLastOrders = (props) => {
  const { orders } = props

  return (
    <div className="AnalyticsLastOrders">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order #</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
         {_.reverse(orders).slice(0, 5).map((order, i) => {
           return (
             <Table.Row key={i}>
               <Table.Cell>
                 {order.name}
               </Table.Cell>
               <Table.Cell>
                 {moment(order.orderDate, 'X').tz(timezone).format('hh:mm A')}
               </Table.Cell>
               <Table.Cell>
                 {order.customerName}
               </Table.Cell>
               <Table.Cell>
                 {dollar(order.total)}
               </Table.Cell>
             </Table.Row>
           )
         })}
       </Table.Body>
      </Table>
    </div>
  )
}

AnalyticsLastOrders.propTypes = {

}

AnalyticsLastOrders.displayName = 'AnalyticsLastOrders'

export default AnalyticsLastOrders
