<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="账户名称：">
            <el-input v-model="listQuery.acctName" class="input-width" placeholder="请输入账户名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="listQuery.telephone" class="input-width" placeholder="请输入手机号" clearable></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>账户列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="resourceTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="账户ID"  align="center">
           <template slot-scope="scope">{{scope.row.acctId}}</template>
        </el-table-column>
        <el-table-column label="账号名称"  align="center">
          <template slot-scope="scope">{{scope.row.acctName}}</template>
        </el-table-column>
        <el-table-column label="手机号"  align="center">
          <template slot-scope="scope">{{scope.row.telephone}}</template>
        </el-table-column>
        <el-table-column label="是否商户" align="center">
          <template slot-scope="scope">{{scope.row.acctType | acctTypeFilter}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.state | stateFilter}}</template>
        </el-table-column>
        <el-table-column label="龙信币" align="center">
          <template slot-scope="scope">{{scope.row.amount}}</template>
        </el-table-column>

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
        :total="total">
      </el-pagination>
    </div>
    

    <div style="height: 100px;"></div>
  </div>
</template>
<script>
  import {queryAccount} from '@/api/account';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    acctName: null,
    telephone: null,
  };
  const defaultResource = {
    acctId:null,
    acctType:null,
    baseUserId:null,
    telephone:null,
    isRealName:null,
    acctName:null,
    state:null,
    amount:null,
    cashFreezeAmout:null,

  };
  export default {
    name: 'queryAccount',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        resource: Object.assign({}, defaultResource),
        isEdit: false,
      }
    },
    created() {
      this.getList();
    },

    //判断时间的显示
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      acctTypeFilter(value) {
        if (value === 1) {//个人
          return '否';
        } else if(value === 2){//企业
          return '是';
        }
      },
      stateFilter(value) {
        if (value === 0) {
          return '生效';
        } else if(value === 1){
          return '冻结';
        }else if(value === 2){
          return '注销';
        }
      },
    },
    methods: {
      //点击查询搜索
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },

      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
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
        var listData = {"pageNum":this.listQuery.pageNum,"pageSize":this.listQuery.pageSize,"acctName":this.listQuery.acctName,"telephone":this.listQuery.telephone};
        queryAccount(listData).then(response => {

          this.listLoading = false;
          this.list = response.list;
          this.total = response.total;
          // console.log(JSON.stringify(response));
          // document.write(JSON.stringify(response));
        });
      },

    }
  }
</script>
<style></style>
