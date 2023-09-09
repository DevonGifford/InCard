import { render, screen } from '@testing-library/react'

import Navbar from '@/app/components/navbar';
import Home from '@/app/page';

//✅ working 
test('tests the tester', () => {
    //-testing setup
});

//✅ working 
test('tests the tester 2', () => {
    expect(1).toBe(1);
});

// //🎯 FAILING
// test('tests the tester 3', () => {
//     const {getByText} = render(<Home />)

//     const test = screen.getByText('shall not')

//     expect(test).toBeInTheDocument();
// });

//🎯 FAILING - NAVBAR

jest.mock('next-auth/react')
test('tests the tester 3', () => {
    render(<SessionProvider><Navbar /></SessionProvider>)

    const test = screen.getByText('shall not')

    expect(test).toBeInTheDocument();
});