<template>
  <div>
    <label
      for=""
      v-if="props.label"
      class="block pl-3 ml-px mb-1 text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <input
      :value="props.modelValue" @input="event => emits('update:modelValue', event.target.value)"
      class="w-full block px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      :placeholder="props.placeholder" :type="props.type" :id="props.id"
      />
  </div>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    default: "text",
  },
});
</script>
