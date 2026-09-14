import { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
export const OrderContext = createContext([]);
export default function OrderContexts({ children }) {
  const [editOrder, setEditOrder] = useState([]);
  useEffect(() => {
    const getOrder = async () => {
      const response = await axios.get(
        "https://randomapi.dev/api/orders?"
      );

      setEditOrder(response.data.data);
    };
    getOrder();
  }, []);
  return (
    <OrderContext.Provider value={{ editOrder, setEditOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
