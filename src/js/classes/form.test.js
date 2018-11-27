import Form from './form';

import {minLength, notNull} from './form';

describe('Form module', () => {
  it('should', () => {

    const form = new Form({
      email: {
        notNull: [notNull(), 'not_empty'],
        minLength: [minLength(5), 'min_length'],
      },
      password: {
        notNull: [notNull(), 'not_empty'],
        minLength: [minLength(5), 'min_length']
      }
    });

    expect(form.fields)
      .toEqual({
        email: '',
        password: ''
      });

    expect(form.rules.email)
      .toBeDefined();

    expect(form.rules.password)
      .toBeDefined();

    form.validate();

    expect(form.errors.email.hasError)
      .toBe(true);

    expect(form.errors.email.errorText)
      .toBe('not_empty');
  });
});