import { useEffect, useState, useMemo } from "react";
import {db} from '../data/db'

export const useCart = () => {
    // los return en los hook personalizados se recomienda que sean objetos

    const auth = true

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

    // state derivado & useMemo
    // en este caso se ocupa usememo solo cuando el carro cambia
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price),0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

