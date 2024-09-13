import { useState, useEffect } from "react";

interface WrapperProps {
	children: React.ReactNode;
	className?: string;
}

const BackgroundWrapper: React.FC<WrapperProps> = ({
	children,
	className = "",
}) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [artistName, setArtistName] = useState<string | null>(null);
	const [photoLink, setPhotoLink] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const hasTimePassed = (timestamp: number): boolean => {
		const currentTime = Date.now();
		return currentTime - timestamp > 1600000; // check every 30 min
	};

	useEffect(() => {
		const fetchRandomPhoto = async () => {
			try {
				let isHorizontal = false;
				let data;

				while (!isHorizontal) {
					const response = await fetch(
						`https://api.unsplash.com/photos/random?client_id=${
							import.meta.env.VITE_UNSPLASH_ACCESS_KEY
						}`
					);
					data = await response.json();
					if (data.width > data.height) {
						isHorizontal = true;
					}
				}

				const newImageUrl = data.urls.full;
				const newArtistName = data.user.name;
				const newPhotoLink = data.links.html;

				localStorage.setItem("imageUrl", newImageUrl);
				localStorage.setItem("imageTimestamp", Date.now().toString());
				localStorage.setItem("artistName", newArtistName);
				localStorage.setItem("photoLink", newPhotoLink);

				setImageUrl(newImageUrl);
				setArtistName(newArtistName);
				setPhotoLink(newPhotoLink);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching the image:", error);
				setLoading(false);
			}
		};

		const savedImageUrl = localStorage.getItem("imageUrl");
		const savedImageTimestamp = localStorage.getItem("imageTimestamp");
		const savedArtistName = localStorage.getItem("artistName");
		const savedPhotoLink = localStorage.getItem("photoLink");

		if (
			savedImageUrl &&
			savedImageTimestamp &&
			savedArtistName &&
			savedPhotoLink &&
			!hasTimePassed(Number(savedImageTimestamp))
		) {
			setImageUrl(savedImageUrl);
			setArtistName(savedArtistName);
			setPhotoLink(savedPhotoLink);
			setLoading(false);
		} else {
			fetchRandomPhoto();
		}
	}, []);

	return (
		<div className="relative w-screen h-screen">
			{/* Background image */}
			<div
				className={`absolute inset-0 bg-center bg-cover transition-opacity duration-500 ease-in-out -z-50 ${
					loading ? "opacity-0" : "opacity-100"
				}`}
				style={{
					backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
				}}
			></div>

			{/* Fallback image while loading */}
			{loading && (
				<div
					className="absolute inset-0 bg-center bg-cover transition-opacity duration-500 ease-in-out -z-50"
					style={{
						backgroundImage: `url(${localStorage.getItem("imageUrl")})`,
					}}
				></div>
			)}

			<div className={className}>{children}</div>

			{artistName && photoLink && (
				<div className="absolute bottom-4 left-4 bg-black bg-opacity-60 backdrop-blur-xl p-8 rounded-xl shadow-2xl text-xl">
					<p>
						Photo by{" "}
						<a
							href={photoLink}
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							{artistName}
						</a>{" "}
						on Unsplash
					</p>
				</div>
			)}
		</div>
	);
};

export default BackgroundWrapper;
