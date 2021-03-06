/* eslint-env jest */
import React from 'react'
import { createStore } from 'redux'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import apiSchema from '../../../configurations/apiSchema.config'
import { renderFakeForm } from '../../../utils/createTestForm'

import EndpointForm from '../../../modules/forms/EndpointForm/EndpointForm'

const initialValues = {
  proxy: {
    upstreams: 'mock-upstreams'
  }
}

const store = createStore(() => ({
  form: {
    mockForm: {
      values: initialValues
    }
  }
}))

const api = {
  name: 'mock-api'
}

describe('EndpointForm component', () => {
  const requiredProps = {
    name: 'mock-name',
    api: {},
    apiSchema,
    disabled: true,
    excludePlugin: jest.fn(),
    handleDelete: jest.fn(),
    handleSubmit: jest.fn(),
    initialValues,
    isAdmin: false,
    selectPlugin: jest.fn(),
    selectedPlugins: ['a', 'b']
  }

  it('renders correctly', () => {
    const wrapper = mount(
      renderFakeForm(store)(initialValues)(
        <EndpointForm
          {...requiredProps}
        />
      )
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly if property `editing` is passed', () => {
    const passedProps = {
      api,
      editing: true
    }

    const wrapper = mount(
      renderFakeForm(store)(initialValues)(
        <MemoryRouter>
          <EndpointForm
            {...requiredProps}
            {...passedProps}
          />
        </MemoryRouter>
      )
    )

    expect(wrapper.find('.j-buttons__wrapper')).toMatchSnapshot()
  })

  it('renders correctly if property logged user has admin role', () => {
    const passedProps = {
      api,
      editing: true,
      isAdmin: true
    }

    const wrapper = mount(
      renderFakeForm(store)(initialValues)(
        <MemoryRouter>
          <EndpointForm
            {...requiredProps}
            {...passedProps}
          />
        </MemoryRouter>
      )
    )

    expect(wrapper.find('.j-buttons__wrapper')).toMatchSnapshot()
  })
})
