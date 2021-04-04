<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" offset="0.5"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header"  class="clearfix">
            <span>卡片名称</span>
            <el-dropdown style="float: right" trigger="click"  @command="handleCommand">
            <span class="el-dropdown-link">
              {{saleT}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="天" >按天</el-dropdown-item>
                <el-dropdown-item command="周" >按周</el-dropdown-item>
                <el-dropdown-item command="月">按月</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="text item"><span v-text="sellDate.previously"></span>
            <div class="ik-pull-right">
              <span v-text="sale.beforeM"></span>
              <span class="stats__badge">3笔</span>
            </div>
          </div>
          <div class="text item"><span v-text="sellDate.now"></span>
            <div class="ik-pull-right">
              <span v-text="sale.afterM"></span>
              <span class="stats__badge">3笔</span>
            </div>
          </div>
        </el-card>
      </div></el-col>
      <el-col :span="6" offset="0.5"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header"  class="clearfix">
            <span>卡片名称</span>
            <el-dropdown style="float: right" trigger="click"  @command="handleCommand">
            <span class="el-dropdown-link">
              {{saleT}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="天" >按天</el-dropdown-item>
                <el-dropdown-item command="周" >按周</el-dropdown-item>
                <el-dropdown-item command="月">按月</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="text item"><span v-text="sellDate.previously"></span>
            <div class="ik-pull-right">
              <span v-text="sale.beforeM"></span>
              <span class="stats__badge">3笔</span>
            </div>
          </div>
          <div class="text item"><span v-text="sellDate.now"></span>
            <div class="ik-pull-right">
              <span v-text="sale.afterM"></span>
              <span class="stats__badge">3笔</span>
            </div>
          </div>
        </el-card>
      </div></el-col>
      <el-col :span="6" offset="0.5"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header"  class="clearfix">
            <span>卡片名称</span>
          </div>
          <div class="text item"><span>总量</span>
            <div class="ik-pull-right">
              <span v-text="sale.beforeM"></span>
            </div>
          </div>
          <div class="text item"><span>总成本</span>
            <div class="ik-pull-right">
              <span v-text="sale.afterM"></span>
            </div>
          </div>
        </el-card>
      </div></el-col>
      <el-col :span="6" offset="0.5"><div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header"  class="clearfix">
            <span>卡片名称</span>
          </div>
          <div class="text item"><span>总量</span>
            <div class="ik-pull-right">
              <span v-text="sale.beforeM"></span>
            </div>
          </div>
          <div class="text item"><span>总成本</span>
            <div class="ik-pull-right">
              <span v-text="sale.afterM"></span>
            </div>
          </div>
        </el-card>
      </div></el-col>
    </el-row>
    <el-row >
      <el-col :span="17" style="margin:0 20px 0 20px;padding: 5px">
        <el-tabs class="work-tabs"  v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待审批" name="awaitApprove">
              <el-table
                  :data="awaitApproveData"
                  style="width: 100%"
                  height="400">
                <el-table-column
                    fixed
                    prop="id"
                    label="单据编号">
                </el-table-column>
                <el-table-column
                    prop="invoicesType"
                    label="单据类型">
                </el-table-column>
                <el-table-column
                    prop="supplierName"
                    label="客户/供应商">
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="金额">
                </el-table-column>
                <el-table-column
                    prop="submitter"
                    label="提交人">
                </el-table-column>
                <el-table-column
                    prop="submitterTime"
                    label="提交时间">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作">
                </el-table-column>
              </el-table>

          </el-tab-pane>
          <el-tab-pane label="已审批" name="finishApprove">
            <el-table
                :data="finishApproveData"
                style="width: 100%"
                height="400">
              <el-table-column
                  fixed
                  prop="date"
                  label="日期">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="姓名">
              </el-table-column>
              <el-table-column
                  prop="province"
                  label="省份">
              </el-table-column>
              <el-table-column
                  prop="city"
                  label="市区">
              </el-table-column>
              <el-table-column
                  prop="address"
                  label="地址">
              </el-table-column>
              <el-table-column
                  prop="zip"
                  label="邮编">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待出库" name="awaitEnterStock">
            <el-table
                :data="awaitApproveData"
                style="width: 100%"
                height="400">
              <el-table-column
                  fixed
                  prop="id"
                  label="单据编号">
              </el-table-column>
              <el-table-column
                  prop="invoicesType"
                  label="单据类型">
              </el-table-column>
              <el-table-column
                  prop="supplierName"
                  label="客户/供应商">
              </el-table-column>
              <el-table-column
                  prop="money"
                  label="金额">
              </el-table-column>
              <el-table-column
                  prop="submitter"
                  label="提交人">
              </el-table-column>
              <el-table-column
                  prop="submitterTime"
                  label="提交时间">
              </el-table-column>
              <el-table-column
                  prop="operation"
                  label="操作">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待入库" name="awaitLeaveStock">
            <el-table
                :data="awaitApproveData"
                style="width: 100%"
                height="400">
              <el-table-column
                  fixed
                  prop="id"
                  label="单据编号">
              </el-table-column>
              <el-table-column
                  prop="invoicesType"
                  label="单据类型">
              </el-table-column>
              <el-table-column
                  prop="supplierName"
                  label="客户/供应商">
              </el-table-column>
              <el-table-column
                  prop="money"
                  label="金额">
              </el-table-column>
              <el-table-column
                  prop="submitter"
                  label="提交人">
              </el-table-column>
              <el-table-column
                  prop="submitterTime"
                  label="提交时间">
              </el-table-column>
              <el-table-column
                  prop="operation"
                  label="操作">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="6" class="select-col">
        <el-row>
          <div>查询</div>
        </el-row>
        <el-row>
          <el-col :span="10">单据查询：</el-col>
          <el-col :span="10"><el-input placeholder="请输入产品名称"  clearable></el-input></el-col>
          <el-col :span="2"><el-button  type="primary" icon="el-icon-search" ></el-button></el-col>
        </el-row>
        <el-row>
          <el-col :span="10">单据查询：</el-col>
          <el-col :span="10"><el-input placeholder="请输入产品名称"  clearable></el-input></el-col>
          <el-col :span="2"><el-button  type="primary" icon="el-icon-search" ></el-button></el-col>
        </el-row>
        <el-row>
          <el-col :span="10">单据查询：</el-col>
          <el-col :span="10"><el-input placeholder="请输入产品名称"  clearable></el-input></el-col>
          <el-col :span="2"><el-button  type="primary" icon="el-icon-search" ></el-button></el-col>
        </el-row>
        <el-row>
          <el-col :span="10">单据查询：</el-col>
          <el-col :span="10"><el-input placeholder="请输入产品名称"  clearable></el-input></el-col>
          <el-col :span="2"><el-button  type="primary" icon="el-icon-search" ></el-button></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-row class="fast-row ">
        <el-col :span="18" class="fast-row-title">
          <span>快捷功能</span>
        </el-col>
      </el-row>
      <el-row class="fast-row">

        <el-col :span="6">
          <div>
            <a class="col-a"><i class="el-icon-shopping-cart-full"></i><span style="display: block">采购入库</span></a>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <a class="col-a"><i class="el-icon-shopping-cart-full"></i><span style="display: block">采购入库</span></a>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <a class="col-a"><i class="el-icon-shopping-cart-full"></i><span style="display: block">采购入库</span></a>
          </div>
        </el-col>
      </el-row>
      <el-row class="fast-row">

        <el-col :span="6">
          <div>
            <a class="col-a"><i class="el-icon-shopping-cart-full"></i><span style="display: block">采购入库</span></a>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <a class="col-a"><i class="el-icon-shopping-cart-full"></i><span style="display: block">采购入库</span></a>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <a class="col-a"><i class="el-icon-shopping-cart-full"></i><span style="display: block">采购入库</span></a>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "workbench",
  data() {
    return {
      // a:"123"
      saleT: "按天",
      sellDate:{now:"今天",previously:"昨天"},
      sale: {afterTime:"",afterM:100,beforeTime:"",beforeM:"100"},
      activeName: 'awaitApprove',
      finishApproveData:[],
      awaitApproveData:[],

    };
  },
  methods:{
    handleCommand(c){
      // eslint-disable-next-line no-empty
      this.saleT = "按" + c;
      if (c === "天"){
        this.sellDate.now = "今" + c;
        this.sellDate.previously = "昨" + c;
      }else {
        this.sellDate.now = "本"+ c;
        this.sellDate.previously = "上"+ c;

      }
      this.sale.afterTime = this.sellDate.now;
      this.sale.beforeTime = this.sellDate.previously;
      // this.sellDate = c;
      // alert(c)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  line-height: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  line-height: 10px;
}
.clearfix:after {
  clear: both
}

.box-card {
  text-align: left;
  /*width: 250px;*/
}

.el-card__header{
  line-height: 10px;
  /*text-align: left;*/
  /*width: 200px;*/
}
.ik-pull-right{
  float: right;
}
.stats__badge{
  min-width: 48px;
  line-height: 16px;
  text-align: center;
  margin-left: 10px;
  font-size: 12px;
  border-radius: 2px;
  vertical-align: middle;
  display: inline-block;
  border: 1px solid #bcf2d4;
  background-color: #e5fff1;
  color: #66d598;
}
.work-tabs{
  background: white;
  border-radius: 1%;
}
.select-col{
  background-color: white;
  border-radius: 5px;
  margin:20px 20px 20px 0 ;
  padding: 5px 5px;
}
.col-a{
  /*position: relative;*/
  border: 1px solid #fcfcfc;
  min-height: 1px;
  background: transparent;
  display: block;
  float: left;
  padding: 20px 0 20px;
  color: #333333;
  text-decoration: none;
  text-align: center;
  background-color: white;
  border-bottom: 1px solid #eeeff3;
  border-right: 1px solid #eeeff3;
  width: 100%;
  transition: color 0.3s ease;
}
.col-a:hover{
  background-color: #fafafa;
}
.fast-row{
  margin-bottom: 0;
}
.fast-row-title{
  background-color: #eaeaea;
  padding: 5px;
  font-weight: bold;
  font-size: 14px;
}

</style>