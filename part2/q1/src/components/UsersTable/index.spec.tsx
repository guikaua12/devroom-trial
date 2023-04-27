import '@testing-library/jest-dom';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, it, vitest, expect } from 'vitest';
import UsersTable from './index';

describe('UserList', () => {
    it('displays a list of users', async () => {
        const users = [{ id: 1, name: 'Approximations', email: 'test@test.com', phone: '555-1234' }];

        vitest.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify(users), { status: 200 }));

        render(<UsersTable />);

        expect(await screen.findByText('Approximations')).toBeInTheDocument();
        expect(await screen.findByText('test@test.com')).toBeInTheDocument();
        expect(await screen.findByText('555-1234')).toBeInTheDocument();
    });

    it('test fetch fail', async () => {
        vitest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to fetch.'));

        render(<UsersTable></UsersTable>);

        expect(await screen.findByText('Failed to fetch.')).toBeInTheDocument();
    });
});
