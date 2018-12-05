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

  addField(fieldName, rules = []) {
    this.fields[fieldName] = '';
    this.rules[fieldName] = [];
    this.errors[fieldName] = [];
    this.errorMessages[fieldName] = [];

    rules.forEach((ruleData) => {
      const [
        rule,
        errorMessage = this.defaultError,
      ] = ruleData;

      this.setRule(fieldName, rule);
      this.errorMessages[fieldName].push(errorMessage);
    })
  }

  getFields() {
    return this.fields;
  }

  setRule(fieldName, rule) {
    this.rules[fieldName].push(rule);
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

      this.errors[fieldName] = rules.reduce((errors, rule, index) => {
        if (rule(fieldValue) === false) {
          const errorMessage = this.errorMessages[fieldName][index];
          errors.push(errorMessage);
        }

        return errors;
      }, []);

      hasAnyError = (this.errors[fieldName].length > 0);
    });

    return (hasAnyError === false);
  }
};

