<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-button ref="bt" @click="switchs()" size="small">全平台</el-button>
      <el-button ref="bt2" @click="switchs2()" size="small">商户</el-button>
    </el-card>

    <el-card class="filter-container" shadow="never">
      <!-- <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>-->
      <div style="margin-top: 15px"></div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="选择/查询商户：" v-if="see">
            <el-autocomplete
              class="inline-input"
              value-key="acctName"
              v-model="listQuery.acctName"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <br />
          <el-form-item label="时间范围：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
              :picker-options="pickerOptionsStart"
              :editable="false"
            ></el-date-picker>到
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
              :picker-options="pickerOptionsEnd"
              :editable="false"
            ></el-date-picker>
          </el-form-item>

          <el-button type="primary" @click="handleSearchList()" size="small">查询</el-button>
        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <el-radio-group v-model="listQuery.type" @change="typeUpdate">
        <el-radio :label="1">金额</el-radio>
        <el-radio :label="2">笔数</el-radio>
      </el-radio-group>
    </el-card>

    <div class="table-container">
      <el-table
        ref="resourceTable"
        :row-class-name="tbrw"
        :data="list"
        style="width: 100%;"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="商户名称" align="center">
          <template slot-scope="scope">{{scope.row.acctName}}</template>
        </el-table-column>
        <el-table-column :label="types==1?'总收入':'入账笔数'" align="center">
          <template slot-scope="scope">{{types==1?scope.row.entryAmount:scope.row.entryCnt}}</template>
        </el-table-column>
        <el-table-column :label="types==1?'总支出':'出账笔数'" align="center">
          <template slot-scope="scope">{{types==1?scope.row.outAmount:scope.row.outCnt}}</template>
        </el-table-column>
        <el-table-column :label="types==1?'支付金额':'支付笔数'" align="center">
          <template slot-scope="scope">{{types==1?scope.row.payAmount:scope.row.payCnt}}</template>
        </el-table-column>
        <el-table-column :label="types==1?'退款金额':'退款笔数'" align="center">
          <template slot-scope="scope">{{types==1?scope.row.refundAmount:scope.row.refundCnt}}</template>
        </el-table-column>
        <el-table-column :label="types==1?'转账金额':'转账笔数'" align="center">
          <template slot-scope="scope">{{types==1?scope.row.transferAmount:scope.row.transferCnt}}</template>
        </el-table-column>
        <el-table-column :label="types==1?'充值金额':'充值笔数'" align="center">
          <template slot-scope="scope">{{types==1?scope.row.rechargeAmount:scope.row.rechargeCnt}}</template>
        </el-table-column>
        <el-table-column :label="types==1?'结算金额':'结算笔数'" align="center">
          <template
            slot-scope="scope"
          >{{types==1?scope.row.settlementAmount:scope.row.settlementCnt}}</template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">禁用
            </el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :title="isEdit?'编辑资源':'添加资源'" :visible.sync="dialogVisible" width="40%">
      <el-form :model="resource" ref="resourceForm" label-width="150px" size="small">
        <el-form-item label="资源名称：">
          <el-input v-model="resource.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资源路径：">
          <el-input v-model="resource.url" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="resource.description" type="textarea" :rows="5" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>-->
      </span>
    </el-dialog>
    <div style="height: 100px;"></div>
  </div>
</template>
<script>
import { statisticsList } from "@/api/statistics";
import { formatDate } from "@/utils/date";
import { queryAccount } from "@/api/account";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  // nameKeyword: null,
  // urlKeyword: null,
  type: 1,
  acctName: "",
  startTime: "",
  endTime: "",
  // inputquery:''
};
const defaultResource = {
  id: null,
  agentName: null,
  name: null,
  phone: null,
  area: null,
  state: "",
};
export default {
  name: "agentList",
  data() {
    return {
      //将所有枚举的属性值从一个或者多个源对象复制到目标对象,返回目标对象
      //defaultListQuery:源对象, {}:目标对象
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      resource: Object.assign({}, defaultResource),
      isEdit: false,
      input: "",
      see: false,
      types: 1,
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.listQuery.endTime) {
            return (
              time.getTime() > new Date(this.listQuery.endTime).getTime() //这里的this.params.endData按自己的字段参数来
            );
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.listQuery.startTime) {
            return (
              // console.log(this.listQuery.startTime+"  "+this.listQuery.endTime+"   "+time.getTime),
              time.getTime() > Date.now() ||
              time.getTime() + 24 * 60 * 60 * 1000 <
                new Date(this.listQuery.startTime).getTime() //这里的this.params.beginDate按自己的字段参数来
            );
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
    };
  },

  created() {
    this.getList();
  },

  //判断时间的显示
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      // return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      return formatDate(date, "yyyy-MM-dd");
    },
  },

  methods: {
    typeUpdate() {
      this.types = this.listQuery.type;
      //  alert(this.type);
      this.getList(this.see == true ? 2 : 1);
    },

    tbrw({ row, rowIndex }) {
      // if(rowIndex%2!==1){
      //   return 'success-row'
      // }
    },

    async querySearch(queryString, cb) {
      // alert(queryString);
      // var chId = '';
      // var user = {
      //   mer_id:'',
      //   ch_id:chId
      // }
      var param = {
        acctName: queryString,
        pageNum: 1,
        pageSize: 100,
      };
      //这里是从后台获取数据
      await queryAccount(param).then((res) => {
        this.restaurants = res.list;
        // alert("dgdg");
        console.log(JSON.stringify(res));
        // this.restaurants = [
        //   {
        //     name:'三九'
        //   },
        //   {
        //     name:'张新发'
        //   },
        //   {
        //     name:'五子醉'
        //   },
        //   {
        //     name:'湘潭铺子'
        //   }
        // ]
        var restaurants = this.restaurants;
        var results = queryString ? this.searchData(queryString) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
        // cb(restaurants);
      });
    },
    searchData(issue_content) {
      return this.restaurants.filter(function (product) {
        return Object.keys(product).some(function (key) {
          return String(product[key]).toUpperCase().indexOf(issue_content) > -1;
        });
      });
      return this.products;
    },
    handleSelect(item) {
      console.log(item);
    },

    //点击查询搜索
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },

    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList(this.see == true ? 2 : 1);
    },
    switchs() {
      this.$refs.bt.type = "primary";
      this.$refs.bt2.type = "";
      // this.see = false;
      this.getList(1);
    },
    switchs2() {
      this.$refs.bt.type = "";
      this.$refs.bt2.type = "primary";
      // this.see = true;
      this.getList(2);
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.resource = Object.assign({}, defaultResource);
      this.resource.categoryId = this.defaultCategoryId;
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该资源?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteResource(row.id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.resource = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
          updateResource(this.resource.id, this.resource).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          createResource(this.resource).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    handleShowCategory() {
      this.$router.push({ path: "/ums/resourceCategory" });
    },
    getList() {
      this.listLoading = true;
      statisticsList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.list;
        this.total = response.total;
        //   document.write(JSON.stringify(response));
      });
    },

    getList(ty) {
      this.listLoading = true;
      statisticsList(this.listQuery).then((response) => {
        console.log(JSON.stringify(response));
        this.listLoading = false;
        this.list = response.list;
        this.total = response.total;
        //   document.write(JSON.stringify(response));
        if (ty == 2) {
          this.see = true;
          this.$refs.bt.type = "";
          this.$refs.bt2.type = "primary";
        } else {
          this.see = false;
          this.$refs.bt.type = "primary";
          this.$refs.bt2.type = "";
        }
      });
    },
  },
};
</script>
<style>
.input-width {
  width: 203px;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
