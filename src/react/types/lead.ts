export type Lead = {
  name: string;
  lastname: string
  email: string;
  phone: Phone;
  industry: number;
  message: string;
}

export type Phone = {
  phoneNumber: string;
  dialingCode: string;
  iso_code: string;
}