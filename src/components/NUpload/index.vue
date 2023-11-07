<template>
  <div class="w-125" bg="white">
    <input
      ref="fileInput"
      class="hidden"
      type="file"
      :accept="realAccept"
      :multiple="multiple"
      @change="handleFileChange"
    >
    <div
      v-if="!files.length"
      class="h-52"
      flex="~"
      border="1 dashed rounded"
      bg="hex-fafafa"
      :style="{ 'border-color': dragOver ? '#2d8cf0' : '#dddddd' }"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="handleDrop"
    >
      <div class="m-auto" flex="~ col" items="center" space="y-2">
        <img class="w-9" src="@/assets/images/empty.png" alt="" srcset="">
        <button
          p="y-2 x-4"
          font="400" text="14px hex-666666"
          border="1 solid hex-dddddd rounded"
          bg="white"
          cursor="pointer"
          @click="$refs.fileInput.click()"
        >
          选择文件
        </button>
        <p font="400 leading-22px" text="14px hex-999999">
          选择文件或拖放到虚线框内上传，支持拖拽文件夹
        </p>
        <p font="400 leading-22px" text="14px hex-999999">
          支持格式：{{ accept }}
        </p>
      </div>
    </div>
    <div
      v-else
      border="1 dashed rounded"
      bg="hex-fafafa"
      :style="{ 'border-color': dragOver ? '#2d8cf0' : '#dddddd' }"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="handleDrop"
    >
      <div
        class="min-h-166px"
        flex="~ col"
        p="y-4 x-8"
        divide="y-1 hex-dddddd"
      >
        <div
          v-for="file, index in files"
          :key="file.id"
          flex="~" justify="between" items="center"
          p="y-2"
        >
          <div
            flex="~" space="x-2"
            font="400 leading-7" text="14px hex-333333"
          >
            <img class="h-7" :src="pathMap[file.type]" alt="" set="">
            <LazyTooltip class="max-w-75" :content="file.name" />
            <span>{{ formatSize(file.size) }}</span>
          </div>
          <img
            class="h-5"
            cursor="pointer"
            src="@/assets/images/delete.png" alt="" srcset=""
            @click="handleDelete(index)"
          >
        </div>
      </div>
      <p
        v-if="multiple"
        font="400 leading-10"
        text="14px center hex-999999"
        bg="hex-f4f4f4"
        cursor="pointer"
      >
        <span class="underline" text="hex-418e80" @click="$refs.fileInput.click()">添加文件</span>
        <span>支持格式：{{ accept }}</span>
      </p>
    </div>
    <div flex="~" justify="end" space="x-2" p="y-5">
      <button
        p="y-2 x-4"
        font="400" text="14px white"
        border="1 solid hex-dddddd rounded"
        bg="hex-418e80"
        cursor="pointer"
        :style="{ opacity: isUploading || !files.length ? '40%' : '100%' }"
        @click="handleUpload"
      >
        {{ isUploading ? '上传中...' : '开始上传' }}
      </button>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getFilesAsync } from './helper'

import doc from '@/assets/images/doc.png'
import xls from '@/assets/images/xls.png'
import jpg from '@/assets/images/jpg.png'
import png from '@/assets/images/png.png'
import pdf from '@/assets/images/pdf.png'
import rar from '@/assets/images/rar.png'
import zip from '@/assets/images/zip.png'
import { asyncParallelLimit } from '@/utils'

export default {
  props: {
    accept: {
      type: String,
      default: 'doc,docx,xls,xlsx,jpg,png,pdf,rar,zip',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    maxSize: {
      type: Number,
      default: 5,
    },
    maxQuantity: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      dragOver: false,
      files: [],
      isUploading: false,
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
  computed: {
    realMaxSize() {
      return this.maxSize * 1024 * 1024
    },
    acceptList() {
      return this.accept.split(',')
    },
    realAccept() {
      return this.acceptList.join(',.')
    },
  },
  methods: {
    handleDrop(e) {
      this.dragOver = false
      // const files = Array.from(e.dataTransfer.files)
      const files = Array.from(e.dataTransfer.items)
      this.handleFiles(files, true)
    },
    handleFileChange(e) {
      const files = Array.from(e.target.files)
      this.handleFiles(files)
      this.$refs.fileInput.value = ''
    },
    async handleFiles(files, isDragDrop = false) {
      // 拖放文件支持文件夹 自动读取文件夹内的文件
      if (isDragDrop)
        files = await getFilesAsync(files)

      const filteredFiles = files.filter((file) => {
        const extension = file.name.split('.').pop().toLowerCase()
        if (!this.acceptList.includes(extension)) {
          Message.warning(`不支持上传${extension}文件`)
          return false
        }
        if (file.size > this.realMaxSize) {
          Message.warning(`${file.name}文件大小超过限制`)
          return false
        }
        return true
      })
      const processedFiles = filteredFiles.map((file) => {
        return {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.name.split('.').pop(),
          file,
        }
      })
      if (this.files.length + processedFiles.length > this.maxQuantity) {
        this.files.push(...processedFiles.slice(0, this.maxQuantity - this.files.length))
        Message.warning('文件数量超过限制')
      }
      else {
        this.files.push(...processedFiles)
      }
    },
    handleDelete(index) {
      this.files.splice(index, 1)
    },
    async handleUpload() {
      if (this.isUploading || !this.files.length)
        return
      this.isUploading = true
      await this.uploadFiles()
      this.isUploading = false
      // this.files = []
    },
    async uploadFiles() {
      // 模拟请求
      const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))
      const cloneFiles = this.files.slice()
      const tasks = cloneFiles.map((cloneItem, index) => {
        return () => new Promise((resolve, reject) => {
          asyncFn()
          async function asyncFn() {
            try {
              const res = await sleep((index + 1) * 500)
              this.handleDelete(this.files.findIndex(item => item.id === cloneItem.id))
              resolve(res)
            }
            catch (err) {
              Message.error(`${cloneItem.name}上传出错，请稍后再试`)
              reject(err)
            }
          }
        })
      })
      const results = await asyncParallelLimit(tasks, 3)
      console.log(results)
    },
    clearFiles() {
      this.files = []
    },
    formatSize(size) {
      if (size < 1024)
        return `${size}B`

      else if (size < 1024 * 1024)
        return `${Math.round(size / 1024)}KB`

      else
        return `${Math.round(size / (1024 * 1024))}MB`
    },
  },
}
</script>
