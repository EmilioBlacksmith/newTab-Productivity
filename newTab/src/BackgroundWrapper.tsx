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

	const hasOneHourPassed = (timestamp: number): boolean => {
		const currentTime = Date.now();
		return currentTime - timestamp > 1800000; // every 30 minutes
	};

	useEffect(() => {
		const fetchRandomPhoto = async () => {
			try {
				const response = await fetch(
					`https://api.unsplash.com/photos/random?client_id=${
						import.meta.env.VITE_UNSPLASH_ACCESS_KEY
					}`
				);
				const data = await response.json();
				const newImageUrl = data.urls.regular;
				const newArtistName = data.user.name;
				const newPhotoLink = data.links.html;
				// Save image data in localStorage
				localStorage.setItem("imageUrl", newImageUrl);
				localStorage.setItem("imageTimestamp", Date.now().toString());
				localStorage.setItem("artistName", newArtistName);
				localStorage.setItem("photoLink", newPhotoLink);

				// Update states
				setImageUrl(newImageUrl);
				setArtistName(newArtistName);
				setPhotoLink(newPhotoLink);
			} catch (error) {
				console.error("Error fetching the image:", error);
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
			!hasOneHourPassed(Number(savedImageTimestamp))
		) {
			setImageUrl(savedImageUrl);
			setArtistName(savedArtistName);
			setPhotoLink(savedPhotoLink);
		} else {
			fetchRandomPhoto();
		}
	}, []);

	return (
		<div className="relative w-screen h-screen">
			<div
				className={`absolute inset-0 bg-center bg-cover -z-50`}
				style={{
					backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
				}}
			></div>

			<div className={className}>{children}</div>

			{artistName && photoLink && (
				<div className="absolute bottom-4 left-4 bg-slate-700 bg-opacity-30 backdrop-blur-xl p-8 rounded-xl shadow-inner text-xl">
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
