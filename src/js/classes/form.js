export const minLength = (length) => {
  return (value) => {
    if (value === '') {
      return true;
    }

    return (value.length >= length);
  };
};

export const required = (value) => {
    return value !== '';
};

export const email = (value) => {
    if (value === '') {
      return true;
    }

    return (value.indexOf('@') !== -1);
};

export default class Form {
  constructor(initData = {}) {
    this.defaultError = 'invalid_field';
    this.fields = {};
    this.rules = {};
    this.errors = {};
    this.errorMessages = {};

    this.addField = this.addField.bind(this);
    this.resetField = this.resetField.bind(this);

    Object.keys(initData).forEach((field) => {
      this.addField(field, initData[field]);
    });
  }

  addField(fieldName, rules = {}) {
    this.fields[fieldName] = '';
    this.rules[fieldName] = {};
    this.errors[fieldName] = [];
    this.errorMessages[fieldName] = [];

    Object.keys(rules).forEach((ruleName) => {
      const [
        rule,
        errorMessage = this.defaultError,
      ] = rules[ruleName];

      this.setRule(fieldName, ruleName, rule);
      this.setErrorMessage(fieldName, ruleName, errorMessage);
    });
  }

  getFields() {
    return this.fields;
  }

  setRule(fieldName, ruleName, rule) {
    this.rules[fieldName][ruleName] = rule;
  }

  getErrorMessage(fieldName, validatorName) {
    return this.errorMessages[fieldName][validatorName];
  }

  setErrorMessage(fieldName, ruleName, message) {
    this.errorMessages[fieldName][ruleName] = message;
  }

  setError(filedName, error) {
    this.errors[filedName] = [error];
  }

  resetField(filedName) {
    this.errors[filedName] = [];
  }

  reset() {
    Object.keys(this.fields)
      .forEach(this.resetField);
  }

  validate() {
    let hasAnyError = false;

    Object.keys(this.fields).forEach((fieldName) => {
      const rules = this.rules[fieldName];
      const fieldValue = this.fields[fieldName];

      let errors = [];

      Object.keys(rules).forEach((ruleName) => {
        const validator = rules[ruleName];

        if (validator(fieldValue) === false) {
          const errorMessage = this.getErrorMessage(fieldName, ruleName);
          errors.push(errorMessage);
        }
      });

      this.errors[fieldName] = errors;

      if (errors.length > 0) {
        hasAnyError = true;
      }
    });

    return (hasAnyError === false);
  }
};

