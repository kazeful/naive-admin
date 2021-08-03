<template>
  <div p="5">
    <SwitchRoles @change="handleRolesChange" />
    <div :key="key" m="t-8">
      <div>
        <span
          v-permission="['admin']"
          class="inline-block w-80"
          text="hex-67c23a"
          p="2 4"
          m="t-15px"
          border="rounded"
          bg="hex-f0f9eb"
        >
          Only
          <el-tag bg="hex-ecf5ff" size="small">admin</el-tag>
          can see this
        </span>
        <el-tag v-permission="['admin']" m="l-15px" type="info">
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span
          v-permission="['editor']"
          class="inline-block w-80"
          text="hex-67c23a"
          p="2 4"
          m="t-15px"
          border="rounded"
          bg="hex-f0f9eb"
        >
          Only
          <el-tag bg="hex-ecf5ff" size="small">editor</el-tag>
          can see this
        </span>
        <el-tag v-permission="['editor']" m="l-15px" type="info">
          v-permission="['editor']"
        </el-tag>
      </div>

      <div>
        <span
          v-permission="['admin', 'editor']"
          class="inline-block w-80"
          text="hex-67c23a"
          p="2 4"
          m="t-15px"
          border="rounded"
          bg="hex-f0f9eb"
        >
          Both
          <el-tag bg="hex-ecf5ff" size="small">admin</el-tag>
          and
          <el-tag bg="hex-ecf5ff" size="small">editor</el-tag>
          can see this
        </span>
        <el-tag v-permission="['admin', 'editor']" m="l-15px" type="info">
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>

    <div :key="`checkPermission${key}`" class="mt-15">
      <aside>
        In some cases, using v-permission will have no effect. For example: Element-UI's Tab
        component or el-table-column and other scenes that dynamically render dom. You can only do
        this with v-if.
        <br>
        e.g.
      </aside>

      <el-tabs type="border-card" class="w-138">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
          Admin can see this
          <el-tag m="l-15px" type="info">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">
          Editor can see this
          <el-tag m="l-15px" type="info">
            v-if="checkPermission(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['admin', 'editor'])" label="Admin-OR-Editor">
          Both admin or editor can see this
          <el-tag m="l-15px" type="info">
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import { checkPermission } from '@/directives/permission' // 权限判断函数

export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  data() {
    return {
      key: 1, // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.key++
    },
  },
}
</script>
