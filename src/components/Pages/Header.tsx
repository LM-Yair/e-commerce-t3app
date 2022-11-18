import {LinkText} from "components/Links/LinkText";

export const Header = () => {
  return(
    <header className='p-2 text-neutral-200 sticky top-0 z-20'>
      <div className='p-4 flex flex justify-between rounded-lg bg-neutral-800'>
	<div>
	  <h1 className='text-lg font-bold'>E-Commerce</h1>
	</div>
	<nav className="h-full text-lg font-bold flex justify-center items-center gap-2">
	  <LinkText href='/' text="Inicio"/>
	  <LinkText href='/crear' text="Crear"/>
	  <LinkText href='/carrito' text="Carrito"/>
	</nav>
      </div>
    </header>
  );
}
