import { getFileName } from "@/lib/fileUtil";
import { Input, Entry  } from "@kinachan/shirayuri";
import { isNullOrEmpty } from "@kinachan/shirayuri/lib/string";
import { useState } from "react";


export default function Home({ fileNames }: { fileNames: string[] }) {

  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSeachResult] = useState<{id: string; title: string; content: string}[]>([]);

  return (
    <div className="hero-body">
      <p className="title">{process.env.NEXT_PUBLIC_PROJECT_NAME}ドキュメント</p>
      <p className="subtitle">こちらにドキュメントが表示されます、メニューから選択してください</p>

      <Input
        value={searchInput}
        onChange={(e) => {
          if (isNullOrEmpty(e.target.value)) {
            setSeachResult([]);
          }
          setSearchInput(e.target.value);
        }}
        placeholder="検索キーワード：Enterを押下すると検索を実行します。"
        onKeyDown={async (e) => {
          if (e.code === 'Enter' && !e.nativeEvent.isComposing) {
            const res = await fetch(`/api/search?q=${searchInput}`);
            const data = await res.json();

            setSeachResult(data);
          }
        }}
      />

      {
        searchResult.length === 0 ? null : (
          <section className="block">
            {
              searchResult.map(x => (
                <div key={`search-result-${x.id}`}>
                  <Entry
                    title={x.title}
                    href={{
                      pathname: `./${x.title}`
                    }}
                    helps={[
                      x.content.substring(0, 50)
                    ]}
                  />
                </div>
              ))
            }
          </section>
        )
      }

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