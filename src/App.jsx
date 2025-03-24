import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Loader from './components/Loader';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Login from './pages/auth/Login';
import { menuItems } from './config/menu';
import Dashboard from './pages/dashboard/Dashboard';

const token = localStorage.getItem('token');

// Map component names to actual components
const componentMap = {
  Users,
  AddUser,
};

// Helper function to generate routes from menu items
const generateRoutes = (items) => {
  return items.flatMap(item => {
    if (item.submenu) {
      return generateRoutes(item.submenu);
    }

    const Element = typeof item.element === 'string'
      ? componentMap[item.element]
      : item.element;

    return {
      path: item.path,
      element: <Element />
    };
  });
};

function AppContent() {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <>
      {isLoading && <Loader fullScreen />}
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/login" element={token ? <Layout><Dashboard /></Layout> : <Login />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <Layout>
                  <Routes>
                    {generateRoutes(menuItems).map(({ path, element }) => (
                      <Route key={path} path={path} element={element} />
                    ))}
                    <Route path="/users/edit/:id" element={<EditUser />} />
                    <Route path="*" element={generateRoutes(menuItems)[0].element} />
                  </Routes>
                </Layout>
              </RequireAuth>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
