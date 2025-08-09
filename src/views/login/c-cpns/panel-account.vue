<template>
  <div class="panel-account">
    <el-form
      ref="formRef"
      label-width="auto"
      :model="account"
      :rules="accountRules"
      status-icon
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login';
import type { IAccount } from '@/types';
import { localCache } from '@/utils/cache';
import { ElMessage } from 'element-plus';
import { type ElForm, type FormRules } from 'element-plus';
import { reactive, ref } from 'vue';

const ACCOUNT_NAME = 'accountName';
const ACCOUNT_PASSWORD = 'accountPassword';
//account数据
const account = reactive<IAccount>({
  name: localCache.getCache(ACCOUNT_NAME),
  password: localCache.getCache(ACCOUNT_PASSWORD),
});
// 校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '帐号不能为空!', trigger: 'blur' },
    { pattern: /^[a-z0-9]{5,20}$/, message: '长度为5-20', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空!', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '长度为3以上的数字字母组合',
      trigger: 'blur',
    },
  ],
};

// 帐号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    //TODO:帐号密码规则验证
    if (valid) {
      const name = account.name;
      const password = account.password;
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          //是否记住密码
          localCache.setCache(ACCOUNT_NAME, name);
          localCache.setCache(ACCOUNT_PASSWORD, password);
        } else {
          localCache.removeCache(ACCOUNT_NAME);
          localCache.removeCache(ACCOUNT_PASSWORD);
        }
      });
    } else {
      ElMessage.error('帐号不符合规则');
    }
  });
}
defineExpose({ loginAction }); //TODO:将子组件方法暴露出去给父组件调用
</script>

<style lang="less" scoped>
.panel-account {
}
</style>
