<template>
  <div class="panel-phone">
    <el-form style="max-width: 600px" label-width="60px">
      <el-form-item label="手机号" prop="name" required>
        <el-input />
      </el-form-item>
      <el-form-item label="验证码" prop="name" required>
        <div class="verify-phone">
          <el-input />
          <el-button class="verify-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.panel-phone {
  .verify-phone {
    display: flex;
    flex-direction: row;
    align-items: center;

    .verify-btn {
      margin-left: 8px;
    }
  }
}
</style>
