<template>
    <div class="home-main">
        <div v-if="doc" class="home-card">
            <div class="home-card_image card-image">
                <img class="card-image_image image-cover" :src="doc.image" alt="">
            </div>
            <div class="home-card_info">
                <div class="home-card_tools tools">
                    <h3>{{ doc.name }}</h3>
                    <div class="tools_buttons">
                        <app-button label="скачать"/>
                        <app-button button-type="danger" label="удалить"/>
                    </div>
                </div>
                <div class="home-card_description">
                    <h3>Описание:</h3>
                    <p class="text-secondary">
                        {{ doc.description }}
                    </p>
                </div>
            </div>
        </div>
        <div v-show="!doc" class="home-main__empty">
            <span>Выберите документ, чтобы посмотреть его содержиое</span>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AppHomeMain'
};
</script>
<script setup lang="ts">
import {defineProps} from 'vue';
import AppButton from '@/components/UI/AppButton.vue';

const props = defineProps({
    doc: {type: Object as () => (Document | null), default: () => null},
});

</script>

<style lang="scss" scoped>
.home-main {
  width: 100%;
  height: 100%;
  padding: 30px;
  border-left: 1px solid #E0E0E0;

  &__empty{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .home-card {
    display: flex;

    &_info {
      margin-left: 61px;
    }

    .tools {
      margin-bottom: 47px;

      &_buttons {
        display: flex;
        gap: 10px;

        & > button {
          width: 114px;
          height: 31px;
        }
      }
    }
  }

  .card-image {
    min-width: 424px;
    height: 286px;
    border: 1px solid #E0E0E0;
  }
}
</style>