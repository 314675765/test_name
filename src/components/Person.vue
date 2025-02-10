<template>
  <div ref="change">{{ age }}</div>
  <button @click="changeAge">修改年龄</button>
</template>
<script setup lang="ts" name="Person">
import { ref, reactive, watchEffect, withDefaults } from "vue";
import { type personList, type personInter } from "../types";
import { usePerson } from "../store/person";
import { storeToRefs } from "pinia";
const personlist = usePerson();
console.log("person", personlist.sum);
const { sum } = storeToRefs(usePerson());

let age = ref(18);
let info = reactive({
  name: "聂开元",
  brand: "宝马",
});
let change = ref();
let some = ref();
watchEffect(() => {
  if (age.value >= 50) {
    console.log("响应成功");
  }
});
console.log(age, info);

function changeAge() {
  age.value += 10;
  console.log("change", change.value, some.value);
}
let object: personList = [{ name: "", age: "", id: 0 }];
let person: Array<personInter> = [{ name: "", age: "", id: 0 }];
withDefaults(defineProps<{ list: personList; age?: personList }>(), {
  list: () => [{ name: "小王", age: "18", id: 545454545 }],
  age: () => [{ name: "小王", age: "18", id: 545454545 }],
});

function Animal(name) {
  this.name = name; // 这里的 this 指向 Animal 实例
}

function Dog(name, breed) {
  console.log("看看是啥", this);

  Animal.call(this, name); // 这里的 this 指向 Dog 的新实例
  this.breed = breed; // 这里的 this 仍然指向 Dog 的新实例
}
// 创建 Dog 实例
const myDog = new Dog("Buddy", "Golden Retriever");
</script>
