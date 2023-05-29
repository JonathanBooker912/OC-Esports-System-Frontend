<script>
import { ref, onMounted } from "vue";

const editAlias = ref("False")

export default {
    props: ['alias', 'isAdd', 'titles'],
    emits: ['addAlias', 'update', 'deleteAlias'],
}

</script>

<template>
    <div>
        <div v-if="!editAlias">
            <tr>  
                <td>{{ props.alias.id }}</td>
                <td>{{ props.alias.title }}</td>
                <td>{{ props.alias.gamerTag }}</td>
                <td> 
                    <v-icon small class="mx-4" @click="$emit('editAlias')">
                    mdi-pencil
                    </v-icon>
                    <v-icon small class="mx-4" @click="$emit('deleteAlias')">
                    mdi-trash-can
                    </v-icon>
                </td>
            </tr>
        </div>
        

        <div v-if="editAlias"> 
            <tr>
                <td> </td>
                <td> 
                    <input type="text" value="props.alias.title" >
                </td>
                <td> 
                    <v-select label="Game Title">

                    </v-select>
                </td>
            </tr>
        </div>
    </div>
</template>
