// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import { Toaster } from 'react-hot-toast'
// import Footer from './components/Footer'
// import { useAppContext } from './context/AppContext'
// import Login from './components/Login'
// import AllProducts from './pages/AllProducts'
// import ProductCategory from './pages/ProductCategory'
// import ProductDetails from './pages/ProductDetails'
// import Cart from './pages/Cart'
// import AddAddress from './pages/AddAddress'
// import MyOders from './pages/MyOders'
// import SellerLogin from './components/seller/SellerLogin'
// import SellerLayout from './pages/seller/SellerLayout'
// import AddProduct from './pages/seller/AddProduct'
// import ProductList from './pages/seller/ProductList'
// import Orders from './pages/seller/Orders'
// import FeatureHub from './pages/FeatureHub'
// import 'leaflet/dist/leaflet.css';
// import Loading from './components/loading'
// import ContactUs from './components/ContactUs'
// import MyAppointments from './pages/MyAppointments'
// import MyProfile from './pages/MyProfile'
// import AllDoctors from './pages/AllDoctors'
// import DoctorDetails from './pages/DoctorDetails'
// import DoctorList from './pages/seller/DoctorList'
// import AddDoctor from './pages/seller/AddDoctor'
// import Appointments from './pages/seller/Appointments'
// import ChatWidget from './components/ChatWidget'


// const App = () => {

//   const isSellerPath = useLocation().pathname.includes("seller");
//   const {showUserLogin, isSeller} = useAppContext();

//   return (
//     <div className='text-default min-h-screen text-gray-700 bg-white'>

//       {isSellerPath ? null : <Navbar />}
//       {showUserLogin ? <Login/> : null}

//       <Toaster/>

//       <div className={`${isSellerPath ? "" : " px-6 md:px-16 lg:px-24 xl:px-32"}`}>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/products' element={<AllProducts/>} />
//           <Route path='/doctors' element={<AllDoctors/>} />
//           <Route path='/contact-us' element={<ContactUs/>} />
//           <Route path='/products/:category' element={<ProductCategory/>} />
//           <Route path='/products/:category/:id' element={<ProductDetails/>} />
//           <Route path='/doctors/:id' element={<DoctorDetails/>} />

//           <Route path="/services" element={<FeatureHub />} />
//           <Route path='/cart' element={<Cart/>} />
//           <Route path='/add-address' element={<AddAddress/>} />
//           <Route path='/my-orders' element={<MyOders/>} />
//           <Route path='/my-profile' element={<MyProfile/>} />
//           <Route path='/my-appointments' element={<MyAppointments/>} />
//           <Route path='/loader' element={<Loading/>} />

//           <Route path='/seller' element={isSeller ? <SellerLayout/> :<SellerLogin/>}>
//           <Route index  element={ isSeller ? <AddProduct/> : null}/>
//           <Route path='product-list'  element={ <ProductList/>}/>
//           <Route path='add-doctor'  element={ <AddDoctor/>}/>
//           <Route path='doctor-list'  element={ <DoctorList/>}/>
//           <Route path='orders'  element={ <Orders/>}/>
//           <Route path='appointments'  element={ <Appointments/>}/>
//           </Route>
//         </Routes>
//       </div>
//       {!isSellerPath && <Footer/>}
//       <ChatWidget />
//     </div>
//   )
// }

// export default App


import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOders from './pages/MyOders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import FeatureHub from './pages/FeatureHub'
import 'leaflet/dist/leaflet.css';
import Loading from './components/loading'
import ContactUs from './components/ContactUs'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import AllDoctors from './pages/AllDoctors'
import DoctorDetails from './pages/DoctorDetails'
import DoctorList from './pages/seller/DoctorList'
import AddDoctor from './pages/seller/AddDoctor'
import Appointments from './pages/seller/Appointments'
import ChatWidget from './components/ChatWidget'

// NEW Doctor imports
import DoctorLogin from './components/doctor/DoctorLogin'
import DoctorLayout from './pages/doctor/DoctorLayout'
import DoctorProfile from './pages/doctor/DoctorProfile'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import DoctorEarnings from './pages/doctor/DoctorEarnings'
import MedicalTestBookDetails from './pages/MedicalTestDetails'
import TestBookDetail from './pages/TestBookDetail'
import TestsList from './pages/TestList'
import MyTestBooks from './pages/MyTestBooks'
import SellerTests from './pages/seller/SellerTests'
import TawkToChat from './components/TawkToChat'

const App = () => {

  const pathname = useLocation().pathname;
  const isSellerPath = pathname.startsWith("/seller");
  const isDoctorPath = pathname === "/doctor" || pathname.startsWith("/doctor/"); // ✅ differentiate from "/doctors"
  const { showUserLogin, isSeller, isDoctor } = useAppContext();

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {isSellerPath || isDoctorPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div className={`${isSellerPath || isDoctorPath ? "" : " px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          {/* Public / User */}
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/doctors' element={<AllDoctors />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/doctors/:id' element={<DoctorDetails />} />
          <Route path='/tests' element={<TestsList/>} />
          <Route path='/tests/:id' element={<TestBookDetail/>} />
        

          <Route path="/services" element={<FeatureHub />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOders />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-test-booking' element={<MyTestBooks />} />
          <Route path='/loader' element={<Loading />} />

          {/* Seller Dashboard */}
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='add-doctor' element={<AddDoctor />} />
            <Route path='doctor-list' element={<DoctorList />} />
            <Route path='orders' element={<Orders />} />
            <Route path='appointments' element={<Appointments />} />
            <Route path='tests' element={<SellerTests />} />
          </Route>

          {/* Doctor Dashboard */}
          <Route path='/doctor' element={isDoctor ? <DoctorLayout /> : <DoctorLogin />}>
            <Route index element={<DoctorProfile />} />
            <Route path='profile' element={<DoctorProfile />} />
            <Route path='appointments' element={<DoctorAppointments />} />
            <Route path='earnings' element={<DoctorEarnings />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && !isDoctorPath && <Footer />}
      {/* <ChatWidget /> */}
      <TawkToChat/>
    </div>
  )
}

export default App
