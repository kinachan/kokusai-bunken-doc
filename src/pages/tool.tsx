import ExcelTableMarkdownConvertDialog from "@/components/ExcelTableMarkdownConvertDialog";
import { Button } from "@kinachan/shirayuri";
import { useState } from "react"



export default function Tool() {

  const [openExcelMarkdownTable, setOpenExcelMarkdownTable] = useState(false);

  return (
    <div className="hero-body">
      <p className="title">ツール一覧</p>
      <section className="block">
        <h3 className="is-size-4 mt-4"></h3>
        
        <Button
          label="Excelコンバート"
          onClick={() => {
            setOpenExcelMarkdownTable(true);
          }}
        />

        <ExcelTableMarkdownConvertDialog
          open={openExcelMarkdownTable}
          setOpen={setOpenExcelMarkdownTable}
        />
      </section>
    </div>
  )
  
}