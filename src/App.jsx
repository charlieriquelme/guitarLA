import Header from "./components/Header"
import Guitar from './components/Guitar';
import { useCart } from "./hooks/useCart";

function App() {
    // no se puede tener dentro de una condicional un hook

    // si el componente trabaja con una api, se debe primero trabajar con el usestate vacio y luego ocupar un 
    // useeffect para problar el arreglo, una vez cargado todos los componentes

    // el state de react es asincrono

    // forma para llamar directamente los objetos que retorna el hook personalizado
    const {data, cart, 
        addToCart, removeFromCart, increaseQuantity, 
        decreaseQuantity, clearCart, isEmpty,cartTotal} = useCart();

    return (
    <>
        <Header
            cart={cart}
            removeFromCart  ={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart       ={clearCart}
            isEmpty         ={isEmpty}
            cartTotal       ={cartTotal}
        />
        
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar)=>(
                    <Guitar
                    // siempre se debe agregar el prop key cuando se itera un objeto
                        key={guitar.id}
                        guitar={guitar}
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
