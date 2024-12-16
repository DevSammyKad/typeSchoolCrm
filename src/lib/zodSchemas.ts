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

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const leadSchema = z.object({
  leadName: z.string().min(1, 'Lead name is required'),
  leadAge: z.number().positive('Age must be a positive number').optional(),
  leadStatus: z.enum([
    'NEW',
    'CONVERTED',
    'CONTACTED',
    'FOLLOW_UP',
    'MISSED',
    'CLOSED',
  ]),
  leadSource: z.enum([
    'FACEBOOK',
    'GOOGLE_ADS',
    'LINKEDIN',
    'TWITTER',
    'INSTAGRAM',
    'REFERRAL',
    'WEBSITE',
    'EMAIL_CAMPAIGN',
    'EVENTS',
    'COLD_CALL',
  ]),
  leadPhoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits'),
  leadEmail: z.string().email('Invalid email'),
  note: z.string().optional(),
});

// export type Expense = z.infer<typeof leadSchema>;
