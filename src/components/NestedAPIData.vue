<script setup>
import testData from "../utils/apiTestData.js"
import { onMounted, ref } from "vue"

const props = defineProps({
    expanded: {
        type: Boolean,
        default: false,
    },
    depth: {
        type: Number,
        default: 0,
        required: false
    },
    propertyPath: {
        type: String,
        default: "",
    },
    isArray: {
        type: Boolean,
        default: false,
        required: false,
    },
    name: {
        type: String,
        default: "",
    },
    data: {
        type: Object,
        default: null,
    },
});

const isObject = (property) => {
    return typeof property === "object";
}
const isArray = (property) => {
    return Array.isArray(property);
}

const sortData = () => {
    listData.value.sort((a,b) => {
        if(isObject(a[1]) && !isObject(b[1])){
            return -1
        }
        else if (!isObject(a[1]) && isObject(b[1])){
            return 1
        }
        else{
            return a[0].localeCompare(b[0]);
        }
    })
}

const displayPath = (propertyName) => {
    console.log(props.propertyPath + "." + propertyName)
}

const getPropertyPath = (propertyName) => {
    return props.propertyPath + `${props.isArray ? '[*]' : ''}.` + propertyName
}

const togglePanel = () => {
    panel.value = !panel.value;

    if(listData.value.length < 1){
        if(props.isArray) listData.value = Object.entries(props.data[0])
        else listData.value = Object.entries(props.data);
        sortData()
    }
}

const listData = ref([])
const panel = ref(false);

onMounted(()=>{
    panel.value = props.expanded;
})

</script>

<template>
    <v-col :class="`pa-0 ${depth > 0 ? 'ml-3 pr-3': ''} pb-1`">
        <v-card 
            @click="togglePanel" 
            class="w-100 elevation-0 mb-2"
            color="secondary"
        >
            <v-row no-gutters class="align-center">
                <v-icon size="large" class="ml-2">{{panel ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                <v-card-text >
                    {{props.name}}{{props.isArray ? " : Array" : ''}}
                </v-card-text>
            </v-row>
        </v-card>
        <v-expand-transition>
            <div v-show="panel">
                <div v-for="property in listData" :key="property[0]" class="pa-0">
                    <NestedAPIData 
                        v-if="isObject(property[1])"
                        :property-path="getPropertyPath(property[0])"
                        :is-array="isArray(property[1])"
                        :name="property[0]" 
                        :depth="props.depth + 1"
                        :data="property[1]"
                    />
                    <v-chip v-else draggable class="ml-4 my-1"> {{ property[0] }} : {{ property[1] }}</v-chip>
                </div>
            </div>
        </v-expand-transition>
    </v-col>
</template>