<script>
import doc from '@/assets/images/doc.png'
import xls from '@/assets/images/xls.png'
import jpg from '@/assets/images/jpg.png'
import png from '@/assets/images/png.png'
import pdf from '@/assets/images/pdf.png'
import rar from '@/assets/images/rar.png'
import zip from '@/assets/images/zip.png'

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pathMap: {
        doc,
        docx: doc,
        xls,
        xlsx: xls,
        jpg,
        png,
        pdf,
        rar,
        zip,
      },
    }
  },
}
</script>

<template>
  <img :src="pathMap[type]" alt="" set="">
</template>
