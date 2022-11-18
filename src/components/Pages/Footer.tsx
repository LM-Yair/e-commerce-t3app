import {LinkText} from "components/Links/LinkText";

export const Footer = () => {
  return(
    <footer className='p-4 h-14 text-neutral-200 bg-neutral-800 flex items-center gap-2'>
      <p>
	Práctica realizada por Yair L.
      </p>
      <LinkText type="tag_a" target="_blank" href="https://github.com/LM-Yair" text="GitHub"/>
    </footer>
  );
}
