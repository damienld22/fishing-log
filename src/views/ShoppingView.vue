<template>
  <div class="flex flex-col mx-4">
    <ul class="list-disc list-inside">
      <li :key="item.id" v-for="item in items" class="list-item relative py-2 flex-col items-center justify-center">
        <span>{{ item.label }}</span>
        <div
          @click="deleteItem(item.id)"
          class="absolute right-2 top-0 bottom-0 my-auto flex flex-col items-center justify-center"
        >
          <font-awesome-icon icon="fa-trash" />
        </div>
      </li>

      <ListInput class="py-2" placeholder="New item" @validate="addItem" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useShopping } from "@/services/use-shopping";
import ListInput from "@/components/form/ListInput.vue";

const { items, deleteItem, addItem } = useShopping();
</script>
