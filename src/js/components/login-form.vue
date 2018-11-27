<template>
    <form class="form"
          v-on:submit.prevent="submit()"
    >
        <div class="form__row">
            <label>email</label>
            <input class="form__input"
                   v-model="fields.email"
                   v-on:focus="resetField('email')"
            />
            <div class="input__error"
                 v-if="errors.email.length > 0"
            >
                {{errors.email[0]}}
            </div>
        </div>

        <div class="form__row">
            <label>password</label>
            <input class="form__input"
                   v-model="fields.password"
                   v-on:focus="resetField('password')"
            />
            <div class="input__error"
                 v-if="errors.password.length > 0"
            >
                {{errors.password[0]}}
            </div>
        </div>

        <div class="form__row">
            <button type="submit">
                Save
            </button>
        </div>

        {{errors}}
    </form>
</template>
<script>
    const login = () => {
      return Promise.reject({

      });
    };

  import Form from '../classes/form';
  import {minLength, notNull} from '../classes/form';

  const form = new Form({
    email: {
      emailValue: [notNull(), 'not_empty'],
    },
    password: {
      notNull: [notNull(), 'not_empty'],
      minLength: [minLength(6), 'min_length'],
    }
  });

  export default {
    data() {
      return {
        fields: form.fields,
        errors: form.errors
      }
    },
    methods: {
      resetField(fieldName) {
        form.resetField(fieldName);
      },
      submit() {
        if (form.validate() === false) {
          return;
        }

        login(form.fields)
          .then((response) => {

          })
          .catch((response) => {
            if (response.code !== VALIDATION_ERROR_RESPONSE) {
              return;
            }

            const error = response.getFirstError(['email', '_general']);
            form.setError('email', error);
          })

      }
    }
  }
</script>