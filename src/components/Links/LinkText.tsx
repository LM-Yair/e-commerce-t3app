import Link from "next/link";

type LinkTextType = {
  href: string;
  text: string;
  type?: 'NextLink' | 'tag_a';
  target?: '_self' | '_blank';
}

export const LinkText = ({ type = 'NextLink',href,text = '_self',target}: LinkTextType) => {
  const defaultClass = 'text-inherit hover:text-cyan-500';
  if(type === 'NextLink') return(
    <Link className={defaultClass} target={target} href={href}>{text}</Link>
  );
  return(
    <a className={defaultClass} href={href} target={target}>{text}</a>
  );
}
