<template>
  <div
    class="w-55"
    flex="~ col"
    space="y-10"
    p="5"
  >
    <NEllipsis>
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
    </NEllipsis>

    <NEllipsis
      line-clamp="2"
    >
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
    </NEllipsis>

    <NEllipsis
      line-clamp="2"
      expand-trigger
    >
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
    </NEllipsis>

    <NEllipsis>
      我曾难自拔于世界之大 也沉溺于其中梦话 不得真假 不做挣扎 不惧笑话
      <template #tooltip>
        <div text="center">
          《起风了》
          <br>
          我曾难自拔于世界之大
          <br>
          也沉溺于其中梦话
          <br>
          不得真假 不做挣扎 不惧笑话
        </div>
      </template>
    </NEllipsis>
  </div>
</template>

<script>
import NEllipsis from '@/components/NEllipsis'

export default {
  name: 'Ellipsis',
  components: {
    NEllipsis,
  },
}
</script>
