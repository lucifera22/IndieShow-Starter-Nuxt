<script setup lang="ts">
import { useSeo } from "~/composables/useSeo"

// 更新页面的 SEO 信息
const { updatePageSeo } = useSeo()
updatePageSeo("sales")
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <MarkdownContent page="sales" />
    </main>
  </div>
</template>
