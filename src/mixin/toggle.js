export const toggle = {
  data() {
    return {
      isShowing: false
    }
  },
  mounted() {
    console.log('hello from mixin!')
    console.log(this.isShowing)
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing
    }
  },
}
