import { getFileContent, getFileName } from "@/lib/fileUtil";
import { toHtml } from "@/lib/markdownUtil";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { PageProps } from "./_app";


const DynamicContent = dynamic(() => import('../components/Content'));

export default function Content({ content }: Partial<PageProps>) {
  return <DynamicContent content={content}/>
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const query = decodeURI(context.query.slug as string);
  const fileNames = getFileName();

  if (query.match(/.md/)) {
    return {
      props: {
        fileNames,
        isError: true,
        title: query,
        content: null,
      }
    }
  }
  const markdownFile = getFileContent(query);
  if (markdownFile == null) {
    return {
      props: {
        fileNames,
        isError: true,
        title: query,
      }
    }
  }
  const content = await toHtml(markdownFile);
  return {
    props: {
      fileNames,
      isError: false,
      title: query,
      content: content,
    },
  }
};