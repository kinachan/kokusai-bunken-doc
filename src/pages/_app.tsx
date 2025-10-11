import type { AppProps } from "next/app";
import '@kinachan/shirayuri/style.css';
import { LinkItem, Navbar, NavbarItem, NavElement } from "@kinachan/shirayuri";
import '@/styles/index.scss';
import Error from "./error";
import Head from "next/head";
import { genericSort } from "@kinachan/shirayuri/lib/array";

export interface PageProps {
  fileNames: string[];
  isError?: boolean,
  title?: string,
  content?: string,
}


const App = ({ Component, pageProps: _PageProps }: AppProps) => {
  const {
    fileNames,
    isError,
    title,
  } = _PageProps as PageProps;

  const titleTag = `${process.env.NEXT_PUBLIC_PROJECT_NAME} | ${title || 'Home'}` ;


  const topNavi = (process.env.NEXT_PUBLIC_TOP_NAVI || '').split(',');
  const moreNavi = (fileNames ?? []).filter(x => topNavi.some(t => t !== x));

  const topNaviGroups = topNavi.map(navName => (fileNames ?? []).filter(name => name.indexOf(navName) === 0));


  const navbarStart: (NavbarItem | LinkItem | NavElement)[] = [
    ...topNaviGroups.map<LinkItem | NavbarItem>(group => {
      if (group.length === 0) {
        return {
          show: false,
          label: '',
          pathname: '',
          title: '',
          type: 'LinkItem',
        }
      }


      if (group.length === 1) {
        return {
          show: true,
          type: 'LinkItem',
          label: group[0],
          pathname: group[0],
        }
      }

      const [groupName, NOUSE] = group[0].split('-');

      return {
        type: 'NavbarItem',
        isHoverable: true,
        title: groupName,
        dropdowns: group.sort(genericSort(item => item)).map(g => ({
          show: true,
          type: 'LinkItem',
          label: g,
          pathname: g,
        }))
      }
    }), {
      type: 'NavbarItem',
      isHoverable: true,
      title: 'ドキュメント一覧',
      dropdowns: moreNavi.map(x => ({
        show: true,
        type: 'LinkItem',
        label: x,
        pathname: x,
      }))
    }
  ];

  return (
    <>
      <Head>
        <title>{titleTag}</title>
      </Head>
      <Navbar
        pageTitle="Home"
        navbarStart={navbarStart}
        navbarEnd={[{
          pathname: './tool',
          type: 'LinkItem',
          label: 'ツール一覧',
          show: true,
        }]}
      />
      <div className="container">
        <section className="section">
          <div className="hero">
            {
              !isError ? (
                <Component {..._PageProps}/>
              ) : <Error />
            }
          </div>
        </section>
      </div>
    </>
  );
}

export default App;