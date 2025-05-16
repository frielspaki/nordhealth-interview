<script setup lang="ts">
import SignupForm from "~/components/forms/SignupForm.vue";

const { t } = useI18n();
</script>

<template>
    <provet-stack class="container" align-items="center" justify-content="center">
        <provet-card class="card-area">
            <h1>{{ t('actions.sign_up') }}</h1>
            <SignupForm />
        </provet-card>
    </provet-stack>
</template>

<style scoped>
.container {
    height: 100dvh;
    width: 100%;
}

.card-area {
    width: min-content;
}
</style>

