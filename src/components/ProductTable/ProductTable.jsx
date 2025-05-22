import classNames from 'classnames';

const getUserClass = sex => (sex === 'm' ? 'has-text-link' : 'has-text-danger');

export const ProductTable = ({ products }) => (
  <div className="box table-container">
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <tr data-cy="Product" key={product.id}>
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>
            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">
              {product.category
                ? `${product.category.icon} - ${product.category.title}`
                : 'Unknown'}
            </td>
            <td
              data-cy="ProductUser"
              className={classNames(getUserClass(product.user?.sex))}
            >
              {product.user ? product.user.name : 'Unknown'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
