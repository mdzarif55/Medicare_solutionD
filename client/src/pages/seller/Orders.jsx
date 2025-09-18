// // import React, { useEffect, useState } from 'react'
// // import { useAppContext } from '../../context/AppContext'
// // import { dummyOrders } from '../../assets/assets'
// // import toast from 'react-hot-toast'

// // const Orders = () => {
// //     const { currency, axios } = useAppContext()
// //     const [orders, setOrders] = useState([])

// //     const fetchOrders = async () => {
// //         try {
// //             const { data } = await axios.get('/api/order/seller')
// //             if (data.success) {
// //                 setOrders(data.orders)
// //             }
// //             else {
// //                 toast.error(data.message)
// //             }
// //         } catch (error) {
// //             toast.error(error.message)
// //         }
// //     }

// //     useEffect(() => {
// //         fetchOrders()
// //     }, [])

// //     return (
// //         <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
// //             <div className="md:p-10 p-4 space-y-4">
// //                 <h2 className="text-lg font-medium">Orders List</h2>

// //                 {orders.map((order, index) => (
// //                     <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">

// //                         {/* Product Images and Titles - Column wise */}
// //                         <div className="flex flex-col gap-3 max-w-80">
// //                             {order.items.map((item, index) => (
// //                                 <div key={index} className="flex items-center gap-3">
// //                                     <img
// //                                         className="w-12 h-12 object-cover border rounded"
// //                                         src={item.product.image[0]}
// //                                         alt={item.product.name[0]}
// //                                     />
// //                                     <p className="text-md font-medium">
// //                                         {item.product.name} <span className="text-primary"> x {item.quantity}</span>
// //                                     </p>
// //                                 </div>
// //                             ))}
// //                         </div>

// //                         {/* Address */}
// //                         <div className="text-sm md:text-base text-black/60">
// //                             <p>{order.address.firstName} {order.address.lastName}</p>
// //                             <p>{order.address.street}, {order.address.city}</p>
// //                             <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
// //                         </div>

// //                         {/* Phone */}
// //                         <p className="text-sm md:text-base text-black/60">{order.address.phone}</p>

// //                         {/* Amount */}
// //                         <p className="font-medium text-lg my-auto">
// //                             {currency}{order.amount}
// //                         </p>

// //                         {/* Payment Info */}
// //                         <div className="flex flex-col text-sm md:text-base text-black/60">
// //                             <p>Method: {order.paymentType}</p>
// //                             <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
// //                             <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     )
// // }

// // export default Orders




// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const Orders = () => {
//     const { currency, axios } = useAppContext();
//     const [orders, setOrders] = useState([]);

//     const fetchOrders = async () => {
//         try {
//             const { data } = await axios.get('/api/order/seller');
//             if (data.success) {
//                 setOrders(data.orders);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     return (
//         <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
//             <div className="md:p-10 p-4 space-y-4">
//                 <h2 className="text-lg font-medium">Orders List</h2>

//                 {orders.map((order, index) => (
//                     <div
//                         key={index}
//                         className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
//                     >
//                         {/* Product Images and Titles - Column wise */}
//                         <div className="flex flex-col gap-3 max-w-80">
//                             {order.items.map((item, index) => (
//                                 <div key={index} className="flex items-center gap-3">
//                                     <img
//                                         className="w-12 h-12 object-cover border rounded"
//                                         // Check if image exists before rendering
//                                         src={item.product?.image?.[0] || 'default-image.jpg'} // Fallback to a default image if no image is found
//                                         alt={item.product?.name || 'Product Image'} // Fallback to 'Product Image' if no name exists
//                                     />
//                                     <p className="text-md font-medium">
//                                         {item.product?.name} <span className="text-primary"> x {item.quantity}</span>
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Address */}
//                         <div className="text-sm md:text-base text-black/60">
//                             <p>{order.address.firstName} {order.address.lastName}</p>
//                             <p>{order.address.street}, {order.address.city}</p>
//                             <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
//                         </div>

//                         {/* Phone */}
//                         <p className="text-sm md:text-base text-black/60">{order.address.phone}</p>

//                         {/* Amount */}
//                         <p className="font-medium text-lg my-auto">
//                             {currency}{order.amount}
//                         </p>

//                         {/* Payment Info */}
//                         <div className="flex flex-col text-sm md:text-base text-black/60">
//                             <p>Method: {order.paymentType}</p>
//                             <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                             <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Orders;


import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
          >
            {/* Product Images and Titles - Column wise */}
            <div className="flex flex-col gap-3 max-w-80">
              {order.paymentType === "Prescription" ? (
                <div className="flex flex-col gap-2">
                  <p className="text-md font-medium">
                    Prescription Upload <span className="text-primary"> x1</span>
                  </p>
                  {order.prescriptionUrl && (
                    <a
                      href={order.prescriptionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      View Prescription
                    </a>
                  )}
                </div>
              ) : (
                order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 object-cover border rounded"
                      src={item.product?.image?.[0] || 'default-image.jpg'}
                      alt={item.product?.name || 'Product Image'}
                    />
                    <p className="text-md font-medium">
                      {item.product?.name}{' '}
                      <span className="text-primary"> x {item.quantity}</span>
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Address */}
            <div className="text-sm md:text-base text-black/60">
              {order.paymentType === "Prescription" ? (
                <p className="italic text-gray-500">No address (Prescription upload)</p>
              ) : (
                <>
                  <p>{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}, {order.address.city}</p>
                  <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                </>
              )}
            </div>

            {/* Phone */}
            {order.address?.phone && (
              <p className="text-sm md:text-base text-black/60">{order.address.phone}</p>
            )}

            {/* Amount */}
            <p className="font-medium text-lg my-auto">
              {currency}{order.amount}
            </p>

            {/* Payment Info */}
            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
