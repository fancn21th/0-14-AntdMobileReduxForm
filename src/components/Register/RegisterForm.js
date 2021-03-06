import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import InputItemField from '../../antds/InputItemField';
import { Toast, WhiteSpace, Button } from 'antd-mobile';
import { translate } from 'react-i18next';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

const asyncValidate = (values, dispatch, props, blurredField) => {
  if(blurredField === 'firstName'){
    return sleep(1000).then(() => { // simulate server latency
      if (['alex'].includes(values.firstName)) {
        throw { firstName: 'That firstName is taken' };
      }
    });
  }
  if(blurredField === 'email'){
    return sleep(1000).then(() => { // simulate server latency
      if (['fancn21th@aliyun.com'].includes(values.email)) {
        throw { email: 'That email is taken' };
      }
    });
  }
};

class RegisterForm extends Component {

  handleErrorClick = (error) => {
    Toast.info(error)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, t } = this.props;
    const style = {
      width: '100%',
      height: '50px',
      fontSize: '40px',
    };
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="firstName"
            label={t('firstName')}
            component={InputItemField}
            type="text"
            style={style}
            handleErrorClick={this.handleErrorClick}
          />
        </div>
        <WhiteSpace size='md' />
        <div>
          <Field
            name="lastName"
            label={t('lastName')}
            component={InputItemField}
            type="text"
            style={style}
            handleErrorClick={this.handleErrorClick}
          />
        </div>
        <WhiteSpace size='md' />
        <div>
          <Field
            name="email"
            label={t('email')}
            component={InputItemField}
            type="text"
            style={style}
            handleErrorClick={this.handleErrorClick}
          />
        </div>
        <WhiteSpace size='md' />
        <Button
          className="btn"
          type="primary"
          onClick={handleSubmit}
          disabled={pristine || submitting}
        >
          Submit
        </Button>
        <WhiteSpace size='md' />
        <Button
          className="btn"
          onClick={reset}
          disabled={pristine || submitting}
        >
          Clear Values
        </Button>
      </form>
    );
  }
}

RegisterForm.propTyps = {
  handleSubmit: PropTypes.func.isRequired,
}

// Decorate the form component
RegisterForm = reduxForm({
  form: 'register', // a unique name for this form
  validate,
  asyncValidate,
  asyncBlurFields: ['firstName', 'email'],
})(RegisterForm);

export default translate()(RegisterForm);
