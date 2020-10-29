import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
import ItemList from "./pages/ItemList/ItemList";
import Cart from "./pages/Cart/Cart";
import Reviews from './pages/Reviews/Reviews';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/item-detail" component={ItemDetail} />
          <Route exact path="/item-detail/:productId" component={ItemDetail} />
          <Route exact path="/item-list" component={ItemList} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/reviews" component={Reviews} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
