<script setup>
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue"
import FormServices from "../../services/formServices";
import FormSignatureServices from "../../services/formSignatureServices";

const directorForms = ref([])
const loading = ref(true)
const router = useRouter();

const getDirectorForms = async () => {
    await FormServices.getDirectorSignatureForms()
    .then((response) => {
        directorForms.value = response.data
    })

    directorForms.value.forEach((form) => {
        FormSignatureServices.getDirectorUnsigned(form.id)
        .then((response) => {
            const currentIndex = directorForms.value.indexOf(form)
            if(response.data.length < 1) {
                directorForms.value.splice(currentIndex, 1)
            } else {
                directorForms.value[currentIndex].unsignedCount = response.data.length
            }
        })
    })
}

const signForms = (version) => {
    router.push({ name: "directorSignForms", params: { formId: version }})
}

onMounted(async ()=>{
    await getDirectorForms()
    loading.value = false
})
</script>

<template>
    <v-card v-if="!loading">
        <v-card-title class="bg-primary">
            Unsigned Forms
        </v-card-title>
        <v-list>
            <v-list-item :key="currentForm.id" v-for="currentForm in directorForms" @click="signForms(currentForm.id)">
                <v-chip class="bg-accent mr-4 px-4">
                    {{currentForm.unsignedCount}}
                </v-chip>
                {{currentForm.form.name}}
            </v-list-item>
        </v-list>
    </v-card>
</template>