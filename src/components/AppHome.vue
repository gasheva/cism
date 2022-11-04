<template>
    <div class="home">
        <app-home-sidebar :documents="documents"
                          v-model:selected-document="selectedDocument"
                          :search="search"
                          @update:search="updateSearch"
        />
        <app-home-main :doc="selectedDocument"/>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AppHome'
};
</script>
<script setup lang="ts">
import AppHomeSidebar from '@/components/AppHomeSidebar.vue';
import AppHomeMain from '@/components/AppHomeMain.vue';
import {onBeforeMount, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const documents = ref<Document[]>([]);
const selectedDocument = ref<Document | null>(null);
const search = ref<string>('');
// const error = ref<string>('')

const updateSearch = async (val: string) => {
    search.value = val;
    selectedDocument.value = null;
    await fetchDocuments(search.value);
};

const fetchDocuments = async (search?: string): Promise<void> => {
    const resp = await store.dispatch('fetchDocuments', search ? {search: search} : {});
    if (resp?.failed) {

        return;
    }
    documents.value = resp;
};

onBeforeMount(() => {
    fetchDocuments();
});


</script>

<style lang="scss" scoped>
.home {
  @include form-border;
  display: flex;
  height: 575px;
  overflow: hidden;
}
</style>