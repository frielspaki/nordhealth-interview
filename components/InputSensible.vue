<script setup lang="ts">

const props = withDefaults(defineProps<{
    id?: string,
    expand?: boolean,
    reveal?: boolean,
    label?: string,
    error?: string,
    required?: boolean,
    ariaLabel?: string
}>(), {
    id: 'input-sensible',
    expand: false,
    reveal: false,
    required: false
});

const modelValue = defineModel<string>();
const _reveal = ref<boolean>(props.reveal);

const type = computed((): string => _reveal.value ? 'text' : 'password');
const icon = computed((): string => _reveal.value ? 'interface-edit-off' : 'interface-edit-on');

const toogleRevealAction = (): boolean => _reveal.value = !_reveal.value;
</script>

<template>
    <provet-stack direction="vertical" gap="s">
        <label :for="id" class="n-label" v-if="label">
            <span>{{ label }}</span>
            <span v-if="required" aria-hidden="true" class="required">*</span>
        </label>

        <div :class="['input-container', expand ? 'w-full' : 'w-min']">
            <input :id="id" :data-testId="id" :class="['n-input', { 'w-full' : expand }]"
                   :type="type"
                   v-model="modelValue"
                   autocomplete="off"
                   spellcheck="false"
                   :aria-invalid="error !== undefined"
            />
            <button class="input-reveal" type="button" @click="toogleRevealAction" :aria-label="ariaLabel">
                <provet-icon :name="icon" size="l"/>
            </button>
        </div>

        <span v-if="error" class="n-caption n-error">{{ error }}</span>
    </provet-stack>
</template>

<style scoped>
.input-container {
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
}

.input-container > input {
    padding-right: 3.5rem;
}

.input-container > .input-reveal {
    padding: 0;
    margin: 0;
    cursor: pointer;
    position: absolute;
    right: 1rem;
    border: none;
    background-color: transparent;
}

.required {
    color: var(--n-color-status-danger);
    margin-inline-start: var(--n-space-xs);
}

.w-full {
    width: 100%;
}

.w-min {
    width: min-content;
}
</style>