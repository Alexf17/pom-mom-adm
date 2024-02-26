import {
  AddToCartButton,
  Images,
  List,
  ListItem,
  ListWrapper,
} from '@/Style/Purchases.styled';
import { Context } from '@/components/Context/CartContext';
import { useContext } from 'react';
import profilePic from '../../../public/images/no_img.jpg';

export default function Purchases({ products }) {
  const { addProduct } = useContext(Context);
  return (
    <List>
      {products?.map(product => (
        <ListItem key={product._id}>
          <ListWrapper href={'/purchases/product/' + product._id}>
            <p>{product.name}</p>
            {/* <p>{product?.category?.name}</p> */}

            <Images
              src={product.image[0] || profilePic}
              alt={product.name}
              width={150}
              height={150}
              priority
            />
            <p>{product.price} грн.</p>
          </ListWrapper>
          <AddToCartButton
            onClick={() => {
              addProduct(product._id);
            }}
          >
            Add to Cart
          </AddToCartButton>
        </ListItem>
      ))}
    </List>
  );
}
