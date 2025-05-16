<script setup lang="ts">
import { Routes } from "~/utils/routes";

const { t } = useI18n();
</script>

<template>
    <provet-header>
        <h1 class="n-typescale-l">{{ t('app.name') }}</h1>

        <NuxtLink :to="Routes.SIGNUP" :aria-label="t('aria.label.navigate_to_sign_up')" slot="end">
            <provet-button variant="primary" data-testid="signup-button">
                {{ t('actions.sign_up') }}
            </provet-button>
        </NuxtLink>
    </provet-header>
</template>
