<script setup lang="ts">
import { Routes } from "~/utils/routes";

const { t } = useI18n();
</script>

<template>
    <div class="container">
        <h1>Thank you!</h1>
        <h2>Ricardo Malveiro</h2>
        <NuxtLink :to="Routes.HOME">
            <provet-button variant="primary">{{ t('actions.back') }}</provet-button>
        </NuxtLink>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100dvh;
}
</style>