<template>
    <v-col
      v-for="n in 4"
      :key="n"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card>
        <v-skeleton-loader type="image" height="200px" />
        <v-card-text>
          <v-skeleton-loader type="heading" width="80%" />
          <v-skeleton-loader type="text" width="60%" class="mt-2" />
        </v-card-text>
      </v-card>
    </v-col>
  </template>