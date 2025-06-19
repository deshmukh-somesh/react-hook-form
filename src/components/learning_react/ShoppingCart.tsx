import { useState } from "react";

const ShoppingCart = () => {

    interface product {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity?: number

    }




    const [cart, setCart] = useState<product[]>([])

    const products = [
        { id: 1, name: "Coffee Mug", price: 12.99, image: "☕" },
        { id: 2, name: "Notebook", price: 8.50, image: "📓" },
    ];

    const AddtoCart = (product: product) => {

        const existingItem = cart.find(item => item.id === product.id)
        // console.log("existing element", existingItem)

        if (existingItem) {

            // Incresing the quantity of the existeing item . 
            setCart(
                cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 0) + 1 }
                        : item
                )
            )


        } else {

            setCart([...cart, { ...product, quantity: 1 }]); // "Just add it to the array"
        }

    }

    // console.log("cart has", cart);

    return (
        <div className="flex">

            <div>
                <h1>My Store</h1>



                {
                    products.map((product) => (
                        <div key={product.id}>
                            <div>{product.image}</div>
                            <div>{product.price}</div>
                            <div>{product.name}</div>
                            <button onClick={() => AddtoCart(product)}>Add to cart</button>
                        </div>
                    ))
                }
            </div>
            <div className="w-30">
                <h1>Cart</h1>



                {
                    cart.map((item) => (
                        <div key={item.id}>
                            <div>{item.image}</div>
                            <span>{item.name} x{item.quantity}</span>
                            <span>${item.price * (item.quantity || 0)}</span>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default ShoppingCart;