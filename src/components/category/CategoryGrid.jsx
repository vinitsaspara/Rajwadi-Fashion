import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;