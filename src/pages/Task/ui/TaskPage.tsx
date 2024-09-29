import { useParams } from "react-router-dom";

const TaskPage = () => {
	const { id } = useParams<{ id: string }>();
	// const {} = useGetTas

	return <div>TaskPage</div>;
};

export default TaskPage;
