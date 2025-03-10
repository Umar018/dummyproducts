const productContainer = document.getElementById("productContainer");
        const loadMoreBtn = document.getElementById("loadMoreBtn");
        let products = [];
        let visibleCount = 5;

        async function fetchProducts() {
            try {
                const response = await fetch("https://dummyjson.com/products");
                const data = await response.json();
                products = data.products;
                displayProducts(visibleCount);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        function displayProducts(count) {
            productContainer.innerHTML = "";
            products.slice(0, count).forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");
                productCard.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.price} USD</p>
                    <p>⭐ ${product.rating}</p>
                `;
                productContainer.appendChild(productCard);
            });

            if (count >= products.length) {
                loadMoreBtn.style.display = "none";
            }
        }
        loadMoreBtn.addEventListener("click", () => {
            visibleCount = products.length;
            displayProducts(visibleCount);
        });

        fetchProducts();