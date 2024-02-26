import Layout from '@/components/ui/Layout/Layout';
import { OrdersTable, Thead } from '../../Style/Orders.styled';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Order } from '@/models/Order';
import { getSession } from 'next-auth/react';
import connectMongo from '@/db/mongoose';

const Orders = ({ orders }) => {
  return (
    <Layout>
      <h1> Your Orders</h1>
      <OrdersTable>
        <Thead>
          <tr>
            <td>ID</td>
            <td>Client data</td>
            <td>Products</td>
            <td>Status</td>
          </tr>
        </Thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map(order => (
              <tr key={nanoid()}>
                <td>{order._id}</td>
                <td>{order.client}</td>
                <td>
                  {order.order.map(o => (
                    <p key={nanoid()}>
                      {o.price_data.product_data.name} - {o.quantity} pcs.
                      <br />
                    </p>
                  ))}
                </td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </OrdersTable>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  await connectMongo();

  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
  const orders = await Order.find({ client: session.user.email });

  return {
    props: { orders: JSON.parse(JSON.stringify(orders)), session: session },
  };
}

export default Orders;
