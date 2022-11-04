// import debounce from 'lodash.debounce'
import {onBeforeMount, onUnmounted} from 'vue';

const debounce = require('lodash.debounce');

export const useDebounce= (callback: Function, ms:number = 300)=>{
    let debouncedFunction: Function = ()=>{};
    onBeforeMount(()=>{
        debouncedFunction = debounce(callback, ms);
    })
    onUnmounted(()=>{
        // @ts-ignore
        debouncedFunction?.cancel && debouncedFunction.cancel();
    })

    return {debouncedFunction}
}