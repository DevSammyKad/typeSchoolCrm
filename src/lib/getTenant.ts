import { hostname } from 'os';

export function getTenantFromSubdomain() {
  const subdomain = hostname.split('.')[0]; // Assuming subdomain is first part of host
  return subdomain;
}
