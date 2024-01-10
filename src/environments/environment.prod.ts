export const environment = {
  production: true,
  apiUrl: 'https://bill-api:8080',
  tokenAllowedDomains: [/bill-api:8080/],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};
