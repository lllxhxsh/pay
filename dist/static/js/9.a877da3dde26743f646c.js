webpackJsonp([9],{"L1/C":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("woOf"),i=s.n(r),a=s("xJrl"),l=s("Og03"),n=s("xT6B"),u={pageNum:1,pageSize:10,resName:null,uri:null,resTypeId:null},o={resId:null,createTim:null,resName:null,uri:null,description:null,resTypeId:null},c={name:"queryResource",data:function(){return{listQuery:i()({},u),list:null,total:null,listLoading:!1,dialogVisible:!1,resource:i()({},o),isEdit:!1,categoryOptions:[],defaultCategoryId:null}},created:function(){this.getList(),this.getCateList()},filters:{formatDateTime:function(e){if(null==e||""===e)return"N/A";var t=new Date(e);return Object(n.a)(t,"yyyy-MM-dd hh:mm:ss")}},methods:{handleResetSearch:function(){this.listQuery=i()({},u)},handleSearchList:function(){this.listQuery.pageNum=1,this.getList()},handleSizeChange:function(e){this.listQuery.pageNum=1,this.listQuery.pageSize=e,this.getList()},handleCurrentChange:function(e){this.listQuery.pageNum=e,this.getList()},handleAdd:function(){this.dialogVisible=!0,this.isEdit=!1,this.resource=i()({},o),this.resource.categoryId=this.defaultCategoryId},handleDelete:function(e,t){var s=this;this.$confirm("是否要删除该资源?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={resId:t.resId};Object(a.b)(e).then(function(e){s.$message({type:"success",message:"删除成功!"}),s.getList()})})},handleUpdate:function(e,t){this.dialogVisible=!0,this.isEdit=!0,this.resource=i()({},t)},handleDialogConfirm:function(){var e=this;null==this.resource.resName||""==this.resource.resName?this.$message({message:"资源名称不能为空",type:"success"}):null==this.resource.uri||""==this.resource.uri?this.$message({message:"资源路径不能为空",type:"success"}):null==this.resource.resTypeId||""==this.resource.resTypeId?this.$message({message:"请选择资源分类",type:"success"}):null==this.resource.description||""==this.resource.description?this.$message({message:"资源描述不能为空",type:"success"}):this.$confirm("是否要确认?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){if(e.isEdit){var t={resId:e.resource.resId,resTypeId:e.resource.resTypeId,resName:e.resource.resName,uri:e.resource.uri,description:e.resource.description};Object(a.c)(t).then(function(t){e.$message({message:"修改成功！",type:"success"}),e.dialogVisible=!1,e.getList()})}else{var s={resTypeId:e.resource.resTypeId,resName:e.resource.resName,uri:e.resource.uri,description:e.resource.description};Object(a.a)(s).then(function(t){e.$message({message:"添加成功！",type:"success"}),e.dialogVisible=!1,e.getList()})}})},handleShowCategory:function(){this.$router.push({path:"/ums/resourceCategory"})},getList:function(){var e=this;this.listLoading=!0;var t={pageNum:this.listQuery.pageNum,pageSize:this.listQuery.pageSize,resName:this.listQuery.resName,uri:this.listQuery.uri,resTypeId:this.listQuery.resTypeId};Object(a.e)(t).then(function(t){e.listLoading=!1,e.list=t.list,e.total=t.total})},getCateList:function(){var e=this;Object(l.d)({pageNum:1,pageSize:10}).then(function(t){for(var s=t.list,r=0;r<s.length;r++){var i=s[r];e.categoryOptions.push({label:i.title,value:i.resTypeId})}e.defaultCategoryId=s[0].resTypeId})}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("el-card",{staticClass:"filter-container",attrs:{shadow:"never"}},[s("div",[s("i",{staticClass:"el-icon-search"}),e._v(" "),s("span",[e._v("筛选搜索")]),e._v(" "),s("el-button",{staticStyle:{float:"right"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleSearchList()}}},[e._v("\n        查询搜索\n      ")]),e._v(" "),s("el-button",{staticStyle:{float:"right","margin-right":"15px"},attrs:{size:"small"},on:{click:function(t){return e.handleResetSearch()}}},[e._v("\n        重置\n      ")])],1),e._v(" "),s("div",{staticStyle:{"margin-top":"15px"}},[s("el-form",{attrs:{inline:!0,model:e.listQuery,size:"small","label-width":"140px"}},[s("el-form-item",{attrs:{label:"资源名称："}},[s("el-input",{staticClass:"input-width",attrs:{placeholder:"资源名称",clearable:""},model:{value:e.listQuery.resName,callback:function(t){e.$set(e.listQuery,"resName",t)},expression:"listQuery.resName"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"资源路径："}},[s("el-input",{staticClass:"input-width",attrs:{placeholder:"资源路径",clearable:""},model:{value:e.listQuery.uri,callback:function(t){e.$set(e.listQuery,"uri",t)},expression:"listQuery.uri"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"资源分类："}},[s("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"选择资源分类",clearable:""},model:{value:e.listQuery.resTypeId,callback:function(t){e.$set(e.listQuery,"resTypeId",t)},expression:"listQuery.resTypeId"}},e._l(e.categoryOptions,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)],1)]),e._v(" "),s("el-card",{staticClass:"operate-container",attrs:{shadow:"never"}},[s("i",{staticClass:"el-icon-tickets"}),e._v(" "),s("span",[e._v("数据列表")]),e._v(" "),s("el-button",{staticClass:"btn-add",staticStyle:{"margin-left":"20px"},attrs:{size:"mini"},on:{click:function(t){return e.handleAdd()}}},[e._v("添加")]),e._v(" "),s("el-button",{staticClass:"btn-add",attrs:{size:"mini"},on:{click:function(t){return e.handleShowCategory()}}},[e._v("资源分类")])],1),e._v(" "),s("div",{staticClass:"table-container"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"resourceTable",staticStyle:{width:"100%"},attrs:{data:e.list,border:""}},[s("el-table-column",{attrs:{label:"编号",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.resId))]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"资源名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.resName))]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"资源路径",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.uri))]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"描述",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.description))]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"添加时间",width:"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("formatDateTime")(t.row.createTime)))]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作",width:"140",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(s){return e.handleUpdate(t.$index,t.row)}}},[e._v("\n            编辑\n          ")]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(s){return e.handleDelete(t.$index,t.row)}}},[e._v("删除\n          ")])]}}])})],1)],1),e._v(" "),s("div",{staticClass:"pagination-container"},[s("el-pagination",{attrs:{background:"",layout:"total, sizes,prev, pager, next,jumper","current-page":e.listQuery.pageNum,"page-size":e.listQuery.pageSize,"page-sizes":[10,15,20],total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){return e.$set(e.listQuery,"pageNum",t)},"update:current-page":function(t){return e.$set(e.listQuery,"pageNum",t)}}})],1),e._v(" "),s("el-dialog",{attrs:{title:e.isEdit?"编辑资源":"添加资源",visible:e.dialogVisible,width:"40%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("el-form",{ref:"resourceForm",attrs:{model:e.resource,"label-width":"150px",size:"small"}},[s("el-form-item",{attrs:{label:"资源名称："}},[s("el-input",{staticStyle:{width:"250px"},model:{value:e.resource.resName,callback:function(t){e.$set(e.resource,"resName",t)},expression:"resource.resName"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"资源路径："}},[s("el-input",{staticStyle:{width:"250px"},model:{value:e.resource.uri,callback:function(t){e.$set(e.resource,"uri",t)},expression:"resource.uri"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"资源分类："}},[s("el-select",{staticStyle:{width:"250px"},attrs:{placeholder:"选择资源分类",clearable:""},model:{value:e.resource.resTypeId,callback:function(t){e.$set(e.resource,"resTypeId",t)},expression:"resource.resTypeId"}},e._l(e.categoryOptions,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),s("el-form-item",{attrs:{label:"描述："}},[s("el-input",{staticStyle:{width:"250px"},attrs:{type:"textarea",rows:5},model:{value:e.resource.description,callback:function(t){e.$set(e.resource,"description",t)},expression:"resource.description"}})],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.handleDialogConfirm()}}},[e._v("确 定")])],1)],1),e._v(" "),s("div",{staticStyle:{height:"100px"}})],1)},staticRenderFns:[]};var p=s("VU/8")(c,d,!1,function(e){s("uGAS")},null,null);t.default=p.exports},uGAS:function(e,t){},xJrl:function(e,t,s){"use strict";t.e=function(e){return Object(r.a)({url:"/admin/queryResource",method:"post",data:e})},t.a=function(e){return Object(r.a)({url:"/admin/addResource",method:"post",data:e})},t.c=function(e){return Object(r.a)({url:"/admin/editResource",method:"post",data:e})},t.b=function(e){return Object(r.a)({url:"/admin/deleteResource",method:"post",data:e})},t.d=function(e){return Object(r.a)({url:"/admin/queryMenuResourceList",method:"post",data:e})};var r=s("vLgD")}});
//# sourceMappingURL=9.a877da3dde26743f646c.js.map