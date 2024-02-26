import Layout from '@/components/ui/Layout/Layout';
import { OrdersTable, Thead } from '../../Style/AllOrders.styled';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [uniqueClients, setUniqueClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      const uniqueClients = Array.from(
        new Set(response.data.map(order => order.client))
      );
      setUniqueClients(uniqueClients);
    });
  }, []);

  const handleClientSelect = event => {
    const selectedValue = event.target.value;
    setSelectedClient(selectedValue === 'all' ? '' : selectedValue);
  };

  const filteredOrders = selectedClient
    ? orders.filter(order => order.client === selectedClient)
    : orders;

  return (
    <Layout>
      <h1> Orders</h1>
      <label>client</label>
      <select value={selectedClient} onChange={handleClientSelect}>
        <option value="all">All clients</option>
        {uniqueClients.map(client => (
          <option key={nanoid()} value={client}>
            {client}
          </option>
        ))}
      </select>
      <OrdersTable>
        <Thead>
          <tr>
            <td>ID</td>
            <td>Client data</td>
            <td>Products</td>
          </tr>
        </Thead>
        <tbody>
          {filteredOrders.length > 0 &&
            filteredOrders.map(order => (
              <tr key={nanoid()}>
                <td>{order._id}</td>
                <td>{order.client}</td>
                <td>
                  {order.order.map(o => (
                    <>
                      {o.price_data.product_data.name} - {o.quantity} pcs.
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </OrdersTable>
    </Layout>
  );
};

export default Orders;
