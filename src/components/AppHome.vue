<template>
    <div class="home">
        <app-home-sidebar :documents="documents"
                          v-model:selected-document="selectedDocument"
                          v-model:search="search"
                          @filter="filterDocuments"
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

const filterDocuments = (search: string): void => {
    store.dispatch('fetchDocuments', {search});
};

const fetchDocuments = async () => {
    const resp = await store.dispatch('fetchDocuments', search.value ? {search: search.value} : {});
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
}
</style>