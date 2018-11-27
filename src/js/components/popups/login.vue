<template>
    <div class="popup">
        <div class="popup__head">
            <div class="popup__close"
                 v-on:click="$emit('close')"
            ></div>

        </div>
        <div class="popup__body">

            <div class="popup__title">
                <form class="from"
                      v-on:submit.prevent="submit()"
                >

                    <div class="form__row"
                         v-bind:class="{'form__row--has-error': $v.email.$error}"
                    >
                        <input class="form__input"
                               name="email"
                               v-model.trim="email"
                        />

                        <label class="form__input-error" v-if="!$v.email.required">
                            123123
                        </label>
                    </div>

                    <input name="password"
                           v-model.trim="password"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
  import {required} from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    validations: {
      email: {
        required
      },
      password: {
        required
      }
    },
    methods: {
      submit() {

        console.log(this.$v);

        this.$v.$touch();
        if (this.$v.$invalid === true) {
          return;
        }

        authApi.log(this.email, this.password)
          .then(() => {

          })
          .catch((reponse) => {
            if (reponse.type === VALIDATION_ERROR_RESPONSE) {

            }
          });
      }
    }
  }
</script>