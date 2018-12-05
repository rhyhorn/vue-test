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
                <captcha v-bind:siteKey="captchaSiteKey"
                         ref="captcha"
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
    email: [
      [required, 'Заполните поле "email"'],
      [email, 'Введите корректный "email"']
    ],
    password: [
      [required, 'Заполните поле "пароль"'],
      [minLength(5), 'Минимальная длинна 5 симолов'],
    ]
  });

  const captchaRules = [
    [required, 'Пройдите каптчу'],
  ];

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
      this.captchaSiteKey = '6Lf1s34UAAAAAE80owqmLzOrfe5M69JYrU6hJiyJ';
      // this.enableCaptcha();
    },
    methods: {
      submit() {
        if (this.isCaptcha === true) {
          form.fields.captcha = this.$refs.captcha.getValue();
          console.log(this.$refs.captcha);
        }

        if (form.validate() === false) {
          return;
        }

        authApi.login(form.getFields())
          .then((response) => {

          })
          .catch((response) => {
            if (this.isCaptcha === true) {
              this.$refs.captcha.reset();
              return;
            }

            if (response.meta.captcha === false) {
              return;
            }

            this.enableCaptcha();
            form.setError('captcha', 'Превышено кол-во попыток, введите каптчу');
          });

      },
      enableCaptcha() {
        if (this.isCaptcha === true) {
          return;
        }

        form.addField('captcha', captchaRules);
        this.fields = {...form.fields};
        this.isCaptcha = true;
      }
    }
  }
</script>