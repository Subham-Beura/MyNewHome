export type User = {
  id?: string;
  email_id: string;
  password: string;
  created_at: Date;
  first_name: string;
  middle_name?: string;
  last_name: string;
  isAdmin: boolean;
  phone_number: string;
};
