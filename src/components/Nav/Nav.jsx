import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import {
  TbHome,
  TbCategory2,
  TbTruckDelivery,
  TbBrandProducthunt,
} from 'react-icons/tb';

import { SiBrandfolder } from 'react-icons/si';

import { LogoLink, NavLink, Navigation, LogoutLink, Wrap } from './Nav.styled';
import { Context } from '../Context/CartContext.js';
import { useContext } from 'react';
import Image from 'next/image';
import Button from '../ui/Button/Button';

export default function Nav({ userName }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { cartProducts } = useContext(Context);

  return (
    <Wrap>
      <aside>
        <Navigation>
          <LogoLink href="/">
            <Image src="/logo.svg" alt="logo" width={152} height={57} />
            <span>Admin {userName}</span>
          </LogoLink>

          <NavLink href={'/'} active={currentRoute === '/'}>
            <TbHome color={currentRoute === '/' ? '#111C1E' : '#3D3D3D'} />
            Home
          </NavLink>

          <NavLink href={'/products'} active={currentRoute === '/products'}>
            <TbBrandProducthunt
              color={currentRoute === '/products' ? '#111C1E' : '#3D3D3D'}
            />
            Products
          </NavLink>
          <NavLink href={'/category'} active={currentRoute === '/category'}>
            <TbCategory2
              color={currentRoute === '/category' ? '#111C1E' : '#3D3D3D'}
            />
            Category
          </NavLink>

          <NavLink
            href={'/brands'}
            active={currentRoute === '/brands'}
            brand="true"
          >
            <SiBrandfolder
              color={currentRoute === '/brands' ? '#111C1E' : '#3D3D3D'}
            />
            Brands
          </NavLink>

          <NavLink href={'/allOrders'} active={currentRoute === '/allOrders'}>
            <TbTruckDelivery
              color={currentRoute === '/allOrders' ? '#111C1E' : '#3D3D3D'}
            />
            All Orders
          </NavLink>
        </Navigation>

        {/* <Navigation>
          <p>Client part</p>
          <NavLink
            href={'/clientBrands'}
            style={
              currentRoute === '/clientBrands'
                ? { color: '#c18989' }
                : { color: 'black' }
            }
          >
            Brand
          </NavLink>
          <NavLink
            href={'/purchases'}
            style={
              currentRoute === '/purchases'
                ? { color: '#c18989' }
                : { color: 'black' }
            }
          >
            Catalog
          </NavLink>
          <NavLink
            href={'/cart'}
            style={
              currentRoute === '/cart'
                ? { color: '#c18989' }
                : { color: 'black' }
            }
          >
            Cart ({cartProducts.length})
          </NavLink>
          <NavLink
            href={'/orders'}
            style={
              currentRoute === '/orders'
                ? { color: '#c18989' }
                : { color: 'black' }
            }
          >
            Orders
          </NavLink>
        </Navigation> */}

        <Button href={'/'} onClick={signOut} bgColor={p => p.theme.whiteBg}>
          Logout
        </Button>
      </aside>
    </Wrap>
  );
}
