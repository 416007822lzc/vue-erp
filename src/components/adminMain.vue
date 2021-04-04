<template>
<el-container class="main">
  <el-header style="height: 50px;">
		<div class="el-header-div1">
			<img height="25" style="vertical-align:middle;vertical-align: -5px;" src="../../public/ikjxc-org-logo-09089e126018f32b5f71726f9cf32dcb2fe132441eb226a7102c19e85c890e39.png" />
			<span>爱客进销存</span>
		</div>
    <div style="float:right;">
      <div class="demo-basic--circle">
      <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
    </div>

    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
		<el-menu style="text-align: left"
				background-color="#26344b"
				text-color="#fff"
				router
				>
			<el-menu-item index="/workbench">
			<i class="el-icon-menu"></i>
			<span slot="title">工作台</span>
			</el-menu-item>
			<el-menu-item index="2">
			<i class="el-icon-document"></i>
			<span slot="title">采购管理</span>
			</el-menu-item>
		<el-submenu index="2">
			<template slot="title">
			<i class="el-icon-pie-chart"></i>
			<span>销售管理</span>
			</template>
  
			<el-menu-item index="/sale/addsale">
				<span style="margin-left: 20px;">新增订单</span>
			</el-menu-item>
 
    
			<el-menu-item index="/sale/adddelivery">
				<span style="margin-left: 20px;">新增出库单</span>
			</el-menu-item>
   
  
			<el-menu-item index="/sale/addreturngoods">
				<span style="margin-left: 20px;">新增退货单</span>
			</el-menu-item>
  
			<el-menu-item index="/sale/salelist">
			<span style="margin-left: 20px;">订单列表</span>
			</el-menu-item>
		</el-submenu>
		
		<el-menu-item index="4">
		<i class="el-icon-setting"></i>
		<span slot="title">库存管理</span>
		</el-menu-item>
		<el-menu-item index="5">
		<i class="el-icon-setting"></i>
		<span slot="title">资金管理</span>
		</el-menu-item>
		<el-menu-item index="6">
		<i class="el-icon-setting"></i>
		<span slot="title">基础资料</span>
		</el-menu-item>
		</el-menu>
	</el-aside>
    <el-container>
      <el-main>
		<router-view></router-view>
		</el-main>
   </el-container>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>

<style scoped="scoped">
	.main{
		width: 100%;
		height: 100%;
	}
.el-header, .el-footer {
    background-color: #444a63;
    color: #333;
    text-align: left;
    line-height: 40px;
	
  }
  
  .el-aside {
    background-color: #1f2e46;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
.el-header>.el-header-div1{
	padding-top: 4px;
	padding-left: 15px;
	font-size: 20px;
	font-weight: bold;
	color: #fff;
}
.el-header>.el-header-div1>span{
	margin-left: 5px;
	margin-top: -5px;
}
.el-header>img{
	margin-right: 5px;
	vertical-align: -8px;
}
.el-header-div1{
  float: left;
}
</style>
