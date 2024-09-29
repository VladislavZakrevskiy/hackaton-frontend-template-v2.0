import React, { useRef } from "react";
import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import { Save, Undo, Redo, Clear } from "@mui/icons-material";
import CanvasDraw from "react-canvas-draw";

export const DrawingBoard: React.FC = () => {
	const canvasRef = useRef<CanvasDraw>(null);

	const saveCanvasAsImage = () => {
		canvasRef.current?.getSaveData();
		if (canvasRef.current) {
			// @ts-ignore
			const dataUrl = canvasRef.current.getDataURL("png");
			const link = document.createElement("a");
			link.href = dataUrl;
			link.download = "drawing.png";
			link.click();
		}
	};

	const clearCanvas = () => {
		canvasRef.current?.clear();
	};

	const undoCanvas = () => {
		canvasRef.current?.undo();
	};

	return (
		<Box>
			<Toolbar sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
				<Tooltip title="Undo">
					<IconButton onClick={undoCanvas}>
						<Undo />
					</IconButton>
				</Tooltip>
				<Tooltip title="Redo">
					<IconButton onClick={undoCanvas}>
						<Redo />
					</IconButton>
				</Tooltip>
				<Tooltip title="Clear">
					<IconButton onClick={clearCanvas}>
						<Clear />
					</IconButton>
				</Tooltip>
				<Tooltip title="Save as PNG">
					<IconButton onClick={saveCanvasAsImage}>
						<Save />
					</IconButton>
				</Tooltip>
			</Toolbar>

			<Box sx={{ border: "1px solid #ccc", width: "600px", height: "400px" }}>
				<CanvasDraw ref={canvasRef} canvasWidth={600} canvasHeight={400} brushColor="#000" brushRadius={4} />
			</Box>
		</Box>
	);
};
