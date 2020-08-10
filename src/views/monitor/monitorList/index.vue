<template> 
  <div class="app-container">


    <el-card class="operate-container" shadow="never">
        <!-- <el-button @click="sendMsg" type="primary" :disabled="isDisabled">{{buttonName}}</el-button> -->
        <p>刷新倒计时:{{timecount}}</p>
    </el-card>



    

    <div class="table-container">
      <el-table ref="resourceTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label=""  align="center">
          <template slot-scope="scope">{{scope.row.data1}}</template>
        </el-table-column>
        <el-table-column label="总收入" align="center">
          <template slot-scope="scope">{{scope.row.data2}}</template>
        </el-table-column>
        <el-table-column label="总支出" align="center">
          <template slot-scope="scope">{{scope.row.data3}}</template>
        </el-table-column>
        <el-table-column label="支付" align="center">
          <template slot-scope="scope">{{scope.row.data4}}</template>
        </el-table-column>
        <el-table-column label="退款"  align="center">
          <template slot-scope="scope">{{scope.row.data5}}</template>
        </el-table-column>
        <el-table-column label="转账"  align="center">
          <template slot-scope="scope">{{scope.row.data6}}</template>
        </el-table-column>
        <el-table-column label="充值"  align="center">
          <template slot-scope="scope">{{scope.row.data7}}</template>
        </el-table-column>
        <el-table-column label="结算"  align="center">
          <template slot-scope="scope">{{scope.row.data8}}</template>
        </el-table-column>   
      </el-table>
    </div>

    <div class="table-container">
      <el-table ref="resourceTable"
                :row-class-name="tbrw"
                @sort-change="stcg"
                :data="list2"
                style="width: 100%;"
                v-loading="listLoading" border>
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="商户"  align="center">
          <template slot-scope="scope">{{scope.row.data1}}</template>
        </el-table-column>
        <el-table-column label="总收入" prop="data2" align="center" sortable="custom">
             
                <template slot-scope="scope">
                    {{scope.row.data2}}
                </template>
        </el-table-column>
        <el-table-column label="总支出" prop="data3" align="center" sortable="custom">
          <template slot-scope="scope">{{scope.row.data3}}</template>
        </el-table-column>
        <el-table-column label="余额" prop="data4" align="center" sortable="custom">
          <template slot-scope="scope">{{scope.row.data4}}</template>
        </el-table-column>   
      </el-table>
    </div>
    <!-- <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div> -->
    <el-dialog
      :title="isEdit?'编辑资源':'添加资源'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="resource"
               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item label="资源名称：">
          <el-input v-model="resource.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资源路径：">
          <el-input v-model="resource.url" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="resource.description"
                    type="textarea"
                    :rows="5"
                    style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <div style="height: 100px;"></div>
  </div>
