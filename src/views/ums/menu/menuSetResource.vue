<template>
  <el-card class="form-container" shadow="never">
    <el-tree
      :data="resourceTypeList"
      show-checkbox
      default-expand-all
      node-key="resId"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>

  </el-card>
</template>

<script>
  import {menuAssignResource} from '@/api/menu'
  import {queryResource,queryMenuResourceList} from '@/api/resource';
  import {queryResourceType} from '@/api/resourceCategory';


  export default {
    name: "menuList",
    data() {
      return {
        resourceTypeList: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        menuId:null
      };
    },
    created() {
      this.menuId = this.$route.query.menuId;
      this.getCateList();
    },
    methods: {

      getCateList(){
        var listData = {"pageNum":1,"pageSize":100};
        queryResourceType(listData).then(response => {
          var dataList =  response.list;
          this.treeList(dataList);
        });

      },
      treeList(dataList) {

        var resourceListData = {'pageNum':1,'pageSize':1000};

        queryResource(resourceListData).then(response => {
            var resourceList =  response.list;
            if(resourceList!= null&& resourceList.length>0){
              for(let j = 0 ; j < dataList.length; j ++){
                  var resourceTypeData = dataList[j];
                  resourceTypeData["children"] = [];
                  let resTypeId =  resourceTypeData.resTypeId;
                  for(let i = 0; i < resourceList.length; i ++){
                      var resourceData =  resourceList[i];
                      resourceData["title"] = resourceData.resName;
                      resourceData["children"] = [];
                      if(resourceData.resTypeId == resTypeId){
                        resourceTypeData.children.push(resourceData);
                      }
                  }
              }
            }
            this.resourceTypeList =  dataList;
            this.menuResourceList();
        });
      },

      menuResourceList(){

        var listData = {"pageNum":1,"pageSize":1000,"menuId":this.menuId};
        queryMenuResourceList(listData).then(response => {
          var dataList = response.list
          var checkedMenuIds=[];
          if(dataList!=null&&dataList.length>0){
            for(let i=0;i<dataList.length;i++){
              let menu = dataList[i];
              console.log(menu);
              checkedMenuIds.push(menu.resId);
            }
          }
          console.log(checkedMenuIds);
          this.$refs.tree.setCheckedKeys(checkedMenuIds);

        });
      },




      handleSave() {
        let checkedNodes = this.$refs.tree.getCheckedNodes();

        let checkedMenuIds=new Set();
        if(checkedNodes!=null&&checkedNodes.length>0){
          for(let i=0;i<checkedNodes.length;i++){
            let checkedNode = checkedNodes[i];
            if(checkedNode.resId!= null && checkedNode.resId != ""){
              checkedMenuIds.add(checkedNode.resId);
            }

          }
        }
        console.log(checkedMenuIds);
        this.$confirm('是否分配资源？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{

          var roleMuneList = [];
          var meunIds = Array.from(checkedMenuIds);
          if(meunIds!=null&&meunIds.length>0){
            for(let i=0;i<meunIds.length;i++){
              var roleJson = {"resId": meunIds[i]};

              roleMuneList.push(roleJson);

            }
          }

          console.log(roleMuneList);
          var roleMuneData = {"menuId":this.menuId,"resList":roleMuneList};
          console.log(roleMuneData);
          menuAssignResource(roleMuneData).then(response => {
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
