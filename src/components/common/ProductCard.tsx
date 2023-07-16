import { IBook } from "../../types/globalTypes";

interface ProductCardProps {
  book: IBook;
}

const ProductCard = ({ book }: ProductCardProps) => {
  const { _id, imgUrl, genre, title, author, publicationDate } = book;

  return (
    <div key={_id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <a className="block relative lg:h-86 xl:h-96 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover w-full h-full block"
          src={imgUrl}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {genre}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title}
        </h2>
        <p className="mt-1">{author}</p>
        <p className="mt-1 font-semibold">{publicationDate}</p>
      </div>
    </div>
  );
};

export default ProductCard;
