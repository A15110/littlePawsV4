import { supabase } from '../supabase';
import { Database } from '../database.types';

type Client = Database['public']['Tables']['clients']['Row'];
type Pet = Database['public']['Tables']['pets']['Row'];

export async function createClient(clientData: Omit<Client, 'id' | 'created_at'>, petData: Omit<Pet, 'id' | 'created_at' | 'client_id'>) {
  try {
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    // Start a transaction by using the RPC function
    const { data: result, error: transactionError } = await supabase.rpc('create_client_with_pet', {
      client_data: {
        ...clientData,
        created_by: userData.user.id
      },
      pet_data: {
        ...petData,
        created_by: userData.user.id
      }
    });

    if (transactionError) throw transactionError;
    return result;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
}

export async function getClients() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select(`
        *,
        pets (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
}

export async function updateClient(
  clientId: string,
  updates: Partial<Client>
) {
  try {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', clientId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
}

export async function deleteClient(clientId: string) {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
}