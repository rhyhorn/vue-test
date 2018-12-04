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
        </form>

        {{errors}}

    </div>

</template>
<script>
  import Form from '../classes/form';
  import {required, email, minLength} from '../classes/form';

  import authApi from '../api/auth';

  const form = new Form({
      email: {
        required: [required, 'Заполните поле "email"'],
        email: [email, 'Введите корректный "email"'],
      },
      password: {
        required: [required, 'Заполните поле "пароль"'],
        minLength: [minLength(5), 'МИнимальная длинна 5 симолов'],
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

        authApi.login(form.getFields())
          .then((response) => {
            console.log('success', response);
          })
          .catch((response) => {
            console.log('error', response);
          })

      }
    }
  }
</script>