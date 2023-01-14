<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="" prop="shopId">
        <el-input
          v-model="queryParams.shopId"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="座位id" prop="tableId">
        <el-input
          v-model="queryParams.tableId"
          placeholder="请输入座位id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排队号" prop="short">
        <el-input
          v-model="queryParams.short"
          placeholder="请输入排队号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人数" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入人数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总金额" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入总金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实收金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入实收金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="优惠金额	" prop="discountAmount">
        <el-input
          v-model="queryParams.discountAmount"
          placeholder="请输入优惠金额	"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="pay">
        <el-input
          v-model="queryParams.pay"
          placeholder="请输入支付方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否结算" prop="isBill">
        <el-input
          v-model="queryParams.isBill"
          placeholder="请输入是否结算"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="结算时间" prop="billTime">
        <el-date-picker clearable
          v-model="queryParams.billTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择结算时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:order:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:order:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:order:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:order:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="" align="center" prop="id" />
      <el-table-column label="" align="center" prop="shopId" />
      <el-table-column label="座位id" align="center" prop="tableId" />
      <el-table-column label="排队号" align="center" prop="short" />
      <el-table-column label="人数" align="center" prop="number" />
      <el-table-column label="总金额" align="center" prop="price" />
      <el-table-column label="实收金额" align="center" prop="amount" />
      <el-table-column label="优惠金额	" align="center" prop="discountAmount" />
      <el-table-column label="支付方式" align="center" prop="pay" />
      <el-table-column label="是否结算" align="center" prop="isBill" />
      <el-table-column label="订单状态" align="center" prop="status" />
      <el-table-column label="菜单ids" align="center" prop="foodIds" />
      <el-table-column label="结算时间" align="center" prop="billTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.billTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:order:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:order:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="" prop="shopId">
          <el-input v-model="form.shopId" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="座位id" prop="tableId">
          <el-input v-model="form.tableId" placeholder="请输入座位id" />
        </el-form-item>
        <el-form-item label="排队号" prop="short">
          <el-input v-model="form.short" placeholder="请输入排队号" />
        </el-form-item>
        <el-form-item label="人数" prop="number">
          <el-input v-model="form.number" placeholder="请输入人数" />
        </el-form-item>
        <el-form-item label="总金额" prop="price">
          <el-input v-model="form.price" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="实收金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入实收金额" />
        </el-form-item>
        <el-form-item label="优惠金额	" prop="discountAmount">
          <el-input v-model="form.discountAmount" placeholder="请输入优惠金额	" />
        </el-form-item>
        <el-form-item label="支付方式1 微信 2 支付宝 3 云闪付 4 现金" prop="pay">
          <el-input v-model="form.pay" placeholder="请输入支付方式1 微信 2 支付宝 3 云闪付 4 现金" />
        </el-form-item>
        <el-form-item label="是否结算 0 否 1 是" prop="isBill">
          <el-input v-model="form.isBill" placeholder="请输入是否结算 0 否 1 是" />
        </el-form-item>
        <el-form-item label="菜单ids" prop="foodIds">
          <el-input v-model="form.foodIds" placeholder="请输入菜单ids" />
        </el-form-item>
        <el-form-item label="结算时间" prop="billTime">
          <el-date-picker clearable
            v-model="form.billTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结算时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOrder, getOrder, delOrder, addOrder, updateOrder } from "@/api/system/order";

export default {
  name: "Order",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        shopId: null,
        tableId: null,
        short: null,
        number: null,
        price: null,
        amount: null,
        discountAmount: null,
        pay: null,
        isBill: null,
        status: null,
        foodIds: null,
        billTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        shopId: null,
        tableId: null,
        short: null,
        number: null,
        price: null,
        amount: null,
        discountAmount: null,
        pay: null,
        isBill: null,
        status: null,
        foodIds: null,
        billTime: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOrder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOrder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项？').then(function() {
        return delOrder(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/order/export', {
        ...this.queryParams
      }, `order_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
