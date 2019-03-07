<template>
  <div class="test">
    <div class="content">
 <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>--- {{ defaultHeight }} ---</p>
    <p>--- {{ activeHeight }} ---</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>2</p>
    <p>2</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>2</p>
    <p>2</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    <p>3</p>
    </div>

    <div class="footer"  id="footer">
      <input @click="aa" @focus="onfocus" @blur="onblur" type="text">
    </div>


  </div>
</template>

<script>

export default {

  data () {
    return {
      defaultHeight: 0,
      activeHeight: 0,
      interval: null
    }
  },
  mounted () {
    // this.defaultHeight = document.body.scrollTop
    this.defaultHeight = window.innerHeight;

  },
  methods: {
    onfocus () {
      // const self = this
      // console.log()
      // this.interval = setInterval(function(){
      //   // console.log(document.body.scrollTop, document.body.scrollHeight)
      //   // self.activeHeight = document.body.scrollHeight;
      //   self.activeHeight = window.innerHeight
      //   // document.body.scrollTop = document.body.scrollHeight;
      // },100)
    },
    aa(){
    setTimeout(function(){
	document.body.scrollTop = document.body.scrollHeight;
},5000);
    },
    onblur () {
      // clearInterval(this.interval);
      // document.body.scrollTop = this.defaultHeight;

    }
  }
}
</script>

<style scoped>
.test {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}
.footer {
 position: fixed;
  bottom: 0;
}
.content{
  flex: 1
}
</style>
