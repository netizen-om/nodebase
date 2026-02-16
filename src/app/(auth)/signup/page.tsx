import { RegisterForm } from '@/features/auth/components/register-form.tsx'
import { requireUnauth } from '@/lib/auth-utils';
import React from 'react';

const page = async() => {
  await requireUnauth();
  return  <RegisterForm />
}

export default page