import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {

    const { axios, navigate } = useAppContext();



    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
        { name: "Add Doctor", path: "/seller/add-doctor", icon: assets.add_doctors },
        { name: "Doctor List", path: "/seller/doctor-list", icon: assets.doctors },
        { name: "Appointments", path: "/seller/appointments", icon: assets.booking },
        { name: "Tests", path: "/seller/tests", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout')
            if (data.success) {
                toast.success(data.message)
                navigate('/')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to={'/'}>
                    <img src={assets.logo} alt="Logo" className="cursor-pointer w-48 md:w-60" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className="flex ">
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === "/seller"}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-3 px-4 py-3 w-full", // 🔹 full width button
                                    "transition-colors duration-200",          // smooth hover/active
                                    "hover:bg-gray-100/90",
                                    isActive
                                        ? "border-r-4 md:border-r-[6px] border-primary bg-indigo-500/10 text-primary"
                                        : "border-r-4 md:border-r-[6px] border-transparent text-gray-700"
                                ].join(" ")
                            }
                        >
                            <img src={item.icon} alt="" className="w-6 h-6 flex-shrink-0" />
                            <p className="md:block hidden font-medium truncate">{item.name}</p>
                        </NavLink>

                    ))}
                </div>
                <Outlet />
            </div>

        </>
    );
};


export default SellerLayout