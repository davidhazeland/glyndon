import React from 'react'

import { Form, Field, DatePicker } from 'odem/components'
import { Button, Form as FormComponent } from 'semantic-ui-react'

import moment from 'moment'

const DayReportFilter = (props) => {
  return (
    <div className="DayReportFilter">
      <Form {...props}>
        <FormComponent.Group inline>
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
