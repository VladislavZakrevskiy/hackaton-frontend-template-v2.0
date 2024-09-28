import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Button, ButtonGroup, Box } from "@mui/material";

interface DataPoint {
	title: string;
	value: number;
}

const initialData: DataPoint[] = [
	{ title: "Понедельник", value: 10 },
	{ title: "Вторник", value: 20 },
	{ title: "Среда", value: 30 },
	{ title: "Четверг", value: 15 },
	{ title: "Пятница", value: 25 },
	{ title: "Суббота", value: 35 },
	{ title: "Воскресенье", value: 20 },
];

export const TaskCharts: React.FC = () => {
	const [view, setView] = useState("line");
	const [data, setData] = useState(initialData);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		drawGraph();
	}, [view, data]);

	const drawGraph = () => {
		const svg = d3.select("#graph").html("");
		const box = containerRef.current?.getBoundingClientRect();

		const margin = { top: 20, right: 30, bottom: 40, left: 40 };
		const width = Math.max(box?.width || 0, 600) - margin.left - margin.right;
		const height = Math.max(box?.height || 0, 400) - margin.top - margin.bottom;

		const x = d3
			.scalePoint()
			.domain(data.map((d) => d.title))
			.range([0, width]);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) || 0])
			.nice()
			.range([height, 0]);

		const svgContainer = svg
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		svgContainer
			.append("g")
			.attr("class", "grid")
			.style("stroke", "#ccc")
			.call(
				d3
					.axisLeft(y)
					.tickSize(-width)
					.tickFormat("" as any),
			);

		svgContainer
			.append("g")
			.attr("class", "grid")
			.attr("transform", `translate(0,${height})`)
			.style("stroke", "#ccc")
			.call(
				d3
					.axisBottom(x)
					.tickSize(-height)
					.tickFormat("" as any),
			);

		svgContainer
			.append("g")
			.attr("transform", `translate(0,${height})`)
			.style("stroke", "black")
			.call(d3.axisBottom(x));

		svgContainer.append("g").style("stroke", "black").call(d3.axisLeft(y));

		const tooltip = d3
			.select("body")
			.append("div")
			.style("position", "absolute")
			.style("background", "#f4f4f4")
			.style("padding", "5px")
			.style("border", "1px solid #ccc")
			.style("border-radius", "4px")
			.style("visibility", "hidden");

		const transition = d3.transition().duration(750);

		if (view === "line") {
			const line = d3
				.line<DataPoint>()
				.x((d) => x(d.title) || 0)
				.y((d) => y(d.value));

			svgContainer
				.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "#d32f2f")
				.attr("stroke-width", 2)
				.attr("d", line)
				.transition(transition);

			svgContainer
				.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", (d) => x(d.title) || 0)
				.attr("cy", (d) => y(d.value))
				.attr("r", 5)
				.attr("fill", "red")
				.on("mouseover", (event, d) => {
					tooltip.style("visibility", "visible").text(`${d.title}: ${d.value}`);
					d3.select(event.currentTarget).transition().duration(300).attr("r", 8);
				})
				.on("mouseout", (event) => {
					tooltip.style("visibility", "hidden");
					d3.select(event.currentTarget).transition().duration(300).attr("r", 5);
				})
				.on("mousemove", (event) => {
					tooltip.style("top", `${event.pageY - 10}px`).style("left", `${event.pageX + 10}px`);
				});
		} else if (view === "bezier") {
			const line = d3
				.line<DataPoint>()
				.x((d) => x(d.title) || 0)
				.y((d) => y(d.value))
				.curve(d3.curveBasis); // Кривые Безье

			svgContainer
				.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "#1976d2")
				.attr("stroke-width", 2)
				.attr("d", line)
				.transition(transition);
		} else if (view === "bar") {
			svgContainer
				.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("x", (d) => (x(d.title) || 0) - 20)
				.attr("y", (d) => y(d.value))
				.attr("width", 40)
				.attr("height", (d) => height - y(d.value))
				.attr("fill", "#388e3c")
				.on("mouseover", (event, d) => {
					tooltip.style("visibility", "visible").text(`${d.title}: ${d.value}`);
					d3.select(event.currentTarget).transition().duration(300).attr("fill", "#2e7d32");
				})
				.on("mouseout", (event) => {
					tooltip.style("visibility", "hidden");
					d3.select(event.currentTarget).transition().duration(300).attr("fill", "#388e3c");
				})
				.on("mousemove", (event) => {
					tooltip.style("top", `${event.pageY - 10}px`).style("left", `${event.pageX + 10}px`);
				});
		}
		const zoom = d3.zoom().on("zoom", ({ transform }) => {
			svgContainer.attr("transform", transform);
		});

		svg.call(zoom);
	};

	return (
		<Box ref={containerRef} sx={{ padding: 2 }}>
			<Box sx={{ marginBottom: 2 }} component={"div"} className="flex justify-between">
				<ButtonGroup variant="contained" color="primary">
					<Button onClick={() => setView("line")}>Прямые линии</Button>
					<Button onClick={() => setView("bezier")}>Кривые Безье</Button>
					<Button onClick={() => setView("bar")}>Столбцы</Button>
				</ButtonGroup>

				<ButtonGroup variant="contained" color="secondary">
					<Button>Неделя</Button>
					<Button>Месяц</Button>
					<Button>Месяца</Button>
					<Button>Год</Button>
					<Button>Пятилетка</Button>
				</ButtonGroup>
			</Box>
			<div id="graph" className="w-full"></div>
		</Box>
	);
};
