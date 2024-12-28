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

const GenderEnum = z.enum(['MALE', 'FEMALE', 'OTHER']);

export const studentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  profileImage: z.string().url().optional().nullable(),
  email: z.string().email().optional().nullable(),
  gender: GenderEnum,
  age: z.number().int().positive('Age must be a positive number'),
  address: z.string().min(1, 'Address is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  parentName: z.string().min(1, 'Parent name is required').optional(),
  parentContact: z.string().optional().nullable(),
  organizationId: z.string().uuid('Invalid organization ID'),
});

export type StudentFormData = z.infer<typeof studentSchema>;

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

export const gradeSchema = z.object({
  grade: z.string().min(1, 'Grade name is required'),
});
export const sectionSchema = z.object({
  gradeId: z.string(),
  name: z.string().min(1, 'Section name is required'),
});
