<template>
  <el-container class="tiku">
    <div class="tiku_table">
      <div class="tiku_top">
        <div STYLE="margin-left: 5px">
          <el-select v-model="value" placeholder="请选择" @change="chaxun">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tiku_search" style="margin-left: 20px;width: 50%">
          <el-input v-model="input_sousuo" placeholder="请输入内容">
          </el-input>
          <i class="el-icon-search" @click="sousuo"></i>
        </div>
        <div style="margin-left: 60px">
          <el-button type="danger" @click="delExmin">删除</el-button>
        </div>
      </div>
      <div style="position: relative;">
        <el-table
            :data="tableData"
            border
            @selection-change="handleSelectionChange"
            style="width: 100%">
          <el-table-column
              fixed
              type="selection"
              width="50">
          </el-table-column>
          <el-table-column
              fixed
              prop="sid"
              sortable
              label="试卷编号"
              width="130">
          </el-table-column>
          <el-table-column
              prop="papername"
              label="试卷名"
              width="140">
          </el-table-column>
          <el-table-column
              prop="sname"
              label="出卷人"
              width="140">
          </el-table-column>
          <el-table-column
              prop="examinationtime"
              label="考试时间"
              sortable
              width="130">
          </el-table-column>
          <el-table-column
              prop="qishirq"
              label="起始日期"
              sortable
              width="150">
          </el-table-column>
          <el-table-column
              prop="jieshurq"
              label="结束日期"
              sortable
              width="150">
          </el-table-column>
          <el-table-column
              prop="shuom"
              label="说明"
              width="300">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <el-popconfirm
                  confirm-button-text='题目'
                  confirm-button-type="Primary"
                  cancel-button-text='试卷信息'
                  cancel-button-type="Primary"
                  icon="el-icon-info"
                  icon-color="red"
                  @confirm="bianjiTimu(scope.row.sid)"
                  @cancel="bianjiXinxi(scope.row)"
                  title="请选择要编辑的部分">
                <el-button type="text" plain slot="reference" >
                  <i title="编辑" style="font-size: 20px" class="el-icon-edit-outline"></i>
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" >
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
        <div style="height: 40px;"></div>
      </div>
    </div>
  </el-container>
</template>

<script>

export default {
  name: "qestpaperlist",
  components:{

  },
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      options: [
        {
          value: '全部',
          label: '全部'
        },{
          value: '试卷编号',
          label: '试卷编号'
        },
        {
          value: '出卷人',
          label: '出卷人'
        },
        {
          value: '试卷名',
          label: '试卷名'
        }],
      input_sousuo: '',
      id: 0,
      cha: '',
      chujuanren: null,
      shijuanming: null,
      currentPage4: 1,
      pagesize: 5,
      total: 0,
      value: '',
      idS: [],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      shijuanxx:{}
    }
  },
  created() {
    this.handleCurrentChange(1);
  },
  methods: {
    chaxun(val) {//选择需要查询的条件
      this.cha = val
      if(val==='全部'){
        this.handleCurrentChange(1);
      }
    },
    /**
     *选中获取试卷id
     */
    handleSelectionChange(val) {
      if (this.idS != null) {
        this.idS = []
      }
      for (let i = 0; i < val.length; i++) {
        this.idS.push(val[i].sid)
      }
    },
    /**
     * 获得选中试卷
     * 删除
     */
    delExmin() {
      let idS=this.idS
      this.$http.get('EtC/delALLEtM', {params:{"idS":idS},paramsSerializer: params => {
          return this.$qs.stringify(params, { indices: false })
        }}).then((r)=>{
        if (r.data.code===200){
          this.$message.success(r.data.message)
          this.reload();//调用全局刷新方法
        }else {
          this.$message.error(r.data.message)
        }
      })
    },
    /**
     * 条件搜索
     */
    sousuo() {
      if (this.cha === '试卷编号') {
        var numReg = /^[0-9]*$/
        var numRe = new RegExp(numReg)
        if (!numRe.test(this.input_sousuo)) {
          this.$message({
            type: 'warning',
            message: '请输入数字 ',
            duration: 10000,
            showClose: true,
          })
          return false
        }
        this.id = this.input_sousuo;
        this.findEtM( this.pagesize,this.currentPage4,this.input_sousuo, this.chujuanren, this.shijuanming)
      } else if (this.cha === '出卷人') {
        this.chujuanren = this.input_sousuo
        this.findEtM( this.pagesize, this.currentPage4,this.id, this.input_sousuo, this.shijuanming)
      } else if (this.cha === '试卷名') {
        this.shijuanming = this.input_sousuo
        this.findEtM( this.pagesize, this.currentPage4,this.id, this.chujuanren, this.input_sousuo)
      }else{
        this.$message.error("请选择条件")
      }
    },
    //监听 条数 改变事件
    handleSizeChange(val) {
      this.pagesize = val
      this.findEtM(val,this.currentPage4,  this.id, this.chujuanren, this.shijuanming)
    },
    // 监听 页码值 改变事件
    handleCurrentChange(val) {
      this.currentPage4 = val
      this.findEtM( this.pagesize,val, this.id, this.chujuanren, this.shijuanming)
    },
    /**
     * 条件搜索请求
     * @param page 每页条数
     * @param limit 初始页
     * @param sid 试卷Id
     * @param papername 出卷人
     * @param sname 试卷名
     */
    findEtM(page, limit, sid, papername, sname) {
      this.$http.get("EtC/findEtM", {params: {page, limit, sid, papername, sname}}).then((r) => {
        if(r.data.code===200){
          if(r.data.data.list==''){
            this.$message.error('暂无数据')
          }else{
            this.tableData = r.data.data.list
            this.total = r.data.data.total
            this.currentPage4 = limit
            this.$message.success('数据加载成功')
          }
        }else{
          this.$message.error('暂无此卷')
        }
        this.id='';
        this.chujuanren='';
        this.shijuanming='';
      })
    }
  }
}
</script>

<style scoped>
.el-icon-search {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 18px;
}

.tiku {
  width: 100%;
  height: 100%;
  border: 0px solid darkslategray;
  box-shadow: darkgrey 5px 5px 15px 3px;
  background-color: #ffffff;
}

.tiku_top button {
  padding: 12px 40px;
  margin-left: 0px;
}

.tiku_tixing label {
  margin-right: 10px;
}

.tiku_table {
  width: 100%;
}

.block {
  position: absolute;
  left: 35%;
  bottom: 0px;
}

.tiku_search {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 80%;
  margin-bottom: 20px;
}

.tiku_top {
  width: 100%;
  margin-top: 20px;
  display: flex;
}
</style>
