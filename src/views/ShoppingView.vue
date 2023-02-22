<template>
  <div class="flex flex-col mx-10 mt-6">
    <ul class="list-disc list-inside">
      <li
        :key="item.id"
        v-for="item in shoppingList"
        class="list-item relative py-2 flex-col items-center justify-center"
      >
        <span>{{ item.label }}</span>
        <div
          @click="deleteItem(item.id)"
          class="absolute right-2 top-0 bottom-0 my-auto flex flex-col items-center justify-center"
        >
          <font-awesome-icon icon="fa-trash" />
        </div>
      </li>

      <li class="list-item relative py-2">
        <input
          type="text"
          placeholder="New item"
          v-model="newListItem"
          class="input input-ghost input-md inline pr-2"
          @keyup.enter="addItem"
        />

        <div @click="addItem" class="absolute right-2 top-0 bottom-0 my-auto flex flex-col items-center justify-center">
          <font-awesome-icon icon="fa-check" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { fetchAllShoppingItems, updateShoppingItems, type ShoppingListItem } from "@/services/shopping";
import { ref, watchEffect } from "vue";
import uniqid from "uniqid";

const shoppingList = ref<ShoppingListItem[]>(fetchAllShoppingItems());
const newListItem = ref("");

// Update storage when items are updated
watchEffect(() => {
  updateShoppingItems(shoppingList.value);
});

// Events handlers
const deleteItem = (itemId: string) => (shoppingList.value = shoppingList.value.filter((elt) => elt.id !== itemId));
const addItem = () => {
  shoppingList.value = [...shoppingList.value, { label: newListItem.value, id: uniqid() }];
  newListItem.value = "";
};
</script>
