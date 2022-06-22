# Cert
sudo certbot certonly --nginx --agree-tos -m contact@inspektre.io -d sydney.inspektre.com --preferred-challenges dns

# ASVS Version 4.0.3

- Copy the latest version of ASVS JSON formatted file [from here](https://github.com/OWASP/ASVS/blob/master/4.0/docs_en/OWASP%20Application%20Security%20Verification%20Standard%204.0.3-en.json)




## CSP Headers from Nginx

- In order to use GraphQL Playground on `https://asvs.inspektre.com`, The following CSP Headers are required to load GraphQL Playground.

- GraphQL Playground has been enabled temporarily but will be removed in the future iterations of ASVS Graph.

- Please note: Introspection has been disabled. The schema is available for examination within this Repo eitherway.

```
add_header Content-Security-Policy   "default-src 'none'; connect-src https://asvs.inspektre.com; font-src https://fonts.gstatic.com; img-src https://cdn.jsdelivr.net; script-src 'unsafe-inline' https://cdn.jsdelivr.net/npm/@apollographql/graphql-playground-react@1.7.42/build/static/js/middleware.js; style-src 'unsafe-inline' https://cdn.jsdelivr.net/npm/@apollographql/graphql-playground-react@1.7.42/build/static/css/ https://fonts.googleapis.com/;" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Served-By  "inspektre" always;
```