import React from 'react'
import moment from 'moment'

import {List as ListComponent} from 'odem/components';
import { Label } from 'semantic-ui-react'

import { dollar, percent, decimal } from 'utils/format'

const sum = (r, a) => {
  return r + a
}

const avg = (r, a, i) => {
  return (r * i + a) / (i + 1)
}

const Report = (props) => {
  const {
    List: {
      data,
      ...restOfList
    },
    actions: {
      fetchRequest
    }
  } = props

  const jsonData = data.map(item => item.toJSON())

  const dataWithTotal = [
    ...jsonData,
    {
      data: jsonData.reduce((total, item, i) => {
        return {
          orders: sum(total.orders, item.data.orders),
          revenue: sum(total.revenue, item.data.revenue),
          fulfillment: sum(total.fulfillment, item.data.fulfillment),
          adSpent: sum(total.adSpent, item.data.adSpent),
          profit: sum(total.profit, item.data.profit),
          roas: avg(total.roas, item.data.roas, i),
          roi: avg(total.roi, item.data.roi, i),
          aov: avg(total.aov, item.data.aov, i),
          cpa: avg(total.cpa, item.data.cpa, i),
          cpc: avg(total.cpc, item.data.cpc, i),
          epc: avg(total.epc, item.data.epc, i),
          linkClicks: sum(total.linkClicks, item.data.linkClicks),
          netMargin: avg(total.netMargin, item.data.netMargin, i)
        }
      }, {
        orders: 0,
        revenue: 0,
        fulfillment: 0,
        adSpent: 0,
        profit: 0,
        roas: 0,
        roi: 0,
        aov: 0,
        cpa: 0,
        cpc: 0,
        epc: 0,
        linkClicks: 0,
        netMargin: 0
      })
    }
  ]

  return (
    <div className="Report">
      <h1 className="ui header">Report</h1>

      <ListComponent
        {...restOfList}
        data={dataWithTotal}
        actions={{fetchRequest}}
        renderers={createRenderers()}
        />
    </div>
  )
}

function createRenderers() {
  return [
    {header: {text: 'Date'}, body: {render: item => item.date ? item.date : 'Total'}},
    {header: {text: 'Day'}, body: {render: item => item.date && moment(item.date).format('dddd')}},
    {header: {text: 'Orders'}, body: {render: item => item.data.orders}},
    {header: {text: 'Revenue'}, body: {render: item => dollar(item.data.revenue)}},
    {header: {text: 'Fulfillment'}, body: {render: item => dollar(item.data.fulfillment)}},
    {header: {text: 'Ad Spent'}, body: {render: item => dollar(item.data.adSpent)}},
    {header: {text: 'Profit'}, body: {render: item => {
      return (
        <Label color={item.data.profit > 0 ? 'green' : 'red'}>
          {dollar(item.data.profit)}
        </Label>
      )
    }}},
    {header: {text: 'ROAS'}, body: {render: item => decimal(item.data.roas)}},
    {header: {text: 'ROI'}, body: {render: item => percent(item.data.roi)}},
    {header: {text: 'AOV'}, body: {render: item => dollar(item.data.aov)}},
    {header: {text: 'CPA'}, body: {render: item => dollar(item.data.cpa)}},
    {header: {text: 'CPC'}, body: {render: item => dollar(item.data.cpc)}},
    {header: {text: 'EPC'}, body: {render: item => decimal(item.data.epc)}},
    {header: {text: 'Link Clicks'}, body: {render: item => item.data.linkClicks}},
    {header: {text: 'NET Margin'}, body: {render: item => percent(item.data.netMargin)}}
  ];
}


Report.propTypes = {

}

Report.displayName = 'Report'

export default Report
