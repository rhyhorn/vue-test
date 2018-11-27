export function notNull() {
  return (value) => {
    return value !== '';
  };
};

export function minLength(length) {
  return (value) => {
    return value.length >= length;
  };
};

export default class Form {
  constructor(initData) {
    this.defaultError = 'invalid_field';
    this.fields = {};
    this.rules = {};
    this.errors = {};
    this.errorMessages = {};

    this.resetField = this.resetField.bind(this);

    Object.keys(initData).forEach((field) => {
      this.fields[field] = '';
      this.errors[field] = [];
      this.errorMessages[field] = [];
      this.rules[field] = {};

      Object.keys(initData[field]).forEach((ruleName) => {
        let [
          rule,
          error = this.defaultError,
        ] = initData[field][ruleName];

        this.setRule(field, ruleName, rule);
        this.setErrorMessage(field, ruleName, error);
      });
    });
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

      Object.keys(rules).forEach((validatorName) => {
        const validator = rules[validatorName];

        if (validator(fieldValue) === false) {
          const errorMessage = this.getErrorMessage(fieldName, validatorName);
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

