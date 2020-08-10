<template> 
  <div class="app-container">
    <el-card shadow="never" class="operate-container">
      <i class="el-icon-tickets"></i>
      <span>资源分类列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="resourceCategoryTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="resourceCategory"
               ref="resourceCategoryForm"
               label-width="150px" size="small">
        <el-form-item label="名称：">
          <el-input v-model="resourceCategory.title" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="resourceCategory.sort" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {queryResourceType,addResourceType,editResourceType,deleteResourceType} from '@/api/resourceCategory';
  import {formatDate} from '@/utils/date';
  const defaultResourceCategory={
    resTypeId:null,
    createTime:null,
    title:null,
    sort: null,
    number:null,
  };
  export default {
    name: 'queryResourceType',
    data() {
      return {
        list: null,
        listLoading: false,
        dialogVisible:false,
        isEdit:false,
        resourceCategory:Object.assign({},defaultResourceCategory)
      }
    },



    created() {
      this.getList();
    },
    filters:{
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.resourceCategory = Object.assign({},defaultResourceCategory);
      },
      handleUpdate(index,row){
        this.dialogVisible = true;
        this.isEdit = true;
        this.resourceCategory = Object.assign({},row);
      },
      handleDelete(index,row){
        this.$confirm('是否要删除该分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var deleteData = {"resTypeId":row.resTypeId};
          deleteResourceType(deleteData).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleDialogConfirm() {
        if(this.resourceCategory.title == null || this.resourceCategory.title == ""){
          this.$message({
            message: '名称不能为空',
            type: 'success'
          });
        }else if(this.resourceCategory.sort == null || this.resourceCategory.sort == ""){
          this.$message({
            message: '排序不能为空',
            type: 'success'
          });
        }else{
          this.$confirm('是否要确认?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              var editData = {"resTypeId":this.resourceCategory.resTypeId,"title":this.resourceCategory.title,"sort":this.resourceCategory.sort};
              editResourceType(editData).then(response => {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.dialogVisible =false;
                this.getList();
              })
            } else {
              var listData = {"title":this.resourceCategory.title,"sort":this.resourceCategory.sort};
              addResourceType(listData).then(response => {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.dialogVisible =false;
                this.getList();
              })
            }
          })
        }

      },
      getList() {
        this.listLoading = true;
        var listData = {"pageNum":1,"pageSize":10};
        queryResourceType(listData).then(response => {
          this.listLoading = false;
          var datalist = response.list;
          var resourceList = [];
          for(let i = 0 ; i < datalist.length; i ++){
            var data = datalist[i];
            data["number"] = i + 1;
            resourceList.push(data);
          }
          this.list = resourceList;
        });
      }
    }
  }
</script>
<style>
</style>
