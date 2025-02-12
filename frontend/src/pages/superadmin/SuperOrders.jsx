import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../utils/baseURL";

const SuperOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/orders/superadmin/orders`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders for superadmin:", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>All Orders (Superadmin)</h2>
            {orders.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f2f2f2" }}>
                            <th style={styles.th}>Order ID</th>
                            <th style={styles.th}>Customer ID</th>
                            <th style={styles.th}>Vendor Name</th>
                            <th style={styles.th}>Product</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Total Price</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            order.orderItems.map(orderItem => (
                                <tr key={orderItem.order_item_id} style={styles.tr}>
                                    <td style={styles.td}>{order.order_id}</td>
                                    <td style={styles.td}>{order.customer_id}</td>
                                    <td style={styles.td}>{orderItem.vendor?.vendorName || "N/A"}</td>
                                    <td style={styles.td}>{orderItem.product?.name}</td>
                                    <td style={styles.td}>{orderItem.quantity}</td>
                                    <td style={styles.td}>${orderItem.subtotal}</td>
                                    <td style={styles.td}>{orderItem.status}</td>
                                    <td style={styles.td}>{new Date(order.created_at).toLocaleString()}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

const styles = {
    th: { padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" },
    td: { padding: "10px", borderBottom: "1px solid #ddd" },
    tr: { backgroundColor: "#fff" }
};

export default SuperOrders;