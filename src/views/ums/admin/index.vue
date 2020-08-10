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
          <el-form-item label= "姓名：">
            <el-input v-model="listQuery.operatorName" class="input-width" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="账号：">
            <el-input v-model="listQuery.baseUserId" class="input-width" placeholder="请输入账号" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="listQuery.telephone" class="input-width" placeholder="请输入手机号" clearable maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>用户列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="resourceTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
           <template slot-scope="scope">{{scope.row.operatorId}}</template>
        </el-table-column>
        <el-table-column label="账号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.baseUserId}}</template>
        </el-table-column>
        <el-table-column label="姓名" width="100" align="center">
          <template slot-scope="scope">{{scope.row.operatorName}}</template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">{{scope.row.telephone}}</template>
        </el-table-column>
        <el-table-column label="添加时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="最后登录" align="center">
          <template slot-scope="scope">{{scope.row.lasttLoginTime}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
            <template slot-scope="scope">
                <el-switch
                    @change="handleStatusChange(scope.$index, scope.row)"
                    :active-value="0"
                    :inactive-value="1"
                    v-model="scope.row.enable">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">

            <el-button size="mini"
                       type="text"
                       @click="handleSelectRole(scope.$index, scope.row)">
              分配角色
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
        :page-sizes="[5,10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title = "'添加用户手机号'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="resource"
               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item label="手机号：">
          <el-input v-model="resource.telephone" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" style="width: 250px"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title= "isEdit?'编辑用户':'用户详情'"
      :visible.sync="alterUserDetail"
      width="40%">
      <el-form :model="resource"
               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item label="手机号：">
          <el-input v-model="resource.telephone" style="width: 250px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input v-model="resource.baseUserId" style="width: 250px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="resource.operatorName" style="width: 250px" :disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="resource.rmk"
                type="textarea"
                :rows="5"
                style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="是否启用：">
              <el-radio-group v-model="resource.enable">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alterUserDetail = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addUsersureClicked()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
          title="分配角色"
          :visible.sync="allocDialogVisible"
          width="30%">
          <el-select v-model="allocRoleIds" multiple placeholder="请选择角色" size="small" style="width: 80%">
            <el-option
              v-for="item in allRoleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
          </span>
        </el-dialog>
    <div style="height: 100px;"></div>

  </div>
</template>
<script>
  import {userList,createUser,editUser,deleteUser,modifyUserState,queryUserRole,userAssignRole} from '@/api/user';
  import {checkUser} from '@/api/imCheck';
  import {roleList,getRoleByAdmin} from '@/api/role';
  import {formatDate} from '@/utils/date';
  import md5 from 'js-md5';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    telephone:"",
    baseUserId:"",
    operatorName:"",

  };
  const defaultResource = {
    operatorId:null,
    operatorName:null,
    telephone:null,
    email:null,
    enable:null,
    createTime:null,
    lasttLoginTime:null,

    baseUserId:null,
    rmk:null,

  };
  export default {
    name: 'userList',
    data() {
      return {

        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        alterUserDetail: false,
        dialogVisible: false,
        allocDialogVisible: false,
        resource: Object.assign({}, defaultResource),
        isEdit: false,
        allRoleList:[],
        allocAdminId:null,
        allocRoleIds:[],
      }
    },
    created() {
      this.getList();
      this.getRoleList();
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
      //点击重置
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },

      //点击搜索按钮
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
      //点击添加用户按钮
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.resource = Object.assign({},defaultResource);
        this.resource.categoryId = this.defaultCategoryId;
      },
      //点击删除
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var deleteData = {'mOperatorId':row.operatorId};
          deleteUser(deleteData).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },

      handleUpdate(index, row) {
        this.alterUserDetail = true;
        this.isEdit = true;
        this.resource = Object.assign({},row);
      },
      //点击添加用户的确定按钮
      handleDialogConfirm() {
        if(this.resource.telephone == null || this.resource.telephone == ""){
            this.$message({
              message: '手机号不能为空',
              type: 'success'
            });
        }else if (this.resource.telephone.substr(0, 1) != "1" || this.resource.telephone.length != 11) {
          this.$message({
            message: "请输入正确的手机号码",
            type: "success",
          });
        } else{
            var timestamp = Date.parse(new Date()) / 1000;
            let scret = md5(this.resource.telephone + timestamp + "eccbc87e4b5ce2fe28308fd9f2a7baf3");
            var checkParams = {'telephone':this.resource.telephone,"sign":scret,"timestamp":timestamp};
            console.log(scret);
            console.log(checkParams);
            checkUser(checkParams).then(response => {
             console.log("请求到的数据"+JSON.stringify(response));
             if(response.result == 1){
               this.$message({
                 message: '账户不存在',
                 type: 'success'
               });
             }else if (response.result == 0){
               this.resource.operatorName = response["nickName"];
               this.resource.baseUserId = response["userId"];
               this.resource.enable = 0;
               this.isEdit = false;
               this.alterUserDetail = true;
               this.dialogVisible = false;
             }else{
               this.$message({
                 message: '查询失败',
                 type: 'success'
               });
             }

            });
        }
      },
      //点击添加用户详情页面确定按钮
      addUsersureClicked(){
        if(this.resource.operatorName == null || this.resource.operatorName == ""){
          this.$message({
            message: '姓名不能为空',
            type: 'success'
          });
        }else{
          this.$confirm(this.isEdit?'确认修改该用户?':'确认添加该用户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(this.resource.rmk == null || this.resource.rmk == ""){
              this.resource.rmk = "  ";
            }
            if (this.isEdit) {//编辑用户
              var editUserData = {'mOperatorId':this.resource.operatorId,'telephone':this.resource.telephone,'operatorName':this.resource.operatorName,'enable':this.resource.enable,'rmk':this.resource.rmk,'baseUserId':this.resource.baseUserId};
              editUser(editUserData).then(response => {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.alterUserDetail = false;
                this.getList();
              })
            } else {//添加用户

              var addUserData = {'telephone':this.resource.telephone,'operatorName':this.resource.operatorName,'enable':this.resource.enable,'rmk':this.resource.rmk,'baseUserId':this.resource.baseUserId};
              createUser(addUserData).then(response => {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.alterUserDetail =false;
                this.getList();
              })
            }
          })

        }



      },

      //点击启用开关
      handleStatusChange(index, row) {
              this.$confirm('是否要修改该状态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var modifyData = {"mOperatorId":row.operatorId,"status":row.enable};
                console.log("点击启用开关参数:"+ JSON.stringify(modifyData));
                modifyUserState(modifyData).then(response => {
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                  this.getList();
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消修改'
                });
                this.getList();
              });
            },

      //点击分配角色
      handleSelectRole(index,row){
        this.listLoading = true;
        var roleData = {'mOperatorId':row.operatorId};
        queryUserRole(roleData).then(response => {
          this.listLoading = false;
          this.allocAdminId = row.operatorId;
          this.allocDialogVisible = true;
          let allocRoleList = response.list;
          this.allocRoleIds=[];
          console.log(allocRoleList);
          if(allocRoleList!=null&&allocRoleList.length>0){
            for(let i=0;i<allocRoleList.length;i++){
              console.log(allocRoleList[i]);
              this.allocRoleIds.push(allocRoleList[i].roleId);
            }
          }
        });


       },
       //点击选择分配角色的确定按钮
       handleAllocDialogConfirm(){
               this.$confirm('是否要确认?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {
                 var roleList = [];
                 if(this.allocRoleIds!=null&&this.allocRoleIds.length>0){
                   for(let i=0;i<this.allocRoleIds.length;i++){
                     var roleJson = {"roleId": this.allocRoleIds[i]};

                     roleList.push(roleJson);

                   }
                 }
                 var assignRoleData = {"mOperatorId":this.allocAdminId,"roleList":roleList};


                 console.log("分配角色参数:"+ JSON.stringify(assignRoleData));
                 userAssignRole(assignRoleData).then(response => {
                   this.$message({
                     message: '分配成功！',
                     type: 'success'
                   });
                   this.allocDialogVisible = false;
                 })
               })
             },

      getList() {
        this.listLoading = true;
        var tempParams = {'pageNum':this.listQuery.pageNum,'pageSize':this.listQuery.pageSize,"telephone":this.listQuery.telephone,"operatorName":this.listQuery.operatorName,'baseUserId':this.listQuery.baseUserId};

        userList(tempParams).then(response => {

          this.listLoading = false;
          this.list = response.list;
          this.total = response.total;
        });
      },

      getRoleList() {
        var roleListData = {'pageNum':1,'pageSize':100};
        roleList(roleListData).then(response => {
          this.allRoleList = response.list;
        });
      },



    }
  }
</script>
<style></style>
