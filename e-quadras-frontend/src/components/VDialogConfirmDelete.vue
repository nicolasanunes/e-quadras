<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['confirmDelete'])
</script>

<template>
  <v-dialog width="545px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" color="error" size="x-small" icon="mdi-close"></v-icon>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card tile>
        <v-progress-linear model-value="100" color="error" :height="10"></v-progress-linear>
        <div class="d-flex align-center">
          <v-icon color="error" size="90" icon="mdi-alert-octagon" class="ml-6 my-4"></v-icon>
          <div>
            <v-card-title
              ><h3 class="font-weight-regular">
                Você não poderá reverter esta ação!
              </h3></v-card-title
            >
            <v-card-text>
              <p>{{ text }}</p>
            </v-card-text>
          </div>
        </div>
        <v-progress-linear model-value="0" :height="2"></v-progress-linear>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Cancelar"
            color="info"
            variant="outlined"
            elevation="2"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            text="Excluir"
            color="error"
            variant="flat"
            elevation="2"
            @click="
              () => {
                emit('confirmDelete'), (isActive.value = false)
              }
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style></style>
