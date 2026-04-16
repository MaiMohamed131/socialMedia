// import logo from './logo.svg';
// import './App.css';
// import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Layout from './components/Layout';
// import Home from './components/pages/Home';



// function App() {
//   return (
//    <BrowserRouter>
//    <Layout>
//    <Routes>
//       <Route path='/' element={<Home/>}/>
//    </Routes>
//    </Layout>
//    </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Layout from './components/Layout';
// import Home from './components/pages/Home';
// import Login from './components/pages/Login';
// import Register from './components/pages/Register';
// import './App.css';

// // Protects routes that require a logged-in user
// function PrivateRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" replace />;
// }

// // Redirects logged-in users away from login/register
// function GuestRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? <Navigate to="/" replace /> : children;
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Guest-only routes (no Layout) */}
//         <Route path="/login" element={
//           <GuestRoute><Login /></GuestRoute>
//         } />
//         <Route path="/register" element={
//           <GuestRoute><Register /></GuestRoute>
//         } />

//         {/* Protected routes (with Layout) */}
//         <Route path="/" element={
//           <PrivateRoute>
//             <Layout>
//               <Home />
//             </Layout>
//           </PrivateRoute>
//         } />

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { UserProvider, useUser } from './components/UserContext';
// import Layout from './components/Layout';
// import Home from './components/pages/Home';
// import Login from './components/pages/Login';
// import Register from './components/pages/Register';
// import Profile from './components/pages/Profile';
// import './App.css';

// function PrivateRoute({ children }) {
//   const { token, loading } = useUser();
//   if (loading) return null; // wait for localStorage hydration
//   return token ? children : <Navigate to="/login" replace />;
// }

// function GuestRoute({ children }) {
//   const { token, loading } = useUser();
//   if (loading) return null;
//   return token ? <Navigate to="/" replace /> : children;
// }

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
//       <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
//       <Route path="/" element={
//         <PrivateRoute>
//           <Layout><Home /></Layout>
//         </PrivateRoute>
//       } />
//       <Route path="/profile" element={
//         <PrivateRoute>
//           <Layout><Profile /></Layout>
//         </PrivateRoute>
//       } />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <UserProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </UserProvider>
//   );
// }

// export default App;

// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { UserProvider, useUser } from './components/UserContext';
// import Layout from './components/Layout';
// import Home from './components/pages/Home';
// import Login from './components/pages/Login';
// import Register from './components/pages/Register';
// import Profile from './components/pages/Profile';
// import UserProfile from './components/pages/UserProfile';
// import './App.css';

// function PrivateRoute({ children }) {
//   const { token, loading } = useUser();
//   if (loading) return null;
//   return token ? children : <Navigate to="/login" replace />;
// }

// function GuestRoute({ children }) {
//   const { token, loading } = useUser();
//   if (loading) return null;
//   return token ? <Navigate to="/" replace /> : children;
// }

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
//       <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

//       <Route path="/" element={
//         <PrivateRoute><Layout><Home /></Layout></PrivateRoute>
//       } />
//       <Route path="/profile" element={
//         <PrivateRoute><Layout><Profile /></Layout></PrivateRoute>
//       } />
//       <Route path="/users/:id" element={
//         <PrivateRoute><Layout><UserProfile /></Layout></PrivateRoute>
//       } />

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <UserProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </UserProvider>
//   );
// }

// export default App;


// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { UserProvider, useUser } from './components/UserContext';
// import Layout from './components/Layout';
// import Home from './components/pages/Home';
// import Login from './components/pages/Login';
// import Register from './components/pages/Register';
// import Profile from './components/pages/Profile';
// import UserProfile from './components/pages/UserProfile';
// import Notifications from './components/pages/Notifications';
// import './App.css';

// function PrivateRoute({ children }) {
//   const { token, loading } = useUser();
//   if (loading) return null;
//   return token ? children : <Navigate to="/login" replace />;
// }

// function GuestRoute({ children }) {
//   const { token, loading } = useUser();
//   if (loading) return null;
//   return token ? <Navigate to="/" replace /> : children;
// }

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
//       <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

//       <Route path="/" element={
//         <PrivateRoute><Layout><Home /></Layout></PrivateRoute>
//       } />
//       <Route path="/profile" element={
//         <PrivateRoute><Layout><Profile /></Layout></PrivateRoute>
//       } />
//       <Route path="/users/:id" element={
//         <PrivateRoute><Layout><UserProfile /></Layout></PrivateRoute>
//       } />
//       <Route path="/notifications" element={
//         <PrivateRoute><Layout><Notifications /></Layout></PrivateRoute>
//       } />

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <UserProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </UserProvider>
//   );
// }

// export default App;



import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider, useUser } from './components/UserContext';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import UserProfile from './components/pages/UserProfile';
import Notifications from './components/pages/Notifications';
import Messages from './components/pages/Messages';
import './App.css';

function PrivateRoute({ children }) {
  const { token, loading } = useUser();
  if (loading) return null;
  return token ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { token, loading } = useUser();
  if (loading) return null;
  return token ? <Navigate to="/" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login"    element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

      <Route path="/" element={
        <PrivateRoute><Layout><Home /></Layout></PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute><Layout><Profile /></Layout></PrivateRoute>
      } />
      <Route path="/users/:id" element={
        <PrivateRoute><Layout><UserProfile /></Layout></PrivateRoute>
      } />
      <Route path="/notifications" element={
        <PrivateRoute><Layout><Notifications /></Layout></PrivateRoute>
      } />
      <Route path="/messages" element={
        <PrivateRoute><Layout><Messages /></Layout></PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;