</template>
<script>
  import {monitorList,monitorListdd} from '@/api/monitor';
  import {formatDate} from '@/utils/date';



  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    nameKeyword: null,
    urlKeyword: null,
    status:1,
    inputquery:''
  };
  const defaultResource = {
    id: null,
    agentName: null,
    name: null,
    phone: null,
    area: null,
    state:''
  };
  export default {
    name: 'agentList',
    data() {
      return {
        //将所有枚举的属性值从一个或者多个源对象复制到目标对象,返回目标对象
        //defaultListQuery:源对象, {}:目标对象
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        list2:null,
        listo:null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        resource: Object.assign({}, defaultResource),
        isEdit: false,
        input:'',
        see:false,
        buttonName: "发送短信",
		    isDisabled: false,
        time: 60,
        timecount:0,
        prop:null,
        order:null
      }
    },

    created() {
      this.getList();
      // this.getList2();
      this.timing();
    },

    destroyed(){
      // console.log("destroyeddestroyeddestroyed");

    },

    //判断时间的显示
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },


    methods: {

    tbrw({row,rowIndex}){
        if(rowIndex%2!==1){
          return 'success-row'
        }
    },

    stcg(column){
        // alert(column.prop+"  "+column.order);
        this.prop = column.prop;
        this.order = column.order;
        if(this.prop == "data2" && this.order == "descending"){
          this.list2.sort(function(a,b){
            return a.data2 - b.data2;
          });
        } else if(this.prop == "data2" && this.order == "ascending"){
          this.list2.sort(function(a,b){
            return b.data2 - a.data2;
          });
        } else if(this.prop == "data3" && this.order == "descending"){
          this.list2.sort(function(a,b){
            return a.data3 - b.data3;
          });
        } else if(this.prop == "data3" && this.order == "ascending"){
          this.list2.sort(function(a,b){
            return b.data3- a.data3;
          });
        } else if(this.prop == "data4" && this.order == "descending"){
          this.list2.sort(function(a,b){
            return a.data4 - b.data4;
          });
        } else if(this.prop == "data4" && this.order == "ascending"){
          this.list2.sort(function(a,b){
            return b.data4- a.data4;
          });
        } else{
          // this.list2=this.list2.GetRange(0, listo.Count);
          this.list2.sort(function(a,b){
            return a.data0- b.data0;
          });
        }
    },

    stcgo(){
        if(this.prop == "data2" && this.order == "descending"){
          this.list2.sort(function(a,b){
            return a.data2 - b.data2;
          });
        } else if(this.prop == "data2" && this.order == "ascending"){
          this.list2.sort(function(a,b){
            return b.data2 - a.data2;
          });
        } else if(this.prop == "data3" && this.order == "descending"){
          this.list2.sort(function(a,b){
            return a.data3 - b.data3;
          });
        } else if(this.prop == "data3" && this.order == "ascending"){
          this.list2.sort(function(a,b){
            return b.data3- a.data3;
          });
        } else if(this.prop == "data4" && this.order == "descending"){
          this.list2.sort(function(a,b){
            return a.data4 - b.data4;
          });
        } else if(this.prop == "data4" && this.order == "ascending"){
          this.list2.sort(function(a,b){
            return b.data4- a.data4;
          });
        } else{
          // this.list2=this.list2.GetRange(0, listo.Count);
          this.list2.sort(function(a,b){
            return a.data0- b.data0;
          });
        }
    },

    // sendMsg() {
    //     let me = this;
    //     me.isDisabled = true;
    //     let interval = window.setInterval(function() {
    //         me.buttonName = '（' + me.time + '秒）后重新发送';
    //         --me.time;
    //         if(me.time < 0) {
    //             me.buttonName = "重新发送";
    //             me.time = 10;
    //             me.isDisabled = false;
    //             window.clearInterval(interval);
    //         }
    //     }, 1000);
    // },

    timing(){
        let me = this;
        me.timecount = me.time;
       const timer = window.setInterval(function() {
            me.timecount =  me.time;
            --me.time;
            // console.log(me.time);
            if(me.time < 0) {
                // window.location.reload();
                // console.log("666666666666666666666");
                me.getList();
                me.getList2();
                me.time = 60;
                window.clearInterval(interval);
            }
        }, 1000);

        this.$once('hook:beforeDestroy', () => {      
            console.log("beforeDestroy");     
            window.clearInterval(timer);                                    
        })
    },
                
    async querySearch(queryString, cb) {
      // alert(queryString);
      var chId = '';
      var user = {
        mer_id:'',
        ch_id:chId
      }
      //这里是从后台获取数据
      // await getMohu(queryString,user).then(res=>{
        // this.restaurants = res
        // alert("dgdg");
        this.restaurants = [
          {
            name:'商户1'
          },
          {
            name:'商户2'
          },
          {
            name:'商户3'
          }
        ]
        var restaurants = this.restaurants;
        var results = queryString
          ? this.searchData(queryString)
          : restaurants;
        // 调用 callback 返回建议列表的数据
        // cb(results);
        cb(restaurants);
      // })
    },
    searchData(issue_content) {
        return this.restaurants.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return String(product[key]).toUpperCase().indexOf(issue_content) > -1
          })
        })
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
        this.getList();
      },
      switchs(){
          this.$refs.bt.type = 'primary';
          this.$refs.bt2.type = '';
          // this.see = false;
          this.getList(1);
      },
       switchs2(){
          this.$refs.bt.type = '';
          this.$refs.bt2.type = 'primary';
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
        this.resource = Object.assign({},defaultResource);
        this.resource.categoryId = this.defaultCategoryId;
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该资源?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteResource(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.resource = Object.assign({},row);
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateResource(this.resource.id,this.resource).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            createResource(this.resource).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          }
        })
      },
      handleShowCategory(){
        this.$router.push({path: '/ums/resourceCategory'})
      },
      getList() {
        this.listLoading = true;
        monitorList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        //   document.write(JSON.stringify(response));
        });
      },

      getList2() {
        this.listLoading = true;
        monitorListdd(this.listQuery).then(response => {
          this.listLoading = false;
          this.list2 = response.data.list;
          // alert(this.prop+" "+this.order);
          this.stcgo();
          // this.listo = this.list2.GetRange(0, list2.Count);
          // this.list2.sort();
          this.total = response.data.total;
        //   document.write(JSON.stringify(response));
        });
      },
     
    }
  }
</script>
<style>
  .input-width {
    width: 203px;
  }
  .el-table .success-row{
    background: #f0f9eb;
  }
</style>
