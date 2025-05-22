/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { ProductTable } from './components/ProductTable';
import { UserFilter } from './components/UserFilter';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { CategoryFilter } from './components/CategoryFilter/CategoryFilter';

const getUser = id => usersFromServer.find(user => user.id === id);
const getCategory = id =>
  categoriesFromServer.find(category => category.id === id);

const fullProducts = productsFromServer.map(product => {
  const category = getCategory(product.categoryId);
  const user = getUser(category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

function filterProducts(products, userId, query) {
  let visibleProducts = products;

  if (query) {
    visibleProducts = visibleProducts.filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase().trim());
    });
  }

  if (userId) {
    visibleProducts = visibleProducts.filter(
      product => product.user?.id === userId,
    );
  }

  return visibleProducts;
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [query, setQuery] = useState('');

  const filteredProducts = filterProducts(fullProducts, selectedUserId, query);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>
        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>
            <UserFilter
              selectedUserId={selectedUserId}
              onSelect={setSelectedUserId}
            />
            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />
                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>
            <CategoryFilter products={fullProducts} />
            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>
        {filteredProducts.length === 0 ? (
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
        ) : (
          <ProductTable products={filteredProducts} />
        )}
      </div>
    </div>
  );
};
