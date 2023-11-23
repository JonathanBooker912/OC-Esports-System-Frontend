<script setup>
import testData from "../utils/apiTestData.js"
import NestedAPIData from "./NestedAPIData.vue"
import { onMounted, ref } from "vue"

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

const getEachItem = (object) => {
    searchResult.value = [];
    filteredObj.value = {};
    searchItem(object, "");
    console.log(searchResult.value)

    searchResult.value.forEach((result) => {
        if(!filteredObj.value[result.path]){
            filteredObj.value[result.path] = {}
        }
        filteredObj.value[result.path][result.key] = result.value
    })
    listData.value = Object.entries(filteredObj.value)
};

const getPropertyPath = (object, key, parentPath) => {
    return parentPath + (parentPath == "" ? '' : '.') + key + `${isArray(object) ? '[*]' : ''}`;
}

const searchItem = (item, propertyPath) => {
    if(isArray(item)){
        searchItem(item[0], propertyPath)
    }
    else {
        Object.keys(item).forEach(key => {
            if (typeof item[key] === "object") {
                const path = getPropertyPath(item[key], key, propertyPath);
                searchItem(item[key], path) 
            }
            else {
                let searchAsRegEx = new RegExp(searchTerm.value, "gi");

                if (key.match(searchAsRegEx)) {
                    searchResult.value.push({key, path: propertyPath, value: item[key]})
                }
            }
        
        })
  }
}

const searchTerm = ref("")
const searchResult = ref([])
const filteredObj = ref({});
const listData = ref([])

onMounted(()=>{
    listData.value = Object.entries(testData);
    sortData()
})
</script>

<template>
    <v-row class="justify-end" no-gutters>
        <v-card class="w-50 ma-6 pa-2">
            <v-row class="justify-end" no-gutters>
                <v-text-field
                    v-model="searchTerm"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    style="max-width: 35%"
                    name="Search"
                    label="Search"
                    @change="getEachItem(testData)"
                />
            </v-row>
            <div v-if="filteredObj != {}">
                <div v-for="property in listData" :key="property[0]">
                    <NestedAPIData
                        v-if="isObject(property[1])"
                        :property-path="property[0]"
                        :is-array="isArray(property[1])"
                        :name="property[0]" 
                        :data="property[1]"
                        expanded
                    />
                    <v-chip v-else draggable class="ml-4 my-1"> {{ property[0] }} : {{ property[1] }}</v-chip>
                </div>
            </div>
            <div v-else>
                <div v-for="property in listData" :key="property[0]">
                    <NestedAPIData
                        v-if="isObject(property[1])"
                        :property-path="property[0]"
                        :is-array="isArray(property[1])"
                        :name="property[0]" 
                        :data="property[1]"
                    />
                    <v-chip v-else draggable class="ml-4 my-1"> {{ property[0] }} : {{ property[1] }}</v-chip>
                </div>
            </div>
        </v-card>
    </v-row>
</template>