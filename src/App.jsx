import Header from "./components/Header"
import Guitar from './components/Guitar';
import { useEffect, useState } from "react";
import {db} from './data/db'

function App() {
    // no se puede tener dentro de una condicional un hook

    // si el componente trabaja con una api, se debe primero trabajar con el usestate vacio y luego ocupar un 
    // useeffect para problar el arreglo, una vez cargado todos los componentes

    // el state de react es asincrono

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart): []
    }

    const [data] = useState(db)
    const [cart , setCart]  = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    /*  de esta forma se arregla el problema de tener un 
        el state de react asincrono con la funcion de guardar datos en el localstorage

        ademas de que el uso de useeeffect actualiza el lcoalstorage cada vez que cambia cart :D
    */
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemExist = cart.findIndex( guitar => guitar.id ===item.id)

        if(itemExist >= 0 ) {
            // caso cuando ya existe el dato en el carro
            // codigo que no muta el carro original
            if(cart[itemExist].quantity >= MAX_ITEMS) return 
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        }else{
            item.quantity = 1
            setCart([...cart,item])
        }
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar =>guitar.id !== id))
    }

    function increaseQuantity(id){
        const updateCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS){ 
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)

    }

    function decreaseQuantity(id){
        const updateCart2 = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS) { 
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart2)
    }

    function clearCart(e){
        setCart([])
    }


    return (
    <>
        <Header
            cart={cart}
            removeFromCart  ={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart       ={clearCart}
        />
        
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar)=>(
                    <Guitar
                    // siempre se debe agregar el prop key cuando se itera un objeto
                        key={guitar.id}
                        guitar={guitar}
                        setCart={setCart}
                        addToCart={addToCart}
                    />                       
                ))}
            </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
    </>
)
}

export default App
