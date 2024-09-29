import { useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Transforms, Text } from "slate";
import { Slate, Editable } from "slate-react";
import { Button } from "@mui/material";

export const TextEditor = () => {
	const editor = useMemo(() => createEditor(), []);
	const [value, setValue] = useState<Descendant[]>([{ text: "paragraph", children: [{ text: "Start editing..." }] }]);

	const toggleBoldMark = () => {
		const isActive = isMarkActive("bold");
		Transforms.setNodes(editor, { bold: isActive ? null : true }, { match: Text.isText, split: true });
	};

	const isMarkActive = (mark: string) => {
		const marks = Editor.marks(editor);
		return marks ? marks[mark] === true : false;
	};

	const renderElement = (props: any) => {
		switch (props.element.type) {
			case "paragraph":
				return <p {...props.attributes}>{props.children}</p>;
			case "table":
				return (
					<table {...props.attributes}>
						<tbody>{props.children}</tbody>
					</table>
				);
			default:
				return <div {...props.attributes}>{props.children}</div>;
		}
	};

	const renderLeaf = (props: any) => {
		if (props.leaf.bold) {
			return <strong {...props.attributes}>{props.children}</strong>;
		}
		return <span {...props.attributes}>{props.children}</span>;
	};

	const insertTable = () => {
		const rows = 3;
		const cols = 3;

		const table = {
			type: "table",
			children: Array.from({ length: rows }, () => ({
				type: "table-row",
				children: Array.from({ length: cols }, () => ({
					type: "table-cell",
					children: [{ text: "" }],
				})),
			})),
		};

		Transforms.insertNodes(editor, table);
	};

	return (
		<div>
			<Button
				onMouseDown={(event) => {
					event.preventDefault();
					toggleBoldMark();
				}}
			>
				Bold
			</Button>
			<Button
				onMouseDown={(event) => {
					event.preventDefault();
					insertTable();
				}}
			>
				Insert Table
			</Button>

			<Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
				<Editable renderElement={renderElement} renderLeaf={renderLeaf} placeholder="Type something..." />
			</Slate>
		</div>
	);
};
