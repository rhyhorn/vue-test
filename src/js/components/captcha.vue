<template>
    <div ref="container">asd</div>
</template>
<script>
  const getRecaptcha = () => {
    return new Promise((resolve) => {
      if (window.grecaptcha && window.grecaptcha.render) {
        return resolve(window.grecaptcha);
      }

      const timerId = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          clearInterval(timerId);
          return resolve(window.grecaptcha);
        }
      }, 200);
    });
  };

  export default {
    props: [
      'siteKey'
    ],
    data() {
      return {
        captcha: null,
        widgetId: null,
      }
    },
    methods: {
      render() {
        this.captcha.render(this.$refs.container, {
          sitekey: this.siteKey
        }, id => {
          this.widgetId = id;
          this.$emit('render', id);
        })
      }
    },
    mounted() {
      getRecaptcha()
        .then((captcha) => {
          this.captcha = captcha;
          console.log(captcha);
          this.render();
        });
    }
  }
</script>