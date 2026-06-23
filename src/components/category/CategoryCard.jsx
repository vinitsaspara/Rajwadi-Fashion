import Link from "next/link";
import Image from "next/image";

const CategoryCard = ({ category }) => {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        bg-gray-100
        h-56
      "
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="
    object-cover
    group-hover:scale-105
    transition
    duration-500
  "
      />

      <div
        className="
          absolute
          inset-0
          bg-black/30
          flex
          items-center
          justify-center
        "
      >
        <h3
          className="
            text-white
            text-2xl
            font-bold
          "
        >
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
