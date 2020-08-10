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

          <el-form-item label= "角色名称：">
            <el-input v-model="listQuery.roleName" class="input-width" placeholder="请输入角色名称" clearable></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>角色列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="resourceTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="150" align="center">
           <template slot-scope="scope">{{scope.row.roleId}}</template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>
        <el-table-column label="描述"  align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="添加时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <!-- <el-table-column label="是否启用" width="140" align="center">
            <template slot-scope="scope">
                <el-switch
                    @change="handleStatusChange(scope.$index, scope.row)"
                    :active-value="0"
                    :inactive-value="1"
                    v-model="scope.row.enable">
                </el-switch>
            </template>
        </el-table-column> -->

        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">

            <el-button size="mini"
                       type="text"
                       @click="handleSelectMenu(scope.$index, scope.row)">
              分配菜单
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">
              删除
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
            :page-sizes="[5,10,15]"
            :total="total">
          </el-pagination>
    </div>
    <el-dialog
          :title="isEdit?'编辑角色':'添加角色'"
          :visible.sync="dialogVisible"
          width="40%">
          <el-form :model="role"
                   ref="roleForm"
                   label-width="150px" size="small">
            <el-form-item label="角色名称：">
              <el-input v-model="role.roleName" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="描述：">
              <el-input v-model="role.description"
                        type="textarea"
                        :rows="5"
                        style="width: 250px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="是否启用：">
              <el-radio-group v-model="role.enable">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item> -->
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
  import {roleList,createRole,updateRole,updateStatus,deleteRole} from '@/api/role';
  import {formatDate} from '@/utils/date';



 const defaultListQuery = {
      pageNum: 1,
      pageSize: 10,
      roleName: ""
  };
  const defaultRole = {
      roleId:null,
      createTime:null,
      roleName:null,
      description:null,
      enable:null,
      relationUseCnt:null
   };
  export default {
      name: 'roleList',
      data() {
        return {
          listQuery: Object.assign({}, defaultListQuery),
          list: null,
          total: null,
          listLoading: false,
          dialogVisible: false,
          role: Object.assign({}, defaultRole),
          isEdit: false
        }
      },
      created() {
        this.getList();
      },
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
          this.role = Object.assign({},defaultRole);
          this.role.enable = 0;
        },
        handleStatusChange(index, row) {
          this.$confirm('是否要修改该状态?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            updateStatus(row.id, {status: row.status}).then(response => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消修改'
            });
            this.getList();
          });
        },
        handleDelete(index, row) {
          this.$confirm('是否要删除该角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var deleteData = {"roleId":row.roleId};
            deleteRole(deleteData).then(response => {
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
          this.role = Object.assign({},row);
        },
        handleDialogConfirm() {
          var tempRoleName =  this.role.roleName;
          var tempName =  tempRoleName.replace(/\s+/g,"");
          if (tempName == null || tempName == ""){
            this.$message({
              message: '角色名称不能为空',
              type: 'success'
            });
          }else if(this.role.description == null || this.role.description == ""){
            this.$message({
              message: '角色描述不能为空',
              type: 'success'
            });
          }else{
            this.$confirm('是否要确认?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                var updateData = {"roleId":this.role.roleId,"roleName":this.role.roleName,"description":this.role.description,"enable":this.role.enable};
                console.log("修改配角色参数:"+ JSON.stringify(updateData));
                updateRole(updateData).then(response => {
                  this.$message({
                    message: '修改成功！',
                    type: 'success'
                  });
                  this.dialogVisible =false;
                  this.getList();
                })
              } else {

                var createData = {"roleName":this.role.roleName,"description":this.role.description,"enable":this.role.enable};
                console.log("添加配角色参数:"+ JSON.stringify(createData));
                createRole(createData).then(response => {
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
        handleSelectMenu(index,row){
          this.$router.push({path:'/ums/allocMenu',query:{roleId:row.roleId}})
        },

        getList() {
          this.listLoading = true;
          var tempParams = {'pageNum':this.listQuery.pageNum,'pageSize':this.listQuery.pageSize,"roleName":this.listQuery.roleName};
          roleList(tempParams).then(response => {

            this.listLoading = false;
            this.list = response.list;
            this.total = response.total;
          });
        }
      }
    }
</script>
<style></style>
