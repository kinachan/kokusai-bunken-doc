import { getFileName } from "@/lib/fileUtil";


export default function Home({ fileNames }: { fileNames: string[] }) {
  return (
    <div className="hero-body">
      <p className="title">{process.env.NEXT_PUBLIC_PROJECT_NAME}ドキュメント</p>
      <p className="subtitle">こちらにドキュメントが表示されます、メニューから選択してください</p>

      <section className="block">
        <h3 className="is-size-4 mt-4">ドキュメント一覧</h3>
        <ul>
          {
            fileNames.map(f => (
              <li>
                <a href={`./${f}`}>{f}</a>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  )
}


export const getServerSideProps = async () => {
  const fileNames = getFileName();
  return {
    props: {
      fileNames,
    },
  }
};