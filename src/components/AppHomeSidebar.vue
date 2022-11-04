<template>
    <div class="sidebar">
        <div class="sidebar_search">
            <h3>Поиск документа</h3>
            <app-input :value="search" placeholder="Введите ID документа" @update:value="updateSearch"/>

        </div>
        <div class="sidebar_results">
            <h3>Результаты</h3>
            <document-card v-for="doc in documents"
                           :doc="doc"
                           :is-active="doc.id===selectedDocumentDisplayed?.id"
                           @click="selectDocument(doc)"/>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AppHomeSidebar'
};
</script>
<script setup lang="ts">
import AppInput from '@/components/UI/AppInput.vue';
import DocumentCard from '@/components/UI/DocumentCard.vue';
import {useDebounce} from '@/composable/useDebounce';
import {computed, defineProps, ref} from 'vue';
import {Document} from '@/interfaces/document';

const props = defineProps({
    documents: {type: Array as () => Document[], default: () => []},
    search: {type: String, default: ''},
    selectedDocument: {
        type: Object as () => (Document | null), default: () => null,
    },
});

const emit = defineEmits<{
    (e: 'update:selectedDocument', doc: Document): void,
}>();
const search = ref<string>('');

const selectedDocumentDisplayed = computed({
    get: (): Document | null => props.selectedDocument,
    set: (doc: Document | null): void => emit('update:selectedDocument', doc!),
});

const {debouncedFunction: updateSearch} = useDebounce((val: string) => {
    search.value = val;
});

const selectDocument = (doc: Document): void => {
    selectedDocumentDisplayed.value = doc;
};

</script>

<style lang="scss" scoped>
.sidebar {
  width: 282px;
  padding: 27px 22px 60px 20px;

  &_search {
    margin-bottom: 29px;
  }

  &_results {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
}
</style>