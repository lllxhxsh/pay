<template>
  <el-card class="form-container" shadow="never">
    <el-tree
      :data="menuOneLevelList"
      show-checkbox
      default-expand-all
      node-key="menuId"
      ref="tree"
      highlight-current
      v-loading="listLoading"
      :props="defaultProps">
    </el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>

  </el-card>
</template>

<script>
  import {menuList} from '@/api/menu';
  import {queryRoleMenuList,roleAssignMenu} from '@/api/role';

  export default {
    name: "menuList",
    data() {
      return {
        listLoading:false,
        menuOneLevelList: [],
        oneLevelMeunIds:[],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        roleId:null
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.treeList();

    },
    methods: {
      treeList() {
        var menuLiatData = {"menuId":"","pageNum":1,"pageSize":10000};
        this.listLoading = true;
        menuList(menuLiatData).then(response => {
          var menuList =  response.list;

          if(menuList!= null&& menuList.length>0){
            for(let i=0;i< menuList.length;i++){
              var menuData =  {"frontName":menuList[i]["frontName"],
                              "hasSubMenu":menuList[i]["hasSubMenu"],
                              "hidden":menuList[i]["hidden"],
                              "icon":menuList[i]["icon"],
                              "level":menuList[i]["level"],
                              "menuId":menuList[i]["menuId"],
                              "parentId":menuList[i]["parentId"],
                              "sort":menuList[i]["sort"],
                              "title":menuList[i]["title"],
                              };
              menuData["children"] = [];
              var hidden = menuData["hidden"];
              var parentId = menuData["parentId"];
              if (parentId == 0) {
                this.menuOneLevelList.push(menuData);
                this.oneLevelMeunIds.push(menuData["menuId"]);
              }
            }

            for(let j = 0 ; j < this.menuOneLevelList.length; j ++ ){
              var oneLevelData =  this.menuOneLevelList[j];
              var menuId = oneLevelData["menuId"]
              var tempLevelMenu = [];
               for(let i=0;i< menuList.length;i++){
                  var menuData = {"frontName":menuList[i]["frontName"],
                              "hasSubMenu":menuList[i]["hasSubMenu"],
                              "hidden":menuList[i]["hidden"],
                              "icon":menuList[i]["icon"],
                              "level":menuList[i]["level"],
                              "menuId":menuList[i]["menuId"],
                              "parentId":menuList[i]["parentId"],
                              "sort":menuList[i]["sort"],
                              "title":menuList[i]["title"],
                              };//menuList[i];
                  menuData["children"] = [];
                  var hidden = menuData["hidden"];
                  var parentId =  menuData["parentId"];
                  if(parentId == menuId){
                    oneLevelData.children.push(menuData)
                    // tempLevelMenu.push(menuData);
                  }
               }
               // console.log(oneLevelData);
               // console.log(tempLevelMenu);
               // oneLevelData.children = tempLevelMenu;

               // console.log(oneLevelData);
               // console.log("-------------------------------");
               // this.menuOneLevelList.shift();
               // this.menuOneLevelList.unshift(oneLevelData);
               // this.menuTwoLevelList.push(tempLevelMenu);
            }
            // console.log("------------------------------" +JSON.stringify(this.menuOneLevelList));
            this.getRoleMenu(this.roleId);
          }
        });

      },
      getRoleMenu(roleId){
        var RoleMenuListData = {"roleId":roleId};
        queryRoleMenuList(RoleMenuListData).then(response=>{
          this.listLoading = false;
          let menuList = response.menuList;
          let checkedMenuIds=[];
          if(menuList!=null&&menuList.length>0){
            for(let i=0;i<menuList.length;i++){
              let menu = menuList[i];
              var isExit = false;
              for(let j=0 ; j<this.oneLevelMeunIds.length ; j++){
                if(menu.menuId == this.oneLevelMeunIds[j]){
                  isExit = true;
                }
              }
              if(!isExit){
                checkedMenuIds.push(menu.menuId);
              }
            }

          }
          this.$refs.tree.setCheckedKeys(checkedMenuIds);
        });
      },
      handleSave() {
        if(this.listLoading){
          return;
        }
        let checkedNodes = this.$refs.tree.getCheckedNodes();

        let checkedMenuIds=new Set();
        if(checkedNodes!=null&&checkedNodes.length>0){
          for(let i=0;i<checkedNodes.length;i++){
            let checkedNode = checkedNodes[i];
            checkedMenuIds.add(checkedNode.menuId);

            if(checkedNode.parentId!==0){
              checkedMenuIds.add(checkedNode.parentId);
            }
          }
        }
        this.$confirm('是否分配菜单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{

          var roleMuneList = [];
          var meunIds = Array.from(checkedMenuIds);
          if(meunIds!=null&&meunIds.length>0){
            for(let i=0;i<meunIds.length;i++){
              var roleJson = {"menuId": meunIds[i]};

              roleMuneList.push(roleJson);

            }
          }


          var roleMuneData = {"roleId":this.roleId,"menuList":roleMuneList};
;          roleAssignMenu(roleMuneData).then(response => {
            this.$message({
              message: '分配成功',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          })
        })
      },
      handleClear() {
        this.$refs.tree.setCheckedKeys([]);
      }
    }
  }
</script>

<style scoped>

</style>
