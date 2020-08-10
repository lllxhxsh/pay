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
            <el-input v-model="listQuery.acctName" class="input-width" placeholder="请输入账户名称" clearable maxlength="20"></el-input>
          </el-form-item>

          <el-form-item label="变动类型：">
              <el-select v-model="listQuery.billTypeCode" placeholder="选择变动类型" clearable style="width: 150px">
                  <el-option v-for="item in billTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="变动日期：">
              <el-date-picker
                  class="input-width"
                  v-model="listQuery.date"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="listQuery.telephone" class="input-width" placeholder="请输入手机号" clearable maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>账单列表</span>

    </el-card>
    <div class="table-container">
      <el-table ref="resourceTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="账户ID" width="100" align="center">
          <template slot-scope="scope">{{scope.row.acctId}}</template>
        </el-table-column>
        <el-table-column label="手机号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.telephone}}</template>
        </el-table-column>
        <el-table-column label="账户名称" width="100" align="center">
          <template slot-scope="scope">{{scope.row.acctName}}</template>
        </el-table-column>
        <el-table-column label="账单号" align="center">
          <template slot-scope="scope">{{scope.row.transRelationSn}}</template>
        </el-table-column>
        <el-table-column label="变动类型" align="center">
          <template slot-scope="scope">{{scope.row.billTitle}}</template>
        </el-table-column>
        <el-table-column label="变动时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.refundState}}</template>
        </el-table-column>
        <el-table-column label="变动金额" align="center">
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
  import {queryBill,queryBillType} from '@/api/bill';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    acctName: "",
    billTypeCode: "",
    date:"",
    telephone:""
  };
  const defaultResource = {
    billIcon:null,
    amount:null,
    billTypeCode:null,
    direct:null,
    acctId:null,
    transRelationSn:null,
    acctName:null,
    createTime:null,
    transType:null,
    billTitle:null,
    telephone:null,
    refundState:null,

  };
  export default {
    name: 'queryBill',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        resource: Object.assign({}, defaultResource),
        billTypeList:[],
        billTypeData:{},
      }
    },
    created() {
      this.getList();
      this.getBillTypeList();
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

      transTypeFilter(value) {


        if (value == "10") {
          return '充值';
        }else if(value == "11") {
          return '结算';
        }else if(value == "00") {
          return '龙信红包';
        }else if(value == "01") {
          return '线上商城';
        }else if(value == "02") {
          return '扫码中奖';
        }else if(value == "03") {
          return '线下兑奖';
        } else {
          return '其他';
        }
        // if (this.billTypeData != null) {
        //   return this.billTypeData[value];
        // } else{

        // }


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


      getList() {
        this.listLoading = true;
        var listData = {"pageNum":this.listQuery.pageNum,"pageSize":this.listQuery.pageSize,"acctName":this.listQuery.acctName,"type":this.listQuery.billTypeCode,"date":this.listQuery.date,"telephone":this.listQuery.telephone};
        queryBill(listData).then(response => {

          this.listLoading = false;
          this.list = response.list;
          this.total = response.total;
        });
      },

      getBillTypeList() {

        var billTypeData = {};
        queryBillType(billTypeData).then(response => {
          var tempList =  response.list;
          for(let i=0;i<tempList.length;i++){
            let cate = tempList[i];
            this.billTypeList.push({label:cate.billTypeDesc,value:cate.billTypeCode});
            this.billTypeData[cate.billTypeCode] = cate.billTypeDesc;
          }
          console.log('---------------');
          console.log(this.billTypeData);

        });
      },

    }
  }
</script>
<style></style>
