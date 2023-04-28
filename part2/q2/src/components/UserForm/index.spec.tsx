import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vitest, expect } from 'vitest';
import UsersTable from './index';
import { User } from '../../constants/types/User';

describe('MyFormComponent', () => {
    it('should submit form successfully', async () => {
        const userResponse: User = {
            name: 'Approximations',
            email: 'test@test.com',
            phone: '127-4444',
        };

        const mockFetch = vitest
            .spyOn(global, 'fetch')
            .mockResolvedValue(new Response(JSON.stringify(userResponse), { status: 200 }));

        const users: User[] = [];

        function callback(data: User) {
            users.push(data);
        }

        const { getByLabelText, getByText } = render(<UsersTable callback={callback} />);
        const nameInput = getByLabelText('Name');
        const emailInput = getByLabelText('Email');
        const phoneInput = getByLabelText('Phone');
        const submitButton = getByText('Add');

        fireEvent.change(nameInput, { target: { value: userResponse.name } });
        fireEvent.change(emailInput, { target: { value: userResponse.email } });
        fireEvent.change(phoneInput, { target: { value: userResponse.phone } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
        expect(users.find((user) => user.email === userResponse.email)).toEqual(userResponse);
    });

    it('test fetch fail', async () => {
        const userResponse: User = {
            name: 'Approximations',
            email: 'test@test.com',
            phone: '127-4444',
        };

        const mockFetch = vitest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to fetch.'));

        const { getByLabelText, getByText } = render(<UsersTable callback={() => {}} />);
        const nameInput = getByLabelText('Name');
        const emailInput = getByLabelText('Email');
        const phoneInput = getByLabelText('Phone');
        const submitButton = getByText('Add');

        fireEvent.change(nameInput, { target: { value: userResponse.name } });
        fireEvent.change(emailInput, { target: { value: userResponse.email } });
        fireEvent.change(phoneInput, { target: { value: userResponse.phone } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

        expect(await screen.findByText('Failed to fetch.')).toBeInTheDocument();
    });
});
