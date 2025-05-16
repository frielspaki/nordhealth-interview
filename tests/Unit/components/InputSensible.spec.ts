import { renderSuspended } from '@nuxt/test-utils/runtime'
import { InputSensible } from '#components'
import { screen } from '@testing-library/vue'
import { it, expect, describe } from "vitest";
import {mount} from "@vue/test-utils";

describe('Test InputSensible', () => {
    it('Error text is displayed', async () => {
        await renderSuspended(InputSensible, {
            props: {
                error: 'This is an error'
            }
        });

        expect(screen.getByText('This is an error')).toBeDefined();
    });

    it('Input type password on default', async () => {
        await renderSuspended(InputSensible, {
            props: {
                modelValue: 'some_password',
            }
        });

        const input: HTMLInputElement | null = document.querySelector('input[type=password]');

        expect(input).not.toBeNull();
        expect(input?.type).toBe('password');
        expect(input?.value).toBe('some_password');
    });

    it('Input type password when not reveal', async () => {
        await renderSuspended(InputSensible, {
            props: {
                modelValue: 'some_password',
                reveal: false
            }
        });

        const input: HTMLInputElement | null = document.querySelector('input[type=password]');

        expect(input).not.toBeNull();
        expect(input?.type).toBe('password');
        expect(input?.value).toBe('some_password');
    });

    it('Input type text on reveal', async () => {
        await renderSuspended(InputSensible, {
            props: {
                modelValue: 'some_password',
                reveal: true
            }
        });

        const inputPassword: HTMLInputElement | null = document.querySelector('input[type=password]');
        const input: HTMLInputElement | null = document.querySelector('input[type=text]');

        expect(inputPassword).toBeNull();
        expect(input).not.toBeNull();
        expect(input?.type).toBe('text');
        expect(input?.value).toBe('some_password');
    });

    it('Label is set', async () => {
        await renderSuspended(InputSensible, {
            props: {
                label: 'Password',
            }
        });

        const label = screen.getByLabelText('Password');

        expect(label).not.toBeNull();
    });

    it('Id is set on input and label', async () => {
        await renderSuspended(InputSensible, {
            props: {
                label: 'Password',
                id: 'some-id'
            }
        });

        const label: HTMLLabelElement | null = document.querySelector('label');
        const input: HTMLInputElement | null = document.querySelector('input[type=password]');

        expect(label).instanceof(HTMLLabelElement);
        expect(input).instanceof(HTMLInputElement);

        expect(label?.getAttribute('for')).toBe('some-id');
        expect(input?.id).toBe('some-id');
    });

    it('Required adds * on label', async () => {
        await renderSuspended(InputSensible, {
            props: {
                label: 'Password',
                required: true
            }
        });

        const label: HTMLLabelElement | null = document.querySelector('label');

        expect(label).instanceof(HTMLLabelElement);

        expect(label?.textContent).contains('*');
    });

    it('Not required has no * on label', async () => {
        await renderSuspended(InputSensible, {
            props: {
                label: 'Password',
                required: false
            }
        });

        const label: HTMLLabelElement | null = document.querySelector('label');

        expect(label).instanceof(HTMLLabelElement);

        expect(label?.textContent).not.contains('*');
    });

    it('Required defaults to false', async () => {
        await renderSuspended(InputSensible, {
            props: {
                label: 'Password'
            }
        });

        const label: HTMLLabelElement | null = document.querySelector('label');

        expect(label).instanceof(HTMLLabelElement);

        expect(label?.textContent).not.contains('*');
    });

    // Didn't cover all the tests, this is just an example.
});
