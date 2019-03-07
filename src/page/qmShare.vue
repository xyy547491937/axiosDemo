<template>
    <div class="qm_share">
        <div class="titlebox">
            <p>我在“胚豆”</p>
            <p>看别人的故事，写自己的日记</p>
            <p>赚了<span>{{getMoney}}元</span></p>
        </div>
        <div :class="isShowenvelope?'qm_share_content':'qm_share_content tops'">
            <p  v-show="isShowenvelope">{{envelopeMoney}}元新人红包</p>
            <p>首单消费返现</p>
            <p>登录领零花钱</p>
        </div>
        <div class="ewm">
            <figure class="img">
                <img :src="ewmImage" alt="">
            </figure>
        </div>
    </div>
</template>
<script>
import { http } from "../api/pageApi.js";
export default {
    data(){
        return{
            getMoney: null,
            title: '',
            envelopeMoney: null,
            isShowenvelope: true,
            ewmImage: ''
        }
    },
    created(){
        this.custId = parseInt(this.$route.query.userId);
        console.log(this.$route)
        this.queryActivityByCustId();
        this.getshareTasksave();
        this.getShareEnvelopeDeta();
    },
    methods: {
        queryActivityByCustId(cityId) {//新人红包
            var obj = {
                custId: this.custId
            }
            http("/redPacketActivity/queryActivityByCustId", obj).then(res => {
                if (res.code === 1) {
                    this.envelopeMoney = parseFloat(res.data.singlePacketAmount)
                    this.isShowenvelope = true;
                }else if(res.code === 0){
                    this.isShowenvelope = false;
                }
            });
        },
        getShareEnvelopeDeta(){//晒收入详细页面信息
            var obj={
                custId: this.custId
            }
            http("/customerPacket/getShareEnvelopeDetails", obj).then(res => {
                if (res.code === 1) {
                    this.getMoney = res.data.totalEnvelopeIncome;
                    console.log('晒收入详细页面信息',res);
                }
            });
        },
        getshareTasksave(){//二维码获取
            var params={
                    custId: this.custId,
                    path: 'pages/index',
                    packetActivityId: null
                }
            var obj={
                custId: this.custId
            }
            http("/customerPacket/allReceiveMoneyList", obj).then(res => {
                if (res.code === 1) {
                    for(let i=0;i<res.data.length;i++){
                        if(res.data[i].activityType == 5){
                            params.packetActivityId = res.data[i].id;
                        }
                    }
                }
                http("/shareTask/saveForShareIncome", params).then(res => {
                    if (res.code === 1) {
                        console.log('用户分享',res);
                        this.ewmImage = res.data.qrcodePath;
                        this.taskId = res.data.taskId;
                    }
                });
            })
        
        },
    }
}
</script>
<style lang="less" scoped>
.qm_share{
    width: 100%;
    height: 100%;
    background: url('http://img.meiduduo.com/images/quanmin/qm_3.png') no-repeat;
    background-size: 100% 100%;
    font-size: PingFangSC-Semibold;
    .titlebox{
        width: 100%;
        color: #FFFFFF;
        font-size: 38px;
        text-align: center;
        line-height: 55px;
        font-weight: bold;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%,0%);   
        span{
            background: #FEE26F;
            color: #FF94BE;
            padding: 0 5px;
            margin-left: 3px;
        } 
    }
    .qm_share_content{
        color: #FF4691;
        font-size: 34px;
        text-align: center;
        line-height: 50px;
        letter-spacing: 3px;
        font-weight: bold;
        position: absolute;
        top: 30%;
        left: 53%;
        transform: translate(-50%,0%);  
    }
    .tops{
        top: 33%;
    }
    .ewm{
        min-width: 330px;
        height: 330px;
        background: #F5F5F5;
        position: absolute;
        top:52%;
        left: 50%;
        transform: translate(-50%,0%);
        text-align: center;
        .img{
            width: 290px;
            height: 290px;
            margin-top: 20px;
            margin-left: 20px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
