import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const ClickableMap = () => {
	const MapClickHandler = () => {
		useMapEvents({
			click(e) {
				const { lat, lng } = e.latlng;
				// setPosition({ lat, lng });
				console.log(`Coordinates: Latitude: ${lat}, Longitude: ${lng}`);
			},
		});

		return null;
	};

	return (
		<MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<MapClickHandler />
		</MapContainer>
	);
};
