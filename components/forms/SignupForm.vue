<script setup lang="ts">
import InputSensible from "~/components/InputSensible.vue";
import {z, type ZodFormattedError} from 'zod';

const { t } = useI18n();
const router = useRouter();

interface FormData {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    marketingAgreement: boolean
}

const form = ref<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    marketingAgreement: false
});

const schema = z.object({
    firstName: z.string()
        .nonempty(t('error.message.required')),
    lastName: z.string()
        .nonempty(t('error.message.required')),
    email: z.string()
        .nonempty(t('error.message.required'))
        .email(t('error.message.valid_email')),
    password: z.string()
        .nonempty(t('error.message.required')),
    marketingAgreement: z.boolean()
});

const errors = ref<ZodFormattedError<FormData>>();

const submitAction = async () => {
    const validation = schema.safeParse(form.value);

    if (!validation.success) {
        errors.value = validation.error.format();
        return;
    }

    await $fetch(Routes.API_SIGNUP, {
        method: 'POST',
        body: form.value,
        onResponse({response}) {
            if (response.status === 201) {
                router.push(Routes.SIGNUP_SUCCESS);
            }
        },
        onResponseError() {
            // push toast with error
        }
    });
};
</script>

<template>
    <form @submit.prevent="submitAction">
        <provet-stack direction="vertical" gap="m">
            <provet-stack direction="horizontal">
                <provet-input
                    id="first-name_input"
                    :label="t('label.first_name')"
                    @input="form.firstName = $event.target.value"
                    :value="form.firstName"
                    :error="errors?.firstName?._errors.shift()"
                    required
                />

                <provet-input
                    id="last-name_input"
                    :label="t('label.last_name')"
                    @input="form.lastName = $event.target.value"
                    :value="form.lastName"
                    :error="errors?.lastName?._errors.shift()"
                    required
                />
            </provet-stack>

            <provet-divider />

            <provet-input
                id="email_input"
                :label="t('label.email')"
                @input="form.email = $event.target.value"
                :value="form.email"
                :error="errors?.email?._errors.shift()"
                expand
                required
            />

            <InputSensible
                id="password_input"
                v-model="form.password"
                :label="t('label.password')"
                :error="errors?.password?._errors.shift()"
                :aria-label="t('aria.label.reveal_password')"
                expand
                required
            />

            <provet-divider />

            <provet-stack>
                <provet-toggle id="marketing-agreement_toogle"
                               :label="t('label.marketing_agreement')"
                               :checked="form.marketingAgreement"
                               @change="form.marketingAgreement = $event.target.checked" />
            </provet-stack>

            <provet-stack direction="horizontal" justify-content="space-between">
                <NuxtLink :to="Routes.HOME" data-testid="cancel-signup-button"><provet-button type="button">{{ t('actions.cancel') }}</provet-button></NuxtLink>
                <provet-button variant="primary" type="submit" data-testid="submit-signup-button">{{ t('actions.submit') }}</provet-button>
            </provet-stack>
        </provet-stack>
    </form>
</template>