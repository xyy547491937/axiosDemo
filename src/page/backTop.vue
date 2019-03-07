<template>
    <div id="goTop">
        <div class="toTop"  v-show="goTopShow" @click="goTop">
            顶部
        </div>
    </div>
</template>
<script>
    export default {
      name: "goTop",
      data(){
          return{
            scrollTop: '',
            goTopShow:false,
          }
        },
      methods:{
        handleScroll () {
          this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if(this.scrollTop>500){
            this.goTopShow=true
          }else{
              this.goTopShow=false;
          }
        },
        goTop(){
          let timer=null,_that=this;
          cancelAnimationFrame(timer)
          timer=requestAnimationFrame(function fn(){
            if(_that.scrollTop>0){
              _that.scrollTop-=50;
              document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
              timer=requestAnimationFrame(fn)
            }else {
              cancelAnimationFrame(timer);
              _that.goTopShow=false;
            }
          })
        }
      },
      mounted() {
        window.addEventListener('scroll', this.handleScroll);
      },
      destroyed(){
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
</script>
 
<style scoped>
  /* 返回顶部样式 */
.toTop {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  position: fixed;
  bottom: 116px;
  right: 16px;
  z-index: 20;
  border-radius: 100% 100%;
  border: 1px solid #CCCCCC;
  -moz-box-shadow: 0 0 10px 0 #ccc;
  -webkit-box-shadow: 0 0 10px 0 #ccc;
  box-shadow: 0 0 10px 0 #ccc;
  padding-top: 50px;
  background: #fff url("http://img.meiduduo.com/images/topArr.png") no-repeat center .16rem;
  background-size: 26px 28px;
  text-align: center;
  font-size: 22px;
  color: #333333;
}
</style>

    




