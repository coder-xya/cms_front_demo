<template>
  <div class="panel-phone">
    <el-form style="max-width: 600px" label-width="auto">
      <el-form-item label="手机号" prop="name" required>
        <el-input />
      </el-form-item>
      <el-form-item label="密码" prop="name" required>
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.panel-phone {
}
</style>
