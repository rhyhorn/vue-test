<template>
    <div class="login-form">
        <form class="form"
              v-on:submit.prevent="submit()"
        >
            <div class="form__row"
                 v-bind:class="{'form__row--has-error': errors.email.length > 0}"
            >
                <input class="form__input"
                       placeholder="email"
                       v-model="fields.email"
                       v-on:focus="form.reset()"
                />
                <div class="form__input-error"
                     v-if="errors.email.length > 0"
                >
                    {{errors.email[0]}}
                </div>
            </div>

            <div class="form__row"
                 v-bind:class="{'form__row--has-error': errors.password.length > 0}"
            >
                <input class="form__input"
                       placeholder="password"
                       v-model="fields.password"
                       v-on:focus="form.reset()"
                />
                <div class="form__input-error"
                     v-if="errors.password.length > 0"
                >
                    {{errors.password[0]}}
                </div>
            </div>

            <div class="form__row">
                <button class="login-form__submit"
                        type="submit"
                >
                    Save
                </button>
            </div>

            {{errors}}
        </form>
    </div>

</template>
<script>
  const login = () => {
    return Promise.reject({});
  };

  import Form from '../classes/form';
  import {minLength, required, email} from '../classes/form';

  const form = new Form({
    email: {
      required: [required(), 'Заполните поле "email"'],
      email: [email(), 'Введите корректный "email"'],
    },
    password: {
      required: [required(), 'Заполните поле "пароль"'],
    }
  });

  export default {
    data() {
      return {
        fields: form.fields,
        errors: form.errors
      }
    },
    created() {
      this.form = form;
    },
    methods: {
      submit() {
        if (form.validate() === false) {
          return;
        }

        login(form.getFields())
          .then((response) => {

          })
          .catch((response) => {
            if (response.code !== VALIDATION_ERROR_RESPONSE) {
              return;
            }

            const fields = form.getFields();
            const errors = reponse.getErrorsFor(fields);

            if (errors === null) {
              return;
            }

            form.setErrors(errors);
          })

      }
    }
  }
</script>