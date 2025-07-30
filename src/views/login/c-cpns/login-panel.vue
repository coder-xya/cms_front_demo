<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs class="eltab" type="border-card" stretch>
      <el-tab-pane label="帐号登录">
        <PanelAcount />
      </el-tab-pane>
      <el-tab-pane label="手机登录">
        <PanelPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="btm-container">
      <el-checkbox label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="btn" type="primary" size="large">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import PanelAcount from './panel-acount.vue';
import PanelPhone from './panel-phone.vue';
</script>

<style lang="less" scoped>
.login-panel {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .eltab {
    width: 100%;
  }
  .btm-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .btn {
    width: 100%;
  }
}
</style>
