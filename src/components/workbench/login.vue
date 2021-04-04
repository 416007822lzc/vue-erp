<template>
  <div>
    <div class="videoStyle">
      <img width="100%" height="auto" :src="imgUrl">
    </div>
    <div>
      <transition name="el-fade-in-linear">
        <div class="loginWin" v-show="show" :style="{right:left1}">
          <h2 class="loginTitle">员工登录</h2>
          <div>
            <div>
              <el-input class="inputStyle" v-model="user" placeholder="请输入工号" show-word-limit maxlength="11"></el-input>
              <el-input placeholder="请输入密码" maxlength="6" show-word-limit v-model="pass" show-password></el-input>
              <div style="text-align: right;">
                <el-link class="inputStyle" type="primary" :underline="false" @click="exitShow(1)">->考试入口</el-link>
              </div>
              <el-row>
                <el-button style="width: 300px;" type="primary" round  @click="login()">登录</el-button>
              </el-row>
            </div>
          </div>
        </div>
      </transition>
      <transition name="el-fade-in-linear">
        <div class="loginWin" v-show="!show" :style="{right:left2}">
          <h2 class="loginTitle">考试登录</h2>
          <div>
            <div>
              <el-input class="inputStyle" v-model="user" placeholder="请输入身份证号"></el-input>
              <el-input placeholder="请输入密码" v-model="pass" show-password></el-input>
              <div style="text-align: right;">
                <el-link class="inputStyle" type="primary" :underline="false" @click="exitShow(2)">->员工入口</el-link>
              </div>
              <el-row>
                <el-button style="width: 300px;" type="primary" round>登录</el-button>
              </el-row>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return{
      sWidth:'1536px',
      sHeight:'698px',
      user:"",
      pass:"",
      show:true,
      left1:"230px",
      left2:"350px",
      imgUrl:require("../../assets/lzc/img/login.jpg")
    }
  },
  methods:{
    exitShow(id){
      this.show=!this.show;
      if(id===1){
        this.left1="350px";
        this.left2="230px";
      }
      if(id===2){
        this.left1="230px";
        this.left2="350px";
      }
      this.user="";
      this.pass="";
    },
    login(){
      if(this.user.length>=4&&this.pass.length==6){
        this.$http.post("http://localhost:8080/login/"+this.user+"/"+this.pass)
            .then((success)=>{
              var data=success.data;
              if(data.state=="Error"){
                this.$message.error(data.remarks);
              }else{
                sessionStorage.setItem("staffId",data.data);
                this.$router.push("/elmui");
              }
            }).catch((err)=>{
          console.log(err);
        });
      }else{
        this.$message.error("格式不符合规范");
      }
    }
  }
}
</script>

<style scoped="scoped">

.loginWin{
  width: 300px;
  height: 400px;
  background: rgba(255,255,255,0.6);
  border: 0;
  border-radius: 5px;
  position: absolute;
  right: 230px;
  top: 50%;
  transform: translateY(-50%);
  padding: 40px;
  z-index: 100;
  transition: all 0.5s;
}
.loginTitle{
  font-weight: 400;
  text-align: center;
  margin-bottom: 40px;
}
.inputStyle{
  margin: 10px 0;
}
.videoStyle{
  width: 100%;
  height: 100%;
  position: absolute;
  /*overflow: hidden;*/
}
</style>
