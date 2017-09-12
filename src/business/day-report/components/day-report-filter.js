import React from 'react'

import { Form, Field, DatePicker, SelectBox } from 'odem/components'
import { Button, Form as FormComponent } from 'semantic-ui-react'

import moment from 'moment'

const DayReportFilter = (props) => {
  return (
    <div className="DayReportFilter">
      <Form {...props}>
        <FormComponent.Group inline>
          <Field
            name="country"
            component={SelectBox}
            componentProps={{
              options: [
                {key: 'all', value: 'All', text: 'All'},
                {key: 'us', value: 'US', text: 'United States'},
                {key: 'ca', value: 'CA', text: 'Canada'},
                {key: 'gb', value: 'GB', text: 'United Kingdom'},
                {key: 'au', value: 'AU', text: 'Australia'}
              ]
            }}
            fieldProps={{
              inline: true
            }}
            />

          <Field
            name="since"
            component={DatePicker}
            componentProps={{
              placeholderText: "Since",
              defaultValue: moment().day(-7)
            }}
            fieldProps={{
              inline: true
            }}
            />

          <Field
            name="until"
            component={DatePicker}
            componentProps={{
              placeholderText: "Until",
              defaultValue: moment()
            }}
            fieldProps={{
              inline: true
            }}
            />

        <Button primary>Filter</Button>
      </FormComponent.Group>
      </Form>
    </div>
  )
}

DayReportFilter.propTypes = {

}

DayReportFilter.displayName = 'DayReportFilter'

export default DayReportFilter
