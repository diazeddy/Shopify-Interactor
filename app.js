import fetch from 'node-fetch';
import minimist from 'minimist';
import { config } from 'dotenv';

// Load environmetn variables
config(); 

// Shopify store credentials
const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

// GraphQL endpoint for the Shopify Admin API
const GRAPHQL_ENDPOINT = `${SHOPIFY_DOMAIN}/admin/api/2025-01/graphql.json`;

// Function to fetch products by name using Shopify's GraphQL API
async function fetchProductsByName(productName) {
    // GraphQL query to fetch products and their variants
    const query = `
        query GetProductsByName($query: String!) {
            products(first: 10, query: $query) {
                edges {
                    node {
                        title
                        variants(first: 10) {
                            edges {
                                node {
                                    title
                                    price
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    // Variables for the GraphQL query
    const variables = {
        query: `title:* ${productName} *`,
    };

    // Make the GraphQL request
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': ADMIN_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
    });

    // Parse the response
    const data = await response.json();    

    // Handle errors in the response
    if (data.errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
    }

    return data.data.products.edges;
}

// Function to sort variants by price
function sortVariantsByPrice(variants) {
    return variants.sort((a, b) => Number(a.node.price) - Number(b.node.price));
}

// Function to display products and their variants
function displayProducts(products) {
    products.forEach((product) => {
        const productTitle = product.node.title;
        const variants = sortVariantsByPrice(product.node.variants.edges);

        variants.forEach((variant) => {
            console.log(`${productTitle} - ${variant.node.title} - price $${variant.node.price}`);
        });
    });
}

async function main() {
    // Parse command-line arguments
    const args = minimist(process.argv.slice(2));
    const productName = args.name;

    if (!productName) {
        console.error('Error: Please provide a product name using the --name flag.');
        process.exit(1);
    }

    try {
        // Fetch products by name
        const products = await fetchProductsByName(productName);

        // Display the products and their variants
        displayProducts(products);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

main();