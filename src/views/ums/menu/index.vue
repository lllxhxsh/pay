<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">菜单列表</span>
      <el-button
        class="btn-add"
        @click="handleAddMenu()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.menuId}}</template>
        </el-table-column>
        <el-table-column label="菜单名称" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="菜单级数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <el-table-column label="前端名称" align="center">
          <template slot-scope="scope">{{scope.row.frontName}}</template>
        </el-table-column>
        <el-table-column label="前端图标" width="100" align="center">
          <template slot-scope="scope"><svg-icon :icon-class="scope.row.icon"></svg-icon></template>
        </el-table-column>

        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="scope.row.hasSubMenu | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleSelectResource(scope.$index, scope.row)">
              分配资源
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
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
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <div style="height: 100px;"></div>
    <el-dialog
      :title= "isEdit?'编辑菜单':'添加菜单'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="resource"

               ref="resourceForm"
               label-width="150px" size="small">
        <el-form-item label="菜单名称：" prop="title">
          <el-input v-model="resource.title" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单：">
            <el-select v-model="resource.parentId"
                           placeholder="请选择菜单">
             <el-option
                    v-for="item in selectMenuList"
                    :key="item.menuId"
                    :label="item.title"
                    :value="item.menuId">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="前端名称：" prop="name">
          <el-input v-model="resource.frontName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="前端图标：" prop="icon">
          <el-input v-model="resource.icon" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="resource.sort" style="width: 250px"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('menuFrom')">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {menuList,createMenu,deleteMenu,updateMenu,updateHidden} from '@/api/menu'

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    menuId: 0
  };
  const defaultResource = {
    menuId:0,
    parentId:0,
    title:null,
    level:null,
    sort:null,
    frontName:null,
    icon:null,
    hidden:null,
    hasSubMenu:null
  };
  export default {
    name: "menuList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        dialogVisible :false,
        resource: Object.assign({}, defaultResource),
        isEdit: false,
        parentId: 0,
        selectMenuList :[],
        // rules: {
        //           title: [
        //             {required: true, message: '请输入菜单名称', trigger: 'blur'},
        //             {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        //           ],
        //           name: [
        //             {required: true, message: '请输入前端名称', trigger: 'blur'},
        //             {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        //           ],
        //           icon: [
        //             {required: true, message: '请输入前端图标', trigger: 'blur'},
        //             {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        //           ]
        //         }
      }
    },
    created() {
      this.resetmenuId();
      this.getList();

    },

    watch: {
      $route(route) {
        console.log("重新进来");
        this.resetmenuId();
        this.getList();
        this.getMuneAddOrAmendList();
      }
    },

    methods: {
      resetmenuId(){
          this.listQuery.pageNum = 1;
          if (this.$route.query.menuId != null) {
              this.listQuery.menuId = this.$route.query.menuId;
          } else {
              this.listQuery.menuId = 0;
          }
      },
      //添加菜单
      handleAddMenu() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.resource = Object.assign({},defaultResource);
        this.resource.categoryId = this.defaultCategoryId;

      },
      getList() {
        this.listLoading = true;
        var menuLiatData = {"menuId":this.listQuery.menuId,"pageNum":this.listQuery.pageNum,"pageSize":this.listQuery.pageSize};

        menuList(menuLiatData).then(response => {
          this.listLoading = false;
          this.list = response.list;

          this.total = response.total;
          this.getMuneAddOrAmendList();
        });
      },

      getMuneAddOrAmendList(){
        var menuLiatData = {"menuId":this.listQuery.menuId,"pageNum":this.listQuery.pageNum,"pageSize":this.listQuery.pageSize};

        menuList(menuLiatData).then(response => {
          this.selectMenuList = response.list;
          this.total = response.total;
          this.selectMenuList.unshift({menuId: 0, title: '无上级菜单'});

        });

      },
      onSubmit(formName) {
        var tempMenuTitle =  this.resource.title;
        var menuTitle =  tempMenuTitle.replace(/\s+/g,"");

        var tempMenufrontName =  this.resource.frontName;
        var menufrontName =  tempMenufrontName.replace(/\s+/g,"");
        
        
        var tempMenuicon =  this.resource.icon;
        var menuicon =  tempMenuicon.replace(/\s+/g,"");
        
        var tempMenusort =  this.resource.sort;
        var menusort =  tempMenusort.replace(/\s+/g,"");
        if(this.resource.title == null || menuTitle == ""){
          this.$message({
            message: '菜单名称不能为空',
            type: 'success'
          });
        }else if(this.resource.frontName == null || menufrontName == ""){
          this.$message({
            message: '前端名称不能为空',
            type: 'success'
          });
        }else if(this.resource.icon == null || menuicon == ""){
          this.$message({
            message: '前端图标不能为空',
            type: 'success'
          });
        }else if(this.resource.sort == null || menusort == ""){
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
              var updateData = {"menuId":this.resource.menuId,"title":this.resource.title,"parentId":this.resource.parentId,"sort":this.resource.sort,"icon":this.resource.icon,"hidden":1,"frontName":this.resource.frontName};
              updateMenu(updateData).then(response => {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.dialogVisible =false;
                this.getList();
              })
            } else {

              var createData = {"title":this.resource.title,"parentId":this.resource.parentId,"sort":this.resource.sort,"icon":this.resource.icon,"hidden":1,"frontName":this.resource.frontName};
              createMenu(createData).then(response => {
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

      resetForm(formName) {
          this.resource = Object.assign({},defaultResource);
          this.resource.categoryId = this.defaultCategoryId;
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
      handleHiddenChange(index, row) {
        updateHidden(row.id,{hidden:row.hidden}).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      //查看下一级
      handleShowNextLevel(index, row) {
        this.$router.push({path: '/ums/menu', query: {menuId: row.menuId}})
        // this.listQuery.pageNum = 1;
        // var nextLevelData = {"menuId":row.menuId,"pageNum":this.listQuery.pageNum,"pageSize":this.listQuery.pageSize};
        // this.listLoading = true;
        // menuList(nextLevelData).then(response => {
        //   this.listLoading = false;
        //   this.list = response.list;
        //   this.total = response.total;

        // });
      },
      handleUpdate(index, row) {
        this.alterUserDetail = true;
        this.isEdit = true;
        this.resource = Object.assign({},row);


        this.dialogVisible = true;
        this.isEdit = true;
        this.resource = Object.assign({},row);

      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该菜单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var deteleData = {"menuId":row.menuId};
          deleteMenu(deteleData).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },

      handleSelectResource(index,row){
        this.$router.push({path:'/ums/menuSetResource',query:{menuId:row.menuId}})
      },

    },
    filters: {
      levelFilter(value) {
        if (value === 1) {
          return '一级';
        } else if (value === 2) {
          return '二级';
        }else if (value === 3) {
          return '三级';
        }
      },
      disableNextLevel(value) {
        if (value === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
</script>

<style scoped>
</style>
