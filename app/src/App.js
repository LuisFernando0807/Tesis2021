import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Inventario from './pages/Inventario';
import ServiceDesk from './pages/ServiceDesk';
import FileServer from './pages/FileServer';
import NotFound from './pages/NotFound';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/gestion-inventario" component={Inventario} />
          <Route exact path="/service-desk" component={ServiceDesk} />
          <Route exact path="/gestion-file-server" component={FileServer} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
