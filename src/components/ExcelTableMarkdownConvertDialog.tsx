import { Button, Dialog, DialogProps, Field, Radio, ResponsiveColumn, TextArea } from "@kinachan/shirayuri";
import { repeat } from "@kinachan/shirayuri/lib/array";
import { isNullOrEmpty } from "@kinachan/shirayuri/lib/string";
import { useState } from "react";




interface ExcelTableMarkdownConvertDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function ExcelTableMarkdownConvertDialog(props: ExcelTableMarkdownConvertDialogProps) {
  const {
    open,
    setOpen,
  } = props;

  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');

  const [type, setType] = useState<'toMarkdown' | 'toTable'>('toMarkdown');


  const convertToTable = (value: string) => {
    const rows = value.split('\n');
    const splitRows = rows.map(r => r.split('|'));

    const dataArray = splitRows.map(([unnse, ...second]) => {
      second.pop();
      return second;
    }).filter((x, i) => i !== 1);

    const [header, ...bodies] = dataArray;

    const rowString = bodies.map(b => b.join('\t'));

    setRightValue([
      header.join('\t'),
      rowString.join('\n')
    ].join('\n'));
  }


  const convertToMarkdown = (_value: string) => {
    const value = _value.replaceAll(/"([^"]*)"/g, (match, inner) => {
      return (inner as string).replace('"', '').replaceAll(/\n/g, '<br/>');
    });

    const rows = value.split('\n');
    const dataArray = rows.map(r => r.split('\t'));

    const [header, ...bodies] = dataArray;

    const headerMd = `| ${header.join(' | ')} |`;
    const borderMd = `| ${repeat(header.length).map(x => `----`).join(' | ')} |`

    const rowString = bodies.map(b => {
      return `| ${b.join(' | ')} |`
    });

    setRightValue([
      headerMd,
      borderMd,
      rowString.join('\n')
    ].join('\n'));
  }



  return (
    <Dialog
      title="Excel ⇔ Markdown相互変換"
      isOpenDialog={open}
      size="full-width"
      cancel={{
        label: 'Cancel',
        onClick: () => {
          setOpen(false);
        }
      }}
    >
      <>
        <Field
          label="変換タイプ"
          component={(
            <Radio
              items={[{
                label: 'Markdown',
                value: 'toMarkdown',
              }, {
                label: 'Excel',
                value: 'toTable',
              }]}
              name="type"
              onChange={(e) => {
                const newType = e.target.value as 'toMarkdown' | 'toTable';
                setType(newType);
              }}
              radioButtonColor="is-primary"
            />
          )}
          helpText={type}
        />


        <ResponsiveColumn isParent>
          <ResponsiveColumn size={6}>

            <Field
              label={type === 'toMarkdown' ? 'Excelの値' : 'Markdownテーブル'}
              component={(
                <TextArea
                  value={leftValue}
                  onChange={(e) => {
                    setLeftValue(e.target.value);
                    if (type === 'toMarkdown') {
                      convertToMarkdown(e.target.value);
                    } else {
                      convertToTable(e.target.value);
                    }
                  }}
                  enabledTabToSpace
                  tabToSpaceCallback={(text) => {
                    setLeftValue(text);
                    if (type === 'toMarkdown') {
                      convertToMarkdown(text);
                    } else {
                      convertToTable(text);
                    }
                  }}
                  autoResize
                />
              )}
            />
          </ResponsiveColumn>
          <ResponsiveColumn size={6}>
            <Field
              label={type === 'toMarkdown' ? 'Markdownテーブル': 'Excelの値'}
              component={(
                <TextArea
                  enabledTabToSpace
                  value={rightValue}
                  readOnly
                  disabled={isNullOrEmpty(rightValue)}
                  onClick={(e) => {
                    if (isNullOrEmpty(rightValue)) return;

                    navigator.clipboard.writeText(rightValue).then(v => {
                      alert('コピーしました');
                    })
                  }}
                  autoResize
                />
              )}
            />
          </ResponsiveColumn>
        </ResponsiveColumn>
      </>
    </Dialog>
  )
}