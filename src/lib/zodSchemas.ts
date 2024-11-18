import z from 'zod';

export const organizationSchema = z.object({
  subdomain: z
    .string()
    .refine(
      (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ''),
      'Organization SubDomain Url is required'
    ),
  organizationName: z.string().refine((val) => val.trim().length > 0, {
    message: 'Organization name is required',
  }),
  organizationType: z.string().refine((val) => val.trim().length > 0, {
    message: 'Organization type is required',
  }),
  organizationPanCard: z.string().min(1, 'PAN card is required'),
  organizationMail: z.string().email('Invalid email address'),
  organizationWebsite: z.string().url('Invalid website URL').optional(),
});

export const studentSchema = z.object({
  firstName: z.string(),
});
