import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;

  // Check if user is an admin
  const { data: adminData, error: adminError } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (adminError) {
    await supabase.auth.signOut();
    throw new Error('Unauthorized access');
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function checkAdminStatus(userId: string) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) return false;
  return data?.role === 'admin';
}

export async function createAdminUser(email: string, password: string) {
  try {
    // Create user through Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) throw authError;

    // Add user to admin_users table
    const { error: adminError } = await supabase
      .from('admin_users')
      .insert({
        id: authData.user.id,
        role: 'admin'
      });

    if (adminError) {
      // Rollback user creation if admin role assignment fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw adminError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { success: false, error };
  }
}