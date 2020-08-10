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
          查询搜索
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
          <el-form-item label="资源名称：">
            <el-input v-model="listQuery.resName" class="input-width" placeholder="资源名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源路径：">
            <el-input v-model="listQuery.uri" class="input-width" placeholder="资源路径" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源分类：">
              <el-select v-model="listQuery.resTypeId" placeholder="选择资源分类" clearable style="width: 150px">
                  <el-option v-for="item in categoryOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
      <el-button size="mini" class="btn-add" @click="handleShowCategory()">资源分类</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="resourceTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.resId}}</template>
        </el-table-column>
        <el-table-column label="资源名称" align="center">
          <template slot-scope="scope">{{scope.row.resName}}</template>
        </el-table-column>
        <el-table-column label="资源路径" align="center">
          <template slot-scope="scope">{{scope.row.uri}}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
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
    <el-dialog
      :title="isEdit?'编辑资源':'添加资源'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="resource"
               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item label="资源名称：">
          <el-input v-model="resource.resName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资源路径：">
          <el-input v-model="resource.uri" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="资源分类：">
                  <el-select v-model="resource.resTypeId" placeholder="选择资源分类" clearable style="width: 250px">
                    <el-option v-for="item in categoryOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
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
  import {queryResource,addResource,editResource,deleteResource} from '@/api/resource';
  import {queryResourceType} from '@/api/resourceCategory';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    resName: null,
    uri: null,
    resTypeId:null
  };
  const defaultResource = {

    resId:null,
    createTim:null,
    resName:null,
    uri:null,
    description:null,
    resTypeId:null  
  };
  export default {
    name: 'queryResource',
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
        categoryOptions:[],
        defaultCategoryId:null
      }
    },
    created() {
      this.getList();
      this.getCateList();
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
          var deteleResourceData = {"resId":row.resId};
          deleteResource(deteleResourceData).then(response => {
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
        if(this.resource.resName == null || this.resource.resName == ""){
          this.$message({
            message: '资源名称不能为空',
            type: 'success'
          });
        }else if(this.resource.uri == null || this.resource.uri == ""){
          this.$message({
            message: '资源路径不能为空',
            type: 'success'
          });
        }else if(this.resource.resTypeId == null || this.resource.resTypeId ==""){
          this.$message({
            message: '请选择资源分类',
            type: 'success'
          });
        }else if(this.resource.description == null || this.resource.description == ""){
          this.$message({
            message: '资源描述不能为空',
            type: 'success'
          });
        }else{
          this.$confirm('是否要确认?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              var editResourceData = {"resId":this.resource.resId,'resTypeId':this.resource.resTypeId,'resName':this.resource.resName,"uri":this.resource.uri,"description":this.resource.description};

              editResource(editResourceData).then(response => {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.dialogVisible =false;
                this.getList();
              })
            } else {
              var addResourceData = {'resTypeId':this.resource.resTypeId,'resName':this.resource.resName,"uri":this.resource.uri,"description":this.resource.description};

              addResource(addResourceData).then(response => {
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
      handleShowCategory(){
        this.$router.push({path: '/ums/resourceCategory'})
      },
      getList() {

        this.listLoading = true;
        var resourceListData = {'pageNum':this.listQuery.pageNum,'pageSize':this.listQuery.pageSize,"resName":this.listQuery.resName,"uri":this.listQuery.uri,"resTypeId":this.listQuery.resTypeId};

        queryResource(resourceListData).then(response => {

          this.listLoading = false;
          this.list = response.list;
          this.total = response.total;
        });

      },
      getCateList(){
        var listData = {"pageNum":1,"pageSize":10};
        queryResourceType(listData).then(response => {

          let cateList = response.list;
          for(let i=0;i<cateList.length;i++){
            let cate = cateList[i];
            this.categoryOptions.push({label:cate.title,value:cate.resTypeId});
          }
          this.defaultCategoryId=cateList[0].resTypeId;
        });

      }
    }
  }
</script>
<style></style>
