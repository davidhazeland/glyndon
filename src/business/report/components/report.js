import React from 'react'
import moment from 'moment'

import {List as ListComponent} from 'odem/components';

import { dollar, percent, decimal } from 'utils/format'

const Report = (props) => {
  const {
    List,
    actions: {
      fetchRequest
    }
  } = props



  return (
    <div className="Report">
      <h1 className="ui header">Report</h1>

      <ListComponent
        {...{
          ...List,
          data: List.data.map(item => item.toJSON())
        }}
        actions={{fetchRequest}}
        renderers={createRenderers()}
        />
    </div>
  )
}

function createRenderers() {
  return [
    {header: {text: 'Date'}, body: {render: item => moment(item.date).format('dddd, MM/DD/YYYY')}},
    {header: {text: 'Orders'}, body: {render: item => item.data.orders}},
    {header: {text: 'Revenue'}, body: {render: item => dollar(item.data.revenue)}},
    {header: {text: 'Fulfillment'}, body: {render: item => dollar(item.data.fulfillment)}},
    {header: {text: 'Ad Spent'}, body: {render: item => dollar(item.data.adSpent)}},
    {header: {text: 'Profit'}, body: {render: item => dollar(item.data.profit)}},
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
