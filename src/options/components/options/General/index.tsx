import React from 'react'
import { openURL } from '@/_helpers/browser-api'
import { Props } from '../typings'
import { updateConfigOrProfile, formItemLayout } from '../helpers'

import { FormComponentProps } from 'antd/lib/form'
import { Form, Select, Switch, Button } from 'antd'

const isChrome = navigator.userAgent.includes('Chrome')

export class General extends React.Component<Props & FormComponentProps> {
  openShortcuts = () => {
    openURL('chrome://extensions/shortcuts')
  }

  render () {
    const { t, config } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        {isChrome && // @todo wait for firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1303384
          <Button onClick={this.openShortcuts}>{t('opt_shortcuts')}</Button>
        }
        <Form.Item
          {...formItemLayout}
          label={t('opt_active')}
          help={t('opt_app_active_help')}
        >{
          getFieldDecorator('config#active', {
            initialValue: config.active,
            valuePropName: 'checked',
          })(
            <Switch />
          )
        }</Form.Item>
        <Form.Item
          {...formItemLayout}
          label={t('opt_animation')}
          help={t('opt_animation_help')}
        >{
          getFieldDecorator('config#animation', {
            initialValue: config.animation,
            valuePropName: 'checked',
          })(
            <Switch />
          )
        }</Form.Item>
        <Form.Item
          {...formItemLayout}
          label={t('opt_language')}
        >{
          getFieldDecorator('config#langCode', {
            initialValue: config.langCode,
          })(
            <Select>
              <Select.Option value='zh-CN'>简体中文</Select.Option>
              <Select.Option value='zh-TW'>繁體中文</Select.Option>
              <Select.Option value='en'>English</Select.Option>
            </Select>
          )
        }</Form.Item>
      </Form>
    )
  }
}

export default Form.create({
  onValuesChange: updateConfigOrProfile
})(General)
