import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Login from './pages/Login';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';


const token = localStorage.getItem('token');

// Placeholder components for routes
const Dashboard = () => <h1 className="text-2xl font-bold">Dashboard</h1>;
const Roles = () => <h1 className="text-2xl font-bold">Roles</h1>;
const Products = () => <h1 className="text-2xl font-bold">Products</h1>;
const AddProduct = () => <h1 className="text-2xl font-bold">Add Product</h1>;
const Categories = () => <h1 className="text-2xl font-bold">Categories</h1>;
const Analytics = () => <h1 className="text-2xl font-bold">Analytics</h1>;
const Settings = () => <h1 className="text-2xl font-bold">Settings</h1>;


function App() {
  return (
    <Provider store={store}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/login" element={token ? <Layout><Dashboard /></Layout> : <Login />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/add" element={<AddUser />} />
                    <Route path="/users/edit/:id" element={<EditUser />} />
                    <Route path="/users/roles" element={<Roles />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/add" element={<AddProduct />} />
                    <Route path="/products/categories" element={<Categories />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Dashboard />} />
                  </Routes>
                </Layout>
              </RequireAuth>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;