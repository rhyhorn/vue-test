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
            <div class="form__row"
                 v-if="fields.captcha !== undefined"
                 v-bind:class="{'form__row--has-error': errors.captcha.length > 0}"
            >
                <captcha siteKey="captchaSiteKey"
                ></captcha>
                <div class="form__input-error"
                     v-if="errors.captcha.length > 0"
                >
                    {{errors.captcha[0]}}
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

        {{fields}}
        {{errors}}

    </div>

</template>
<script>
  import Form from '../classes/form';
  import Captcha from '../components/captcha.vue';
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

  const captchaRules = {
    required: [required, 'Пройдите каптчу'],
  };

  export default {
    components: {
      Captcha
    },
    data() {
      return {
        isCaptcha: false,
        fields: form.fields,
        errors: form.errors,
      }
    },
    created() {
      this.form = form;
      this.captchaSiteKey = '6LfHsiQUAAAAACriCWNkvXLih5--c8HN9CkngaYy';
      this.enableCaptcha();
    },
    methods: {
      submit() {
        if (this.isCaptcha === true) {
          form.fields.captcha = 5;
        }

        if (form.validate() === false) {
          return;
        }

        authApi.login(form.getFields())
          .then((response) => {

          })
          .catch((response) => {
            if (this.isCaptcha === true) {
              return;
            }

            if (response.meta.captcha === true) {
              this.enableCaptcha();
              form.setError('captcha', 'Превышено кол-во попыток, введите каптчу');
            }
          })

      },
      enableCaptcha() {
        if (this.isCaptcha === true) {
          return;
        }

        this.isCaptcha = true;
        form.addField('captcha', captchaRules);
      }
    }
  }
</script>