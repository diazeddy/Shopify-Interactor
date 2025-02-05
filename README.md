# Shopify-Interactor

Build a simple script that communicate with shopify through Shopify’s graphql APIs.

## Environment

- Windows 11
- Node v22.12.0
- Npm 10.9.0

## Tech Stacks

- Javascript

## Steps to run program

1. Clone the repository

2. Install node modules

   ```shell
   npm install
   ```

3. Create .env file.
   ```
   SHOPIFY_DOMAIN="Shopify Url"
   ADMIN_TOKEN="Shopify Admin Token"
   ```

4. Run project
   ```shell
   node app.js --name {product}
   ```

## Examples

### Sample Input
```
node app.js --name shirt
```

### Sample Output
```
A shirt - 3 / black - price $15.00
A shirt - 3 / white - price $15.00
A shirt - 3 / red - price $15.00
A shirt - 3 / blue - price $15.00
A shirt - 2 / black - price $25.00
A shirt - 2 / white - price $25.00
A shirt - 2 / red - price $25.00
A shirt - 2 / blue - price $25.00
A shirt - 4 / black - price $35.00
A shirt - 4 / white - price $35.00
```