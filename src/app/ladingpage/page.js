import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import Section from "./Section";
import '@/styles/Typography.css';

// Function to fetch products from the API
async function fetchProducts() {
    try {
        // API call to fetch product data
        const APIResponse = await axios.get('https://fakestoreapi.com/products');
        return APIResponse.data; // Return the fetched data
    } catch (error) {
        // Log the error to the console for debugging
        console.error("Error fetching products:", error);
        return null; // Return null if an error occurs
    }
}

// Main page component
async function Page() {
    // Fetch data from the API
    const data = await fetchProducts();

    return (
        <>
            {/* Render the Header */}
            <Header />

            {/* Render the Section if data is available; show loading otherwise */}
            {data ? (
                <Section apidataprops={data} />
            ) : (
                <h1 className="text-center mb-24">Loading...</h1>
            )}

            {/* Render the Footer */}
            <Footer />
        </>
    );
}

export default Page;
