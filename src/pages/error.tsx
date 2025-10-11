import { Navbar } from "@kinachan/shirayuri";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Error() {
  const router = useRouter();


  useEffect(() => {
    router.replace('/error');
  }, [router.isReady]);


  return (
    <div className="hero-body">
      <p className="title">エラーが発生しました。そのようなファイルは存在しません。</p>
      <p className="subtitle">メニューから選択してください</p>
      <Link href={'/'}>ホームへ</Link>
    </div>
  )
}