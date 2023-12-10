import {create} from 'zustand';
import {toast} from 'react-hot-toast';
import {createJSONStorage, persist} from "zustand/middleware";

import {Product} from '@/types';

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
    updateQuantity: (id: string, quantity: number) => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                return toast('Item already in cart.');
            }

            set({items: [...get().items, {...data, quantity: 1}]});
            toast.success('Item added to cart.');
        },
        removeItem: (id: string) => {
            set({items: [...get().items.filter((item) => item.id !== id)]});
            toast.success('Item removed from cart.');
        },
        removeAll: () => set({items: []}),
        updateQuantity: (id: string, quantity: number) => {
            set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? {...item, quantity} : item
                ),
            }));
        },
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    }));

export default useCart;