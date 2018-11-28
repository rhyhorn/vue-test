<template>
    <div class="popup">
        <div class="popup__head">
            <div class="popup__close"
                 v-on:click="$emit('close')"
            ></div>
        </div>
        <div class="popup__body">
555
            <login-form></login-form>

        </div>
    </div>
</template>

<script>

  import LoginForm from '../login-form.vue';

  export default {
    components: {
      LoginForm,
    },
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      submit() {


      }
    }
  }
</script>