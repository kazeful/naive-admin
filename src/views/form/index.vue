<template>
  <el-tabs v-model="tabsValue" type="card">
    <el-tab-pane v-for="item in tabs" :key="item.name" lazy :label="item.title" :name="item.name">
      <component :is="item.components" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  components: {
    Tab1: () => import('./components/tab1.vue'),
    Tab2: () => import('./components/tab2.vue'),
  },
  data() {
    return {
      tabsValue: '1',
      tabs: [
        {
          title: 'Tab 1',
          name: '1',
          components: 'Tab1',
        },
        {
          title: 'Tab 2',
          name: '2',
          components: 'Tab2',
        },
      ],
    }
  },
}
</script>
