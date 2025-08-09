<templa/e>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs
      class="eltab"
      type="border-card"
      stretch
      v-model="activeTabName"
      @tab-click="handleTabClick"
    >
      <el-tab-pane label="帐号登录" name="account">
        <template #label>
          <div class="label">
            <el-icon><User /></el-icon>
            <span>帐号登录</span>
          </div>
        </template>
        <PanelAccount ref="accountLoginRef" />
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="phone">
        <template #label>
          <div class="label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </div>
        </template>
        <PanelPhone />
      </el-tab-pane>
    </el-tabs>
    <div v-show="activeTabName === 'account'" class="btm-container">
      <el-checkbox label="记住密码" size="large" v-model="isRemPwd" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="btn" type="primary" size="large" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PanelAccount from './panel-account.vue';
import PanelPhone from './panel-phone.vue';
import type { TabsPaneContext } from 'element-plus';
import { localCache } from '@/utils/cache';

const IS_REM_PWD = 'isRemPwd';
const activeTabName = ref('account');
const isRemPwd = ref<boolean>(localCache.getCache(IS_REM_PWD) ?? false);
watch(isRemPwd, (newValue) => {
  console.log(newValue);
  console.log(localCache.getCache(IS_REM_PWD));

  localCache.setCache(IS_REM_PWD, newValue);
  console.log(localCache.getCache(IS_REM_PWD));
});
const accountLoginRef = ref<InstanceType<typeof PanelAccount>>(); //TODO:子组件类型定义

function handleTabClick(tab: TabsPaneContext, event: Event) {
  console.log(tab, event);
}

function handleLoginClick() {
  if (activeTabName.value === 'account') {
    //执行帐号登录操作
    accountLoginRef.value?.loginAction(isRemPwd.value);
  } else {
    //执行手机号登陆操作
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .eltab {
    width: 100%;
    .label {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
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
    margin-top: 10px;
  }
}
</style>
