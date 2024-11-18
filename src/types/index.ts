import { Prisma, PrismaClient } from '@prisma/client';

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

// Use Prisma's where clause structure for TData
export type PrismaWhere<TData> =
  | Prisma.SelectSubset<TData, Prisma.Prisma__Pick<any, keyof TData>>
  | ((aliases: TData) => Prisma.Prisma__Pick<any, keyof TData> | undefined)
  | undefined;

// Initialize PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Initialize PrismaClient with global instance
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
