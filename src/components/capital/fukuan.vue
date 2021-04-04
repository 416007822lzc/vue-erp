<template>
  <div>
    <div class="top_div">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
        <el-breadcrumb-item>产品与分类 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--筛选查询-->
    <el-card style="margin-top: 20px;">
      <!--模糊查询-->
      <el-input placeholder="请输入产品名称" v-model="lptc.proName" clearable style="width: 180px"></el-input>
      <el-button  type="primary" icon="el-icon-search" @current-change="pageChange" @click="initData()">
      </el-button>
      <!--打印导入导出-->
      <el-dropdown style="float:right">
        <el-button icon="el-icon-more"></el-button>
        <el-dropdown-menu slot="dropdown">
          <download-excel  style="margin-left: 20px;" class="export-excel-wrapper" :data="tableData" :fields="json_fields"
                           name="产品表.xls">
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button  icon="el-icon-document-add" type="text" style="color: #333333">导出</el-button>
          </download-excel>
          <el-dropdown-item>
            <el-button   icon="el-icon-printer" v-print="'#printTest'" type="text" style="color: #333333">打印</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!--新增产品-->
      <div style="float:right;">
        <el-button type="primary" icon="el-icon-plus" @click="formVistable=true">新增产品</el-button>
      </div>

      <!--筛选-->
      <!--高级查询-->
      <el-tabs v-model="activeName" style="margin-top: 0px" @tab-click="handleClick">
        <el-button type="primary" size="mini" @click="xy=!xy">筛选</el-button>
        <el-button type="primary" size="mini" @click="clearSearch()">清空筛选</el-button>

        <!--新增产品类型-->
        <el-button  type="primary"  size="mini" @click="lxshow=!lxshow,leixVistable=true">新增类型</el-button>
        <el-tree  v-if="lxshow" :data="leixing"  default-expand-all node-key="id" :props="classifyProps"
                  :expand-on-click-node="false">
          <span  class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{data.lxName}}</span>
          </span>
        </el-tree>

        <!--筛选-->
        <ul style="background:white;margin-top: 10px" class="khul" v-show="xy">
          <li>
            产品类型：
            <el-select v-model="lptc.lzyLeixingByid.lxName" @change="initData()" placeholder="请选择" size="mini">
              <el-option v-for="item in leixing" :key="item.lxId" :label="item.lxName" :value="item.lxName">
              </el-option>
            </el-select>
          </li>
          <li>
            产品来源：
            <el-select v-model="lptc.lzyProductTypeByPtId.ptName" @change="initData()" placeholder="请选择" size="mini">
              <el-option v-for="em in chanpData" :key="em.ptId" :label="em.ptName" :value="em.ptName">
              </el-option>
            </el-select>
          </li>
          <li>
            产品状态：
            <el-radio-group v-model="lptc.proRegion" size="mini" @change="initData()">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="2">上架</el-radio-button>
              <el-radio-button label="1">下架</el-radio-button>
            </el-radio-group>
          </li>
        </ul>
      </el-tabs>


      <!--div 打印-->
      <div id="printTest" style="margin-top: 10px;">
        <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" border
                  :header-cell-style="{'text-align':'center','background':'#DAE2EF','color':'gray'}" :cell-style="{'text-align':'center'}"
                  @click="drawer=true">
          <el-table-column label="编号" prop="proId"></el-table-column>
          <el-table-column prop="proName" label="产品名称"></el-table-column>
          <el-table-column prop="proPhoto" label="图片">
            <template slot-scope="scope">
              <span v-if="scope.row.proPhoto != null"><img :src="URL+scope.row.proPhoto" height="60px" /></span>
              <span v-else-if="scope.row.proPhoto == null"></span>
            </template>
          </el-table-column>
          <el-table-column prop="proState" label="产品成本"></el-table-column>
          <el-table-column prop="proPrice" label="产品价格"></el-table-column>
          <el-table-column prop="lzyProductTypeByPtId.ptName" label="来源"></el-table-column>
          <!--          <el-table-column prop="proUnit" label="分类"></el-table-column>-->
          <el-table-column prop="proRegion" label="商品状态">
            <template slot-scope="scope">
              <span v-if="scope.row.proRegion==0">预上架</span>
              <span v-if="scope.row.proRegion==1">下架</span>
              <span v-if="scope.row.proRegion==2">上架</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button  size="mini" icon="el-icon-edit" @click="handleupdate(scope.$index,scope.row)" />
              </el-tooltip>
              <el-tooltip content="上架" placement="top">
                <el-button  size="mini" icon="el-icon-top-left" @click="Sj(scope.$index,scope.row)" />
              </el-tooltip>
              <el-tooltip content="下架" placement="top">
                <el-button  size="mini" icon="el-icon-bottom-right" @click="xj(scope.$index,scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="fy_div">
        <el-pagination background :page-size="pageSize" :current-page.sync="currPage" @current-change="pageChange"
                       layout="prev, pager, next,jumper" :total="totalSize">
        </el-pagination>
      </div>
    </el-card>


    <!--表单 新增-->
    <el-dialog title="产品详情" width="900px" :visible.sync="formVistable" @close="formVistable = false,czaddxz()">
      <el-form :model="addfrom" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名称：" prop="proName">
          <el-input v-model="addfrom.proName" size="mini" style="width: 130px"></el-input>
        </el-form-item>

        <!-- 产品select选择器-->
        <el-form-item prop="lzyProductTypeByPtId" label="产品来源:" style="margin-left: 430px;margin-top:-63px">
          <el-select size="mini" v-model="addfrom.lzyProductTypeByPtId.ptId" placeholder="请选择产品来源" style="width:200px;">
            <el-option v-for="item in chanpData" :key="item.ptId" :label="item.ptName" :value="item.ptId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品成本：" prop="proState">
          <el-input v-model="addfrom.proState" size="mini" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="产品价格：" prop="proPrice" style="margin-left: 430px;margin-top: -63px">
          <el-input v-model="addfrom.proPrice" size="mini" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="产品类型：" prop="proUnit">
          <el-select v-model="addfrom.lzyLeixingByid.lxId" size="mini" placeholder="请选择产品类型" style="width:200px;">
            <el-option v-for="item in leixing" :key="item.lxId" :label="item.lxName" :value="item.lxId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品数量：" prop="proSl">
          <el-input v-model="addfrom.proSl" size="mini" style="width:130px"></el-input>
        </el-form-item>
        <el-form-item label="是否上架：" prop="proRegion" style="margin-left: 430px;margin-top: -63px">
          <el-radio-group v-model="addfrom.proRegion">
            <el-radio :label="1">下架</el-radio>
            <el-radio :label="2">上架</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--图片上传-->
        <p style="margin-bottom: 10px;margin-left: 17px;">产品图片：</p>
        <el-upload v-model="addfrom.proPhoto" class="upload-demo" drag action="" :show-file-list="false" :http-request="uploadImg"
                   :on-change="echoImg" :auto-upload="true" multiple style="margin-bottom: 20px;margin-left: 100px">
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 10px solid #dddddd"></i>
          <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-form-item label="产品说明：" prop="proDescription">
          <el-input type="textarea" v-model="addfrom.proDescription"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="czaddxz(),formVistable = false">取 消</el-button>
        <el-button type="primary" @click="addxz()">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改-->
    <!-- 文本能选择但是无法修改 readonly="readonly"-->
    <!--所有禁用属性 通用  :disabled="true"-->
    <el-dialog title="编辑" width="900px" :visible.sync="upVistable" @close="upVistable = false,updateimg()">
      <el-form :model="upfrom" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名称：" prop="proName">
          <el-input :disabled="isAble" v-model="upfrom.proName" size="mini" style="width: 130px"></el-input>
        </el-form-item>

        <el-form-item label="产品成本：" prop="proState">
          <el-input :disabled="isAble" v-model="upfrom.proState" size="mini" style="width: 130px"></el-input>
        </el-form-item>

        <!-- 产品select选择器-->
        <el-form-item prop="lzyProductTypeByPtId" label="产品来源:" style="margin-left: 430px;margin-top:-63px">
          <el-select size="mini" v-model="upfrom.lzyProductTypeByPtId.ptId" placeholder="请选择产品来源" style="width:200px;">
            <el-option v-for="item in chanpData" :key="item.ptId" :label="item.ptName" :value="item.ptId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品数量：" prop="proSl">
          <el-input :disabled="isAble" v-model="upfrom.proSl" size="mini" style="width: 150px"></el-input>
        </el-form-item>

        <el-form-item label="产品价格：" prop="proPrice" style="margin-left: 430px;margin-top: -63px">
          <el-input :disabled="isAble" v-model="upfrom.proPrice" size="mini" style="width: 150px"/>
        </el-form-item>

        <el-form-item label="产品类型：" prop="proUnit">
          <el-select :disabled="isAble" v-model="upfrom.lzyLeixingByid.lxId" size="mini" placeholder="请选择产品类型" style="width:200px;">
            <el-option v-for="item in leixing" :key="item.lxId" :label="item.lxName" :value="item.lxId">
            </el-option>
          </el-select>
        </el-form-item>

        <!--文件上传-->
        <p style="margin-bottom: 10px;margin-left: 17px;">产品图片：</p>
        <el-upload class="avatar-uploader" v-model="upfrom.proPhoto" drag action="" :show-file-list="false"
                   :http-request="uploadImg" :on-change="echoImg" :auto-upload="true" multiple style="margin-bottom: 20px;margin-left: 100px">
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px solid #dddddd"></i>

        </el-upload>

        <el-form-item label="产品说明：" prop="proDescription">
          <el-input :disabled="isAble" type="textarea" v-model="upfrom.proDescription"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateimg(),upVistable=false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>

    <!--上架商品-->
    <el-dialog title="提示" :visible.sync="sjVistable" width="30%">
      <span>是否上架此商品</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sjVistable = false">取 消</el-button>
        <el-button type="primary" @click="Shanj()">确 定</el-button>
      </span>
    </el-dialog>

    <!--下架商品-->
    <el-dialog title="提示" :visible.sync="xjVistable" width="30%">
      <span>是否下架此商品</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xjVistable = false">取 消</el-button>
        <el-button type="primary" @click="Xiajia()">确 定</el-button>
      </span>
    </el-dialog>

    <!--添加产品分类-->
    <el-dialog title="新增产品分类" width="500px"
               :visible.sync="leixVistable"
               @close="lxshow=!lxshow,leixVistable = false">
      <el-form :model="addLeix"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称：" prop="lxName">
          <el-input v-model="addLeix.lxName" size="mini" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="leixVistable = false">取 消</el-button>
        <el-button type="primary" @click="leixadd()" >确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  let id = 1000;
  import axios from "axios"
  import qs from "qs"
  export default {
    name: "Product",
    data() {
      return {
        //文件上传
        URL: "http://localhost:8088/",
        imgUrl: '',
        //导出
        json_fields: {
          "序号": "complaId", //常规字段
          "投诉内容": "complaTszt",
          "对应客户": "lyhCustomerByCustomerId.customerName", //支持嵌套属性
          "投诉类型": "complaFl",
          "投诉日期": "complaTime",
          "接待人": "complaFzr",
          "投诉人": "complaTsr",
          "紧急程度": "complaJjcd",
          "处理结果": "complaCljg",
          "投诉描述": "complaMs"

        },

        //区域控制
        //按钮
        buttonU: [],
        //获取当前登录者
        dlr:{
          userId:'',
          userName:''
        },
        //字段
        buttonZ:'',

        //类型表单新增
        addLeix: {
          lxId: '',
          lxName: '',
        },
        // data: JSON.parse(JSON.stringify(data)),
        isAble: false,
        //增加表单
        addfrom: {
          proName: '',
          proRegion: 1,
          proSl: '',
          proPhoto: '',
          proState: '',
          proPrice: '',
          proCostPrice: '',
          proUnit: '',
          proOperation: '',
          proBarcode: '',
          proModel: '',
          proDetail: '',
          proRemark: '',
          proDescription: '',
          lzyProductTypeByPtId: {
            ptId: '',
          },
          lzyLeixingByid: {
            lxId: '',
          },

        },
        //修改表单
        upfrom: {
          proId: '',
          proName: '',
          proRegion: 1,
          proSl: '',
          proPhoto: '',
          proState: '',
          proPrice: '',
          proCostPrice: '',
          proUnit: '',
          proOperation: '',
          proBarcode: '',
          proModel: '',
          proDetail: '',
          proRemark: '',
          proDescription: '',
          lzyProductTypeByPtId: {
            ptId: '',
          },
          lzyLeixingByid: {
            lxId: '',
          },
        },
        //查新 接收参数:
        lptc: {
          proName: '',
          proUnit: '',
          proRegion: '',
          lzyProductTypeByPtId: {
            ptName: '',
          },
          lzyLeixingByid: {
            lxName: '',
          },
        },
        //类型下拉栏数据源
        leixing: [],
        classifyProps: {
          label: 'lxName',
          id: 'lxId'
        },


        //增加弹窗
        formVistable: false,
        //修改
        upVistable: false,
        drawer: false,
        //上架对话框
        sjVistable: false,
        //下架商品
        xjVistable: false,
        //类型弹框
        leixVistable: false,
        //产品分类显示隐藏
        lxshow:false,
        //筛选显示隐藏
        xy: false,
        ruleForm: {
          name: '',
          region: '1'
        },
        rules: {
          proName: [{
            required: true,
            message: '请输入产品名称',
            trigger: 'blur'
          },
          ],
          lzyProductTypeByPtId: [{
            required: true,
            message: '请选择产品来源',
            trigger: 'blur'
          }, ],
          proState: [{
            required: true,
            message: '请输出产品成本价格',
            trigger: 'blur'
          }, ],
          proPrice: [{
            required: true,
            message: '请输出产品出售价格',
            trigger: 'blur'
          }, ],
          proUnit: [{
            required: true,
            message: '请选择产品类型',
            trigger: 'blur'
          }, ],
          proSl: [{
            required: true,
            message: '请输入产品数量',
            trigger: 'blur'
          }, ],
          proRegion: [{
            required: true,
            message: '产品是否上/下架',
            trigger: 'blur'
          }, ],

        },
        totalSize: 0, //总记录数
        pageSize: 5, //页大小
        currPage: 1, //当前页码
        //所有数据眼
        tableData: [],
        //产品来源地
        chanpData: [],

        formLabelWidth: '100px',
        input: '',

        options3: [{
          label: '',
          options: [{
            value: 'quan',
            label: '全部数据'
          }]
        }, {
          label: '状态',
          options: [{
            value: 'shang',
            label: '上架产品'
          }, {
            value: 'xia',
            label: '下架产品',
          }]
        }],
        value7: '',

        input3: '',
        select: '',
        direction: 'rtl',


        //高级筛选
        activeName: 'first',
      };
    },
    methods: {
      //高级查询帅选
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //清空筛选 高级查询
      clearSearch() {
        this.xj = '';
        this.lptc = {
          proName: '',
          proUnit: '',
          proRegion: '',
          lzyProductTypeByPtId: {
            ptName: '',
          },
          lzyLeixingByid: {
            lxName: '',
          },
        },
          //刷新网页
          this.initData();
      },

      initData() { //当前页，页大小
        this.$axios.get("http://localhost:8088/product-mgr", {
          params: {
            pageNum: this.currPage,
            size: this.pageSize,
            lptc: JSON.stringify(this.lptc)
          }
        })
          .then((v) => {
            this.tableData = v.data.rows;
            this.totalSize = v.data.total;
          }).catch()
      },
      pageChange(p) {
        this.initData(p, this.pageSize)
      },

      //下拉栏 产品来源地
      Xiala() { //下拉
        this.$axios.get("http://localhost:8088/xiala")
          .then((v) => {
            this.chanpData = v.data;
            console.log("，，，，，", this.chanpData)
          })
      },
      //下拉栏 类型
      Xialalx() { //下拉
        this.$axios.get("http://localhost:8088/xl-xiala")
          .then((v) => {
            this.leixing = v.data;
            console.log("，，，，，", this.leixing)
          })
      },

      //类型新增
      leixadd(){
        axios.post("http://localhost:8088//lx-add", this.addLeix)
        this.$confirm('此操作将添加产品类型, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(v => {
            this.$message({ //消息框弹出
              type: 'success',
              message: '添加成功!',
            });
            //刷新网页
            this.Xialalx();
            //点击确定关闭对话框
            this.leixVistable = false;
            // //显示隐藏
            // this.lxshow=!this.lxshow;
            //调用重置表单方法
            this.addLeix={
              lxId: '',
              lxName: '',
            };
          }).catch(err => {
          this.$message('取消操作');
          console.log("输错了");
        });
      },


      //新增重置表单 图片
      czaddxz() {
        //重置表单
        this.addfrom = {
          proName: '',
          proRegion: 1,
          proSl: '',
          proPhoto: '',
          proState: '',
          proPrice: '',
          proCostPrice: '',
          proUnit: '',
          proOperation: '',
          proBarcode: '',
          proModel: '',
          proDetail: '',
          proRemark: '',
          proDescription: '',
          lzyProductTypeByPtId: {
            ptId: '',
          },
          lzyLeixingByid: {
            lxId: '',
          },
        };
        //重置图片
        this.imgUrl = '';
      },
      //新增产品
      addxz() { //添加/修改;
        console.log(this.addfrom);
        // this.tableData.push(this.form1); //增加数据  在表格tableData中显示  数组form1的数据
        axios.post("http://localhost:8088/cp-add", this.addfrom)
        this.$confirm('此操作将添加此商品, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(v => {
            this.$message({ //消息框弹出
              type: 'success',
              message: '添加成功!',
            });
            //刷新网页
            this.initData();
            //点击确定关闭对话框
            this.formVistable = false;
            //调用重置表单方法
            this.czaddxz();
          }).catch(err => {
          this.$message('取消操作');
          console.log("输错了");
        });

      },

      //编辑重置图片方法
      updateimg() {
        this.imgUrl = '';
      },

      handleupdate(index, row) { //修改弹框
        this.index = index;
        this.upVistable = true;
        console.log(this.upfrom);
        this.upfrom.proId = row.proId;
        this.upfrom.proName = row.proName;
        this.upfrom.proRegion = row.proRegion;
        this.upfrom.proSl = row.proSl;
        this.upfrom.proPhoto = row.proPhoto;
        this.upfrom.proState = row.proState;
        this.upfrom.proPrice = row.proPrice;
        this.upfrom.proCostPrice = row.proCostPrice;
        this.upfrom.proUnit = row.proUnit;
        this.upfrom.proOperation = row.proOperation;
        this.upfrom.proBarcode = row.proBarcode;
        this.upfrom.proModel = row.proModel;
        this.upfrom.proDetail = row.proDetail;
        this.upfrom.proRemark = row.proRemark;
        this.upfrom.proDescription = row.proDescription;
        this.upfrom.lzyProductTypeByPtId.ptId = row.lzyProductTypeByPtId.ptId;
        this.upfrom.lzyLeixingByid.lxId = row.lzyLeixingByid.lxId;
        //图片回显
        this.imgUrl = this.URL + row.proPhoto;

      },
      update() { //修改方法
        axios.post("http://localhost:8088//cp-update", this.upfrom)
        this.$confirm('此操作将修改此商品, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(v => {
          //刷新网页
          this.initData();
          //清空图片
          this.updateimg();
          this.$message({ //消息框弹出
            type: 'success',
            message: '修改成功!',
          });
          //关闭对话框
          this.upVistable = false;
        }).catch(err => {
          this.$message('取消操作');
          console.log("输错了");
        });
      },

      Sj(index, row) {
        var sjia = 2;
        this.index = index;
        this.sjVistable = true;
        this.upfrom.proId = row.proId;
        this.upfrom.proRegion = sjia;
        this.upfrom.proName = row.proName;
        this.upfrom.proSl = row.proSl;
        this.upfrom.proPhoto = row.proPhoto;
        this.upfrom.proState = row.proState;
        this.upfrom.proPrice = row.proPrice;
        this.upfrom.proCostPrice = row.proCostPrice;
        this.upfrom.proUnit = row.proUnit;
        this.upfrom.proOperation = row.proOperation;
        this.upfrom.proBarcode = row.proBarcode;
        this.upfrom.proModel = row.proModel;
        this.upfrom.proDetail = row.proDetail;
        this.upfrom.proRemark = row.proRemark;
        this.upfrom.proDescription = row.proDescription;
        this.upfrom.lzyProductTypeByPtId.ptId = row.lzyProductTypeByPtId.ptId;
        this.upfrom.lzyLeixingByid.lxId = row.lzyLeixingByid.lxId;
        this.isAble = false;
      },
      Shanj() {
        axios.post("http://localhost:8088//cp-update", this.upfrom)
          .then(() => {
            this.initData();
            this.$message({ //出现对应执行之后的消息框
              type: 'success',
              message: '上架成功!',
            });
            this.sjVistable = false;
          }).catch(() => {});
      },
      xj(index, row) { //下架商品操作
        this.xjVistable = true;
        var sjia = 1;
        this.index = index;
        this.upfrom.proId = row.proId;
        this.upfrom.proRegion = sjia;
        this.upfrom.proName = row.proName;
        this.upfrom.proSl = row.proSl;
        this.upfrom.proPhoto = row.proPhoto;
        this.upfrom.proState = row.proState;
        this.upfrom.proPrice = row.proPrice;
        this.upfrom.proCostPrice = row.proCostPrice;
        this.upfrom.proUnit = row.proUnit;
        this.upfrom.proOperation = row.proOperation;
        this.upfrom.proBarcode = row.proBarcode;
        this.upfrom.proModel = row.proModel;
        this.upfrom.proDetail = row.proDetail;
        this.upfrom.proRemark = row.proRemark;
        this.upfrom.proDescription = row.proDescription;
        this.upfrom.lzyProductTypeByPtId.ptId = row.lzyProductTypeByPtId.ptId;
        this.upfrom.lzyLeixingByid.lxId = row.lzyLeixingByid.lxId;
        this.isAble = true;
      },
      Xiajia() { //下架商品方法
        axios.post("http://localhost:8088//cp-update", this.upfrom)
          .then(() => {
            //刷新网页
            this.initData();
            this.$message({ //出现对应执行之后的消息框
              type: 'success',
              message: '下架成功!',
            });
            //关闭弹窗
            this.xjVistable = false;
          }).catch(() => {

        });
      },

      //区域按钮控制


      //新增产品类型



      //文件上传
      uploadImg(file) {
        let files = new FormData()
        files.append("file", file.file)
        this.$axios.post("http://localhost:8088/save-uploadImg", files)
          .then(v => {
            // if (v.data != '上传失败' && v.data!='') {
            //   // this.imageUrl=this.$imgs+v.data
            //   this.imageUrl = ''
            // }
          })
      },

      //回显
      echoImg(file, row) {
        console.log(file.raw);
        this.imgUrl = URL.createObjectURL(file.raw);
      },






    },

    mounted() { //监控属性 当方法触发时 进行调用
      this.Xiala();
      this.Xialalx();
      this.initData();
    },
    created() {
      //初始化时调用区域控制的方法

    },

  }
</script>

<style scoped="scoped">
  .khul li {
    list-style: none;
    margin-left: -50px;
    font-size: 12px;
    padding: 10px 20px;
  }

  .ulli li {
    list-style: none;
    float: left;
    width: 250px;
    height: 30px;
    margin-top: 30px;
    margin-left: 30px;

  }

  .p {
    font-size: 22px;
    color: #459df5;
    width: 630px;
    height: 40px;
    border-bottom: 1px solid #CCCCCC;
    font-weight: bold;
  }

  .chouti {
    margin-left: 30px;
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .fenlie {
    width: 100px;
    /*float: right;*/
    height: 100%;
  }

  .fy_div {
    margin-top: 30px;
    margin-left: 200px;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
