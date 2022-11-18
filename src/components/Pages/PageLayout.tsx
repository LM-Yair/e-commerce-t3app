import {Footer} from "./Footer";
import {Header} from "./Header";

type PageLayoutType = {
  children: JSX.Element | JSX.Element[];
}

export const PageLayout = ({children}: PageLayoutType) =>{
  return(
    <div className="background_desing min-h-screen bg-neutral-100 flex flex-col">
      <Header />
      <div className="grow">
	{children}
      </div>
      <Footer />
    </div>
  );
}
