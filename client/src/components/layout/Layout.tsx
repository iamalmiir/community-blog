import Navbar from '../navbar/Navbar';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout = ({ title, keywords, description, children }: Props) => {
  return (
    <Fragment>
      <Helmet>
        <title>DevSpace | {title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
      </Helmet>
      <Navbar />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
