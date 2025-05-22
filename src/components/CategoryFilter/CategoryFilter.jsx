export const CategoryFilter = ({ products }) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className="button is-success mr-6 is-outlined"
      >
        All
      </a>

      {products.map(product => (
        <a data-cy="Category" className="button mr-2 my-1 is-info" href="#/">
          {product.category.title}
        </a>
      ))}
    </div>
  );
};
