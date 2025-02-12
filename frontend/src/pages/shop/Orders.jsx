import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "../../utils/baseURL";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const vendorId = 1; // Change dynamically based on auth

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/orders/vendor/${vendorId}`);
                setOrders(response.data.orders);

                // Initialize selectedStatus state with order item status
                const initialStatus = {};
                response.data.orders.forEach(orderItem => {
                    initialStatus[orderItem.order_item_id] = orderItem.status;
                });
                setSelectedStatus(initialStatus);
            } catch (error) {
                console.error("Error fetching vendor orders:", error);
            }
        };
        fetchOrders();
    }, [vendorId]);

    const handleStatusChange = (orderItemId, newStatus) => {
        setSelectedStatus(prev => ({ ...prev, [orderItemId]: newStatus }));
    };

    const updateStatus = async (orderItemId) => {
        try {
            await axios.put(`${getBaseUrl()}/api/orderitems/${orderItemId}/status`, {
                status: selectedStatus[orderItemId],
            });

            setOrders(prevOrders =>
                prevOrders.map(orderItem =>
                    orderItem.order_item_id === orderItemId
                        ? { ...orderItem, status: selectedStatus[orderItemId] }
                        : orderItem
                )
            );

            alert("Order status updated successfully!");
        } catch (error) {
            console.error("Error updating order status:", error.response?.data || error);
            alert("Failed to update order status.");
        }
    };

    return (
        <div>
            <h2>Vendor Orders</h2>
            {orders.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f2f2f2" }}>
                            <th style={styles.th}>Customer ID</th>
                            <th style={styles.th}>Product</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Created At</th>
                            <th style={styles.th}>Address</th> {/* NEW ADDRESS COLUMN */}
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(orderItem => (
                            <tr key={orderItem.order_item_id} style={styles.tr}>
                                <td style={styles.td}>{orderItem.order?.customer_id}</td>
                                <td style={styles.td}>{orderItem.product?.name}</td>
                                <td style={styles.td}>{orderItem.quantity}</td>
                                <td style={styles.td}>${orderItem.product?.price}</td>
                                <td style={styles.td}>{new Date(orderItem.order?.created_at).toLocaleString()}</td>
                                <td style={styles.td}>
                                    {orderItem.order?.address ? (() => {
                                        const addressObj = JSON.parse(orderItem.order.address); // Parse JSON string
                                        return (
                                            <>
                                                {addressObj.province && <>{addressObj.province} <br /></>}
                                                {addressObj.district && <>{addressObj.district} <br /></>}
                                                {addressObj.municipality && <>{addressObj.municipality} <br /></>}
                                                {addressObj.additionalInfo && <>{addressObj.additionalInfo}</>}
                                            </>
                                        );
                                    })() : "N/A"}
                                </td>
                                <td style={styles.td}>
                                    <select
                                        value={selectedStatus[orderItem.order_item_id] || "pending"}
                                        onChange={(e) => handleStatusChange(orderItem.order_item_id, e.target.value)}
                                        style={styles.select}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => updateStatus(orderItem.order_item_id)}
                                        className="btn"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
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
    tr: { backgroundColor: "#fff" },
    select: { padding: "5px", borderRadius: "5px", cursor: "pointer" },
    button: { padding: "5px 10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }
};

export default Orders;
