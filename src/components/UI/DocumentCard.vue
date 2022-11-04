<template>
    <div class="doc-card" :class="{'doc-card__active': isActive}" @click="click">
        <div class="doc-card_image card-image" :class="{'doc-card_image__active': isActive}">
            <img class="image-cover" :src="doc.image" alt="">
        </div>
        <div class="doc-card_info">
            <div class="doc-card_title"
                 :class="{'doc-card_title__active': isActive}">
                {{ doc.name }}</div>
            <!--            <div class="text-secondary">{{doc.size}}</div>-->
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'DocumentCard'
};
</script>
<script setup lang="ts">
const props = defineProps({
    doc: {type: Object as () => Document, required: true},
    isActive: {type: Boolean, default: false},
});
const emit = defineEmits<{
    (e: 'click'): void
}>();

const click = () => emit('click');

</script>

<style lang="scss" scoped>
.doc-card {
  display: flex;
  width: 240px;
  height: 70px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
  }

  &__active {
    background: $blue-500;
  }

  &_image {
    border-right: 1px solid #E0E0E0;
    &__active{
      border-right-color: $blue-500;
    }
  }

  .card-image {
    width: 70px;
    height: 70px;
  }

  &_info {
    padding: 15px;
  }

  &_title {
    margin-bottom: 6px;
    font-weight: 600;
    line-height: 17px;
    color: $dark;

    &__active{
      color: $light;
    }
  }
}
</style>